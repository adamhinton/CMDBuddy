"use client";

// README:
// This can be creation mode, where the user creates an entirely new command; or edit mode, where they edit an existing command. The only UI difference is the props passed in, and that in edit mode, the command's fields are pre-filled.
// User fills out this form to create a Command
// Each Command has multiple Parameters; they fill out ParameterCreationOrEditForm once per Parameter
// Parameters can be of type STRING, INT, BOOLEAN, DROPDOWN or FLAG, there will be different parameterList for each
// User can Drag and Drop (DnD) Parameters
// User can also collapse one or all Parameters; collapsed Params will only show a bar with util buttons and the Param's name.

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
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
	StyledCommandCreationDisclaimer,
	CommandInputGroup,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import { CommandSubmitUtils } from "../../../utils/CommandCreationUtils/CommandSubmissionUtils";
import LiveCommandPreview from "./LiveCommandCreationPreview";
import { CommandCreationZodSchemas } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import Link from "next/link";
import { CommandCreationUIElements } from "../../../utils/CommandCreationUtils/CommandCreationUtils";
import "tippy.js/dist/tippy.css";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { StrictModeDroppable } from "../SideBar/SideBar";

const { AnyParameterSchema } = CommandCreationZodSchemas;
const { collapseAllParams, parameterCreationButtons } =
	CommandCreationUIElements;

const { handleSubmit } = CommandSubmitUtils;

/**Creating a specific schema for command creation mode, excluding `id` and `order`.
 *
 * This is because the user doesn't define things like `id` or `order` */
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

/**Either edit mode or create mode */
export type CMDBuddyCommandFormValidation = z.infer<
	typeof CommandCreationFormSchema | typeof CommandEditFormSchema
>;

export type ComponentMode = "editExistingCommand" | "createNewCommand";

/**If using this component to edit an existing Command, a command to edit must be passed in */
interface FormPropsEditExistingCommand {
	componentMode: "editExistingCommand";
	commandToEdit: NonNullable<CMDBuddyCommand>;
}

/**If using this component to add a new command, this tells that to the code */
interface FormPropsCreateCommand {
	componentMode: "createNewCommand";
	// No command to edit because we're creating a new command
	// Added this property for type safety stuff
	commandToEdit?: null;
}

// Slightly different props based on if it's "edit" or "create" mode
type FormProps = FormPropsCreateCommand | FormPropsEditExistingCommand;

/**
 * Can either be in "Create new command" mode or "Edit existing command" mode.
 *
 * UI differences are minimal, edit mode just populates existing command's details, and submitting in edit mode updates that command instead of making a new one
 */
