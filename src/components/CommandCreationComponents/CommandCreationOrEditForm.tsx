"use client";

// README:
// User fills out this form to create a Command
// Each Command has multiple Parameters; they fill out ParameterCreationOrEditForm once per Parameter
// Parameters can be of type STRING, INT, BOOLEAN, DROPDOWN or FLAG, there will be different fields for each

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
import ParameterCreationOrEditForm from "./ParameterCreationOrEditForm";
import {
	StyledCCFForm,
	StyledCommandCreationHeader,
	StyledCCFLabel,
	StyledCCFInput,
	StyledCCFError,
	StyledCCFButton,
	StyledCommandCreationDisclaimer,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import { CommandSubmitUtils } from "../../../utils/CommandCreationUtils/CommandSubmissionUtils";
import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import LiveCommandPreview from "./LiveCommandCreationPreview";
import { CommandCreationZodSchemas } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import Link from "next/link";
import { toast } from "react-toastify";
import { customToastConfig } from "../../../utils/ToastWrapper";
import { CommandCreationUIElements } from "../../../utils/CommandCreationUtils/CommandCreationUtils";

const { AnyParameterSchema } = CommandCreationZodSchemas;
const { collapseAllParams } = CommandCreationUIElements;

const {
	validateParameterOnSubmit,
	submitParamEditsToDB,
	submitNewCommandAndParamsToDB,
} = CommandSubmitUtils;

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
	userID: z.string().optional(),
	id: z.string(),
	order: z.number().int().optional(),
	parameters: z.array(AnyParameterSchema).optional(),
});

// Either edit mode or create mode
export type CMDBuddyCommandFormValidation = z.infer<
	typeof CommandCreationFormSchema | typeof CommandEditFormSchema
>;

export type ComponentMode = "editExistingCommand" | "createNewCommand";

// If using this component to edit an existing Command, a command to edit must be passed in
interface FormPropsEditExistingCommand {
	componentMode: "editExistingCommand";
	commandToEdit: NonNullable<CMDBuddyCommand>;
}

// If using this component to add a new command, this tell that to th code
interface FormPropsCreateCommand {
	componentMode: "createNewCommand";
	// No command to edit because we're creating a new command
	// Added this property for type safety stuff
	commandToEdit?: null;
}

type FormProps = FormPropsCreateCommand | FormPropsEditExistingCommand;

// Slightly different props based on if it's "edit" or "create" mode
// type FormProps = FormPropsCreateCommand | FormPropsEditExistingCommand;

