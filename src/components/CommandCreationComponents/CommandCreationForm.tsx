// README:
// User fills out this form to create a Command
// Each Command has multiple Parameters; they fill out ParameterCreationForm once per Parameter
// Parameters can be of type STRING, INT, BOOLEAN, DROPDOWN or FLAG, there will be different fields for each

// TODO:
// Collapse Params && Collapse All && Expand All

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";
import { addCommand } from "../../../redux/slices/commandsSlice";
import { useDispatch } from "react-redux";

import {
	useForm,
	useFieldArray,
	FormProvider,
	useFormContext,
} from "react-hook-form";
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
} from "../../../utils/CommandCreationUtils";
import LiveCommandPreview from "./LiveCommandCreationPreview";
import exp from "constants";

const {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
	validateParameterOnSubmit,
} = CommandCreationUtils;

const AnyParameterSchema = z.union([
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
]);

// Creating a specific schema for the Command Creation Form
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
export type CMDBuddyCommandFormValidation = z.infer<
	typeof CommandCreationFormSchema
>;

// If using this component to edit an existing Command, a command to edit must be passed in
type FormPropsEditCurrentCommand = {
	componentMode: "editExistingCommand";
	commandToEdit: CMDBuddyCommand;
};

// If using this component to add a new command, this tell that to th code
type FormPropsCreateCommand = {
	componentMode: "createNewCommand";
	// No command to edit because we're creating a new command
	// Added this property for type safety stuff
	commandToEdit: null;
};

// Slightly different props based on if it's "edit" or "create" mode
type FormProps = FormPropsCreateCommand | FormPropsEditCurrentCommand;

// Can either be in "Create new command" mode or "Edit existing command" mode
// Differences are minimal, edit mode just populates existing command's details, and submitting in edit mode updates that command instead of making a new one
const CommandCreationOrEditForm: React.FC<FormProps> = (props) => {
	// There will only be a commandToEdit if we're in edit mode
	const { componentMode, commandToEdit } = props;
	const isEditMode = componentMode === "editExistingCommand";

	const dispatch = useDispatch();

	const methods = useForm<CMDBuddyCommandFormValidation>({
		resolver: zodResolver(CommandCreationFormSchema),
	});

	const experimentalCommand = useSelector((state: RootState) => {
		return state.commands.commands ? state.commands.commands[0] : null;
	});

	// If component mode is "editExistingCommand", this adds that command to form state
	// If mode is "createNewCommand", this does nothing.
	useEffect(() => {
		console.log("experimentalCommand:", experimentalCommand);
		experimentalCommand &&
			methods.setValue("baseCommand", experimentalCommand!.baseCommand);
		experimentalCommand?.parameters &&
			//@ts-ignore
			methods.setValue("parameters", experimentalCommand.parameters);

		const formValues = methods.getValues();
		console.log("formValues:", formValues);
	}, [experimentalCommand, methods]);

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
	const router = useRouter();

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

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	const onSubmit = async (data: CMDBuddyCommandFormValidation) => {
		// TODO:
		// Toast at beginning and end
		// Notify if command title or baseCommand already exists

		data.order = 1;

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

		const completedCommandFromDB = await submitNewCommandAndParamsToDB(
			data,
			loggedInUser!.id
		);

		dispatch(addCommand(completedCommandFromDB));
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
			<StyledCCFForm onSubmit={methods.handleSubmit(onSubmit)}>
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