const CommandCreationOrEditForm: React.FC<FormProps> = (props) => {
	// There will only be a commandToEdit if we're in edit mode
	const { componentMode, commandToEdit } = props;

	const dispatch = useDispatch();

	// Getting how many Commands the user has to pass to OnSubmit
	// Because this app allows max 50 Commands per user to prevent spamming the DB
	const numCommands = useSelector((state: RootState) => {
		return state.commands.commands?.length;
	});

	const methods = useForm<CMDBuddyCommandFormValidation>({
		// Form validation is either "edit" mode or "create" mode
		resolver: zodResolver(
			componentMode === "createNewCommand"
				? CommandCreationFormSchema
				: CommandEditFormSchema
		),
	});

	const { setFocus } = useForm<CMDBuddyCommandFormValidation>();

	const { setValue } = methods;

	const { fields, append, remove, update } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	// `fields` is the array of created Parameters which we get from react-hook-form
	// I rename it to ParameterList here to be clear what it is
	/**The list of user-created Parameters in this form. */
	const parameterList = fields;

	// Delete any values leftover from editing of previous commands
	useEffect(() => {
		methods.reset();
		// Remove pre-existing parameter inputs
		remove();
	}, [methods, commandToEdit, remove]);

	// On Submit, this collapses Params that don't have errors, and expands ones that do have errors.
	useEffect(() => {
		const parameterErrors = methods.formState.errors.parameters;

		if (parameterErrors?.length && parameterErrors?.length > 0) {
			for (let i = 0; i < parameterList.length; i++) {
				// Expand Parameters that have errors
				if (parameterErrors[i]) {
					// TODO Stretch: Focus not being set to param with error if param is collapsed
					setFocus(`parameters.${i}`);
					update(i, {
						...parameterList[i],
						isCollapsed: false,
					});
					// Collapse Parameters that don't have errors
				} else {
					update(i, {
						...parameterList[i],
						isCollapsed: true,
					});
				}
			}
		}
		// Disabling exhaustive-deps because we don't need to run this every time `parameterList` is updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [methods.formState.errors, setFocus, update]);

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

	const clearForm = () => {
		if (
			window.confirm("Are you sure you want to DELETE all values in this form?")
		) {
			remove(); // Removes all parameter parameterList
			methods.reset(); // Resets the form to default values
		}
	};

	/**This saves result to form state when user drags and drops Parameters */
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const parameters = methods.getValues("parameters");

		const items = Array.from(parameters || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		methods.setValue("parameters", items);
	};

	return (
		<FormProvider {...methods}>
			<StyledCCFForm
				// Handles submit differently if it's in "edit existing command" mode or "create new command" mode
				onSubmit={methods.handleSubmit((data, e) => {
					handleSubmit({
						data,
						componentMode,
						setIsSubmitting,
						dispatch,
						loggedInUser: loggedInUser!,
						commandToEdit: commandToEdit ? commandToEdit : null,
						methods,
						remove,
						numCommands,
						update,
					});
				})}
			>
				{/* Command parameterList */}
				<StyledCommandCreationHeader>
					{componentMode === "createNewCommand"
						? "Create New Command"
						: "Edit Existing Command"}
				</StyledCommandCreationHeader>
				<StyledCommandCreationDisclaimer>
					To generate commands go <Link href="/commands/generate">here</Link>
				</StyledCommandCreationDisclaimer>

				<CommandInputGroup>
					<CMDBuddyTooltip content="The core command excluding any parameters; e.g. npx playwright test myTestName">
						<StyledCCFLabel htmlFor="baseCommand">
							Base Command *
						</StyledCCFLabel>
					</CMDBuddyTooltip>

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
					<div>
						<CMDBuddyTooltip content="You select the command by its title in the sidebar.">
							<StyledCCFLabel htmlFor="title">Title *</StyledCCFLabel>
						</CMDBuddyTooltip>
						<StyledCCFInput
							{...methods.register("title")}
							maxLength={60}
							required={true}
							placeholder="Something you'll remember it by"
						/>
						{methods.formState.errors.title && (
							<StyledCCFError>
								{methods.formState.errors.title.message}
							</StyledCCFError>
						)}
					</div>
				</CommandInputGroup>

				<LiveCommandPreview watch={watch} />

				<div>
					{/*  Reusable parameter creation buttons: "Add new parameter", "Clear
				form", "Submit", "Collapse All Params" */}
					{/* Made a function for this because it's used twice in this component */}
					{parameterCreationButtons({
						collapseAllParams,
						update,
						getValues: methods.getValues,
						append,
						clearForm,
						isSubmitting,
						componentMode,
						commandToEdit: commandToEdit ? commandToEdit : null,
					})}
				</div>

				{/* All this DragDrop stuff is for drag and drop (DnD) of Parameters */}
				<DragDropContext onDragEnd={onDragEnd}>
					<StrictModeDroppable droppableId="parameters">
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{/* As many parameter creation forms as user wants */}
								{parameterList.map((cmdBuddyParameter, index) => {
									return (
										// DnD stuff
										<Draggable
											key={cmdBuddyParameter.id}
											draggableId={cmdBuddyParameter.id}
											index={index}
										>
											{(provided) => {
												return (
													<span
														// DnD params
														ref={provided.innerRef}
														{...provided.draggableProps}
													>
														<ParameterCreationOrEditForm
															key={cmdBuddyParameter.id}
															index={index}
															removeParameter={() => remove(index)}
															parameterCreationType={cmdBuddyParameter.type}
															setValue={setValue}
															isCollapsed={cmdBuddyParameter.isCollapsed!}
															update={update}
															getValues={methods.getValues}
															// DnD params
															dragHandleProps={provided.dragHandleProps!}
														/>
													</span>
												);
											}}
										</Draggable>
									);
								})}
							</div>
						)}
					</StrictModeDroppable>
				</DragDropContext>

				{/*  Reusable parameter creatRion buttons: "Add new parameter", "Clear
				form", "Submit", "Collapse All Params" */}
				{/* Made a function for this because it's used twice in this component */}
				{/* Only shows at bottom of page if user has made at least one param, seems unnecessary otherwisei */}
				{parameterList.length > 0 &&
					parameterCreationButtons({
						collapseAllParams,
						update,
						getValues: methods.getValues,
						append,
						clearForm,
						isSubmitting,
						componentMode,
						commandToEdit: commandToEdit ? commandToEdit : null,
					})}
			</StyledCCFForm>
		</FormProvider>
	);
};

export default CommandCreationOrEditForm;