// Can either be in "Create new command" mode or "Edit existing command" mode
// Differences are minimal, edit mode just populates existing command's details, and submitting in edit mode updates that command instead of making a new one
const CommandCreationOrEditForm: React.FC<FormProps> = (props) => {
	// There will only be a commandToEdit if we're in edit mode
	const { componentMode, commandToEdit } = props;

	const dispatch = useDispatch();

	const methods = useForm<CMDBuddyCommandFormValidation>({
		// Form validation is either "edit" mode or "create" mode
		resolver: zodResolver(
			componentMode === "createNewCommand"
				? CommandCreationFormSchema
				: CommandEditFormSchema
		),
	});

	const { setValue } = methods;

	const { fields, append, remove, update } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	// Delete any values leftover from editing of previous commands
	useEffect(() => {
		methods.reset();
		// Remove pre-existing parameter inputs
		remove();
	}, [methods, commandToEdit, remove]);

	// If component mode is "editExistingCommand", this adds that command to form state
	// If mode is "createNewCommand", this does nothing.
	useEffect(() => {
		// This useEffect is all for edit mode
		if (componentMode === "editExistingCommand") {
			methods.reset();
			methods.setValue("baseCommand", commandToEdit.baseCommand);
			methods.setValue("order", commandToEdit.order);
			methods.setValue("title", commandToEdit.title);
			methods.setValue("id", commandToEdit.id);

			commandToEdit.parameters?.forEach((param) => {
				// @ts-ignore
				append({
					...param,
					hasBeenEdited: false,
					commandID: commandToEdit.id,
					isCollapsed: false,
				});
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

	// This will disable the submit button while submitting updates to db
	const [isSubmitting, setIsSubmitting] = useState(false);

	const loggedInUser = useSelector((state: RootState) => {
		return state.auth.user;
	});

	// This is for LiveCommandPreview
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
		// Disables the submit button temporarily
		setIsSubmitting(true);
		const beginSubmissionToastText =
			componentMode === "createNewCommand"
				? "Submitting new Command..."
				: "Submitting edited Command... ";

		toast(beginSubmissionToastText, customToastConfig);

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

		// Stop submission if validation fails
		if (!isFormValuesValid) {
			console.error("Validation failed");
			setIsSubmitting(false);
			return;
		}

		// Creating new command in db if in "create new command" mode
		if (componentMode === "createNewCommand") {
			try {
				// Submit new command to db and get response for Redux
				const completedCommandFromDB = await submitNewCommandAndParamsToDB(
					data,
					loggedInUser!.id
				);

				// Fixing funny parameters formatting of db response
				const commandForRedux = {
					...completedCommandFromDB,
					// @ts-ignore
					parameters: completedCommandFromDB.parameters?.items,
				};
				dispatch(addCommand(commandForRedux));
			} catch {
				toast(
					"Error submitting new Command - please use contact form if issue persists"
				);
				setIsSubmitting(false);
				return;
			}
		}

		// Editing existing command if in edit mode
		else if (componentMode === "editExistingCommand") {
			try {
				await submitParamEditsToDB(data, commandToEdit!);
			} catch {
				toast(
					"Error submitting edited Command - please use contact form if issue persists"
				);
				setIsSubmitting(false);
				return;
			}

			dispatch(editSingleCommand(data as CMDBuddyCommand));
		}

		// Notify user of submit success
		const successfulSubmissionToastText =
			componentMode === "createNewCommand"
				? "New Command submitted successfully!"
				: "Edited Command submitted successfully!";

		toast(successfulSubmissionToastText, customToastConfig);

		// Finally, clear form values
		remove();
		methods.reset();
		// This shouldn't actually be necessary
		setIsSubmitting(false);
	};

	// Maybe refactor this to also clear form on submit. Wouldn't need the user conf then.
	const clearForm = () => {
		if (
			window.confirm("Are you sure you want to DELETE all values in this form?")
		) {
			remove(); // Removes all parameter fields
			methods.reset(); // Resets the form to default values
		}
	};

	return (
		<FormProvider {...methods}>
			<StyledCCFButton
				onClick={(e) => {
					// `fields` is what the function calls `params`
					collapseAllParams(update, fields);
				}}
			>
				Collapse All Params
			</StyledCCFButton>
			<StyledCCFForm
				// Handles submit differently if it's in "edit existing command" mode or "create new command" mode
				onSubmit={methods.handleSubmit((data, e) => {
					onSubmit(data, componentMode);
				})}
			>
				{/* Command Fields */}
				<StyledCommandCreationHeader>
					{componentMode === "createNewCommand"
						? "Create New Command"
						: "Edit Existing Command"}
				</StyledCommandCreationHeader>
				<StyledCommandCreationDisclaimer>
					To generate commands go <Link href="/commands/generate">here</Link>
				</StyledCommandCreationDisclaimer>
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
				{fields.map((field, index) => {
					console.log("field:", field);
					return (
						<ParameterCreationOrEditForm
							key={field.id}
							parameter={field}
							index={index}
							removeParameter={() => remove(index)}
							parameterCreationType={field.type}
							setValue={setValue}
							isCollapsed={field.isCollapsed!}
							update={update}
						/>
					);
				})}

				<StyledCCFButton
					type="button"
					onClick={() => {
						const appendValueIfCreationMode = {
							type: "STRING",
							name: "",
							isNullable: false,
							defaultValue: "",
							hasBeenEdited: false,
							isCollapsed: false,
						};

						// Needs command ID if editing existing command
						const appendValueIfEditMode = {
							...appendValueIfCreationMode,
							commandID: commandToEdit?.id,
						};

						// Add new param
						append(
							componentMode === "createNewCommand"
								? (appendValueIfCreationMode as any)
								: (appendValueIfEditMode as any)
						);
					}}
				>
					Add Parameter
				</StyledCCFButton>

				<StyledCCFButton type="button" onClick={clearForm}>
					Clear Form
				</StyledCCFButton>

				<StyledCCFButton type="submit" disabled={isSubmitting}>
					{componentMode === "createNewCommand"
						? "Create Command"
						: "Save Changes"}
				</StyledCCFButton>

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
