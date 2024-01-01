"use client";

// README:
// User fills out this form to create a Command
// Each Command has multiple Parameters; they fill out ParameterCreationForm once per Parameter
// Parameters can be of type STRING, INT, BOOLEAN, DROPDOWN or FLAG, there will be different fields for each

// TODO:
// Collapse Params && Collapse All && Expand All

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
	addCommand,
	editSingleCommand,
} from "../../../redux/slices/commandsSlice";
import { useDispatch } from "react-redux";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
	CMDBuddyCommand,
	CommandSchema,
} from "../../../utils/zod/CommandSchema";
import ParameterCreationForm from "./ParameterCreationForm";
import {
	StyledCCFForm,
	StyledCCFLabel,
	StyledCCFInput,
	StyledCCFError,
	StyledCCFButton,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import {
	CommandCreationUtils,
	AnyParameter,
	submitNewCommandAndParamsToDB,
	sortSubmittedEditedParams,
} from "../../../utils/CommandCreationUtils";
import LiveCommandPreview from "./LiveCommandCreationPreview";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";

const {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
	validateParameterOnSubmit,
} = CommandCreationUtils;

export const AnyParameterSchema = z.union([
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
]);

// Creating a specific schema for command creation mode
// This is because the user doesn't define things like `id` or `order`
export const CommandCreationFormSchema = CommandSchema.omit({
	id: true,
	userID: true,
}).extend({
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// Each Parameter can be one of four types
	parameters: z.array(AnyParameterSchema).optional(),
});

// Form validation in edit mode; this needs an `id` and `userID` for the existing command
export const CommandEditFormSchema = CommandSchema.extend({
	id: z.string().optional(),
	userID: z.string().optional(),
	order: z.number().int().optional(),
	parameters: z.array(AnyParameterSchema).optional(),
});

// Either edit mode or create mode
export type CMDBuddyCommandFormValidation = z.infer<
	typeof CommandCreationFormSchema | typeof CommandEditFormSchema
>;

export enum ComponentMode {
	"editExistingCommand",
	"createNewCommand",
}

// If using this component to edit an existing Command, a command to edit must be passed in
type FormPropsEditExistingCommand = {
	componentMode: ComponentMode.editExistingCommand;
	commandToEdit: CMDBuddyCommand;
};

// If using this component to add a new command, this tell that to th code
type FormPropsCreateCommand = {
	componentMode: ComponentMode.createNewCommand;
	// No command to edit because we're creating a new command
	// Added this property for type safety stuff
	commandToEdit?: null;
};

// Slightly different props based on if it's "edit" or "create" mode
type FormProps = FormPropsCreateCommand | FormPropsEditExistingCommand;

// Can either be in "Create new command" mode or "Edit existing command" mode
// Differences are minimal, edit mode just populates existing command's details, and submitting in edit mode updates that command instead of making a new one
const CommandCreationOrEditForm: React.FC<FormProps> = (props) => {
	// There will only be a commandToEdit if we're in edit mode
	const { componentMode, commandToEdit } = props;

	const dispatch = useDispatch();

	const methods = useForm<CMDBuddyCommandFormValidation>({
		// Form validation is either "edit" mode or "create" mode
		resolver: zodResolver(
			componentMode === ComponentMode.createNewCommand
				? CommandCreationFormSchema
				: CommandEditFormSchema
		),
	});

	const { setValue } = methods;

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	// If component mode is "editExistingCommand", this adds that command to form state
	// If mode is "createNewCommand", this does nothing.
	useEffect(() => {
		if (componentMode === ComponentMode.editExistingCommand) {
			methods.reset();
			methods.setValue("baseCommand", commandToEdit!.baseCommand);
			methods.setValue("order", commandToEdit?.order);
			methods.setValue("title", commandToEdit?.title!);
			methods.setValue("id", commandToEdit?.id);
			methods.setValue("userID", commandToEdit?.userID);

			commandToEdit.parameters?.forEach((param) => {
				// @ts-ignore
				append({ ...param, hasBeenEdited: false });
			});
		}
	}, [append, commandToEdit, methods, componentMode]);

	const { watch } = methods;

	type FilteredParameter = {
		name?: string;
		defaultValue?: string;
	};

	// This state and useEffect are for the sake of LiveCommandPreview which shows a preview of the Command you've created. Like it'll show `companyName= zipCode= npx playwright test testName --headed`
	const [filteredParameters, setFilteredParameters] = useState<
		FilteredParameter[]
	>([]);

	const loggedInUser = useSelector((state: RootState) => {
		return state.auth.user;
	});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name?.startsWith("parameters")) {
				// Extract name and defaultValue from each parameter and update state
				const updatedParameters = value.parameters?.map((param) => ({
					name: param?.name,
					defaultValue: param?.defaultValue,
				}));
				setFilteredParameters(updatedParameters || []);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onSubmit = async (
		data: CMDBuddyCommandFormValidation,
		componentMode: ComponentMode
	) => {
		// TODO:
		// Toast at beginning and end
		// Notify if command title or baseCommand already exists

		data.order = 1;
		console.log("data in onsubmit:", data);

		const parameters: AnyParameter[] | undefined = data.parameters;
		let nonFlagOrder = 1;
		let flagOrder = 1;
		let isFormValuesValid = true;

		// Loop over parameters, adding an `order` to each and doing final validation
		parameters?.forEach((parameter, index) => {
			if (parameter.type === "FLAG") {
				parameter.order = flagOrder++;
			} else {
				parameter.order = nonFlagOrder++;
			}

			// This validates a single Parameter on submit, catching a few things that Zod etc couldnt.
			const isParameterValid = validateParameterOnSubmit(
				parameter,
				index,
				methods,
				isFormValuesValid
			);
			if (!isParameterValid) {
				isFormValuesValid = false;
			}
		});

		if (!isFormValuesValid) {
			console.error("Validation failed");
			return; // Stop submission if validation fails
		}

		// Creating new command in db if in "create new command" mode
		if (componentMode === ComponentMode.createNewCommand) {
			const completedCommandFromDB = await submitNewCommandAndParamsToDB(
				data,
				loggedInUser!.id
			);

			dispatch(addCommand(completedCommandFromDB));
		}

		// Editing existing command if in edit mode
		else if (componentMode === ComponentMode.editExistingCommand) {
			// Edit command in redux state
			// Update command in db
			// set editing redux state to null

			const sortedParameters = sortSubmittedEditedParams(data, commandToEdit!);
			console.log("sortedParameters:", sortedParameters);

			dispatch(editSingleCommand(data as CMDBuddyCommand));
		}
		// Finally, clear form values
		remove();
		methods.reset();
		console.timeEnd("start submit");
	};

	// Maybe refactor this to also clear form on submit. Wouldn't need the user conf then.
	const clearForm = () => {
		if (
			window.confirm("Are you sure you want to DELETE all values in this form?")
		) {
			// TODO: This seems to delete the parameter inputs, but when you click Add Parameter again, it goes back to however many Param inputs there were plus your new one.
			remove(); // Removes all parameter fields
			methods.reset(); // Resets the form to default values
		}
	};

	return (
		<FormProvider {...methods}>
			<StyledCCFForm
				// Handles submit differently if it's in "edit existing command" mode or "create new command" mode
				onSubmit={methods.handleSubmit((data, e) => {
					onSubmit(data, componentMode);
				})}
			>
				{/* Command Fields */}
				<div>
					<StyledCCFLabel htmlFor="baseCommand">Base Command</StyledCCFLabel>
					<StyledCCFInput
						{...methods.register("baseCommand")}
						placeholder="npm test myTestName"
						maxLength={200}
						required={true}
					/>
					{methods.formState.errors.baseCommand && (
						<StyledCCFError>
							{methods.formState.errors.baseCommand.message}
						</StyledCCFError>
					)}
				</div>

				<div>
					<StyledCCFLabel htmlFor="title">Title</StyledCCFLabel>
					<StyledCCFInput
						{...methods.register("title")}
						maxLength={60}
						required={true}
					/>
					{methods.formState.errors.title && (
						<StyledCCFError>
							{methods.formState.errors.title.message}
						</StyledCCFError>
					)}
				</div>

				{/* As many parameter creation forms as user wants */}
				{fields.map((field, index) => (
					<ParameterCreationForm
						key={field.id}
						index={index}
						removeParameter={() => remove(index)}
						parameterCreationType={field.type}
						setValue={setValue}
					/>
				))}

				<StyledCCFButton
					type="button"
					onClick={() =>
						append({
							type: "STRING",
							name: "",
							isNullable: false,
							defaultValue: "",
							hasBeenEdited: false,
							// TODO: Fix this as any
						} as any)
					}
				>
					Add Parameter
				</StyledCCFButton>

				<StyledCCFButton type="button" onClick={clearForm}>
					Clear Form
				</StyledCCFButton>

				<StyledCCFButton type="submit">Create Command</StyledCCFButton>

				{/* This shows an example of the Command the user has created. */}
				{/* Example: `companyName= zipCode= npx playwright test createCompany --headed` */}
				<LiveCommandPreview
					baseCommand={methods.getValues().baseCommand}
					parameters={methods.getValues().parameters}
					watch={watch}
				/>
			</StyledCCFForm>
		</FormProvider>
	);
};

export default CommandCreationOrEditForm;