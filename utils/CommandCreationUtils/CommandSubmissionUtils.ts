import { AnyParameter } from "./CommandCreationTypes";
import {
	CMDBuddyCommandFormValidation,
	ComponentMode,
} from "@/components/CommandCreationComponents/CommandCreationOrEditForm";
import { CMDBuddyCommand } from "../zod/CommandSchema";
import { API, graphqlOperation } from "aws-amplify";
import {
	createCommand,
	createParameter,
	deleteParameter,
	updateCommand,
	updateParameter,
} from "@/graphql/mutations";
import { CMDBuddyParameter } from "../zod/ParameterSchema";
import { customGetCommandWithParameters } from "../customGraphQLQueries";
import { UpdateCommandInput } from "@/API";
import { toast } from "react-toastify";
import {
	addCommand,
	editSingleCommand,
} from "../../redux/slices/commandsSlice";
import { AnyAction, Dispatch } from "redux";
import { CMDBuddyUser } from "../zod/UserSchema";
import { UseFormReturn } from "react-hook-form";

// TODO: Make it clear where errors are. Expand Param; maybe toast saying param name and field?

// This validates a single Parameter on submit, catching a few things that Zod etc couldnt.
const validateParameterOnSubmit = (
	parameter: AnyParameter,
	index: number,
	methods: any,
	isValid: boolean
): boolean => {
	const { setError } = methods;

	if (parameter.type === "STRING") {
		// TODO: Validate defaultValue against regex, and against min/max lengths
		if (
			parameter.minLength &&
			parameter.maxLength &&
			parameter.minLength > parameter.maxLength
		) {
			setError(`parameters.${index}.minLength`, {
				type: "manual",
				message: "Min length cannot be greater than max length.",
			});
			isValid = false;
		}

		// Default value validation
		if (parameter.defaultValue) {
			// Make sure default value matches validation regex
			if (parameter.validationRegex) {
				const regex = new RegExp(parameter.validationRegex);
				if (!regex.test(parameter.defaultValue)) {
					setError(`parameters.${index}.defaultValue`, {
						type: "manual",
						message: "Provided default value does not match provided regex",
					});
					isValid = false;
				}
			}

			// Ensure default value isn't longer than max length
			if (
				parameter.maxLength &&
				parameter.defaultValue.length > parameter.maxLength
			) {
				setError(`parameters.${index}.defaultValue`, {
					type: "manual",
					message: "Provided default value is longer than max length",
				});
				isValid = false;
			}

			// Ensure default value isn't shorter than min length
			if (
				parameter.minLength &&
				parameter.defaultValue.length < parameter.minLength
			) {
				setError(`parameters.${index}.defaultValue`, {
					type: "manual",
					message: "Provided default value is shorter than min length",
				});
				isValid = false;
			}
		}
	} else if (parameter.type === "INT") {
		// TODO: Validate defaultValue against min and max
		if (
			parameter.minValue &&
			parameter.maxValue &&
			parameter.minValue > parameter.maxValue
		) {
			setError(`parameters.${index}.minValue`, {
				type: "manual",
				message: "Min value cannot be greater than max value.",
			});
			isValid = false;
		}

		// Couldn't think of any additional BOOLEAN validations
	} else if (parameter.type === "DROPDOWN") {
		if (
			parameter.defaultValue &&
			!parameter.allowedValues?.includes(parameter.defaultValue)
		) {
			setError(`parameters.${index}.defaultValue`, {
				type: "manual",
				message: "Default value must be in allowed values.",
			});
			isValid = false;
		}
		// Couldn't think of any additional FLAG validations
	}
	return isValid;
};

const submitNewCommandAndParamsToDB = async (
	formData: CMDBuddyCommandFormValidation,
	userID: string
): Promise<CMDBuddyCommand> => {
	// Disable submit button and show toast
	// disableSubmitButton();
	// showToast("Submitting... Please do not close the page.");
	let completeCommand: CMDBuddyCommand | null = null;

	try {
		// Construct command input for GraphQL mutation
		const commandInput = {
			baseCommand: formData.baseCommand,
			title: formData.title,
			order: formData.order,
			userID: userID,
		};

		// Submit Command and get the new command's ID
		const commandResponse = await API.graphql(
			graphqlOperation(createCommand, { input: commandInput })
		);
		// @ts-ignore
		const newCommandID = commandResponse.data.createCommand.id;

		// Submit each Parameter with the new command's ID
		const parameters = formData.parameters || [];
		for (const parameter of parameters) {
			// DB
			delete parameter.hasBeenEdited;
			delete parameter.isCollapsed;
			const parameterInput = {
				...parameter,
				commandID: newCommandID,
			};
			try {
				await API.graphql(
					graphqlOperation(createParameter, { input: parameterInput })
				);
			} catch (err) {
				console.log("error submitting Parameter to db", err);
			}
		}

		// Fetch the complete command with parameters from the database
		// Replace this with your actual fetch command function
		completeCommand = await fetchCommandWithParameters(newCommandID);
	} catch (error) {
		console.error("Error submitting command and parameters:", error);
	} finally {
		return completeCommand!;
	}
};

// When user edits a Command, this tells the code if its params are newly created, updated, or deleted
// Params that haven't changed are left out of the returned object
const sortSubmittedEditedParams = (
	data: CMDBuddyCommandFormValidation,
	commandToEdit: CMDBuddyCommand
) => {
	const originalParameters = commandToEdit?.parameters;

	// Add these new parameters
	// We know they're new bc they don't have an id yet
	const newParameters = data.parameters?.filter((p) => !p.id);

	// Update these original parameter ids with new data
	// These are params that existed already but have been updated.
	const updatedParameters = data.parameters?.filter(
		(p) =>
			p.id &&
			originalParameters?.some((ep) => ep.id === p.id && p.hasBeenEdited)
	);

	// Params that the user deleted while editing a command
	let deletedParameters: CMDBuddyParameter[] = [];
	if (originalParameters && originalParameters.length) {
		deletedParameters = originalParameters
			.filter((ep) => !data.parameters?.some((p) => p.id === ep.id))
			.map((p) => p);
	}

	return {
		newParameters: newParameters,
		updatedParameters: updatedParameters,
		deletedParameters: deletedParameters,
	};
};

const fetchCommandWithParameters = async (commandID: string) => {
	try {
		const response = await API.graphql(
			graphqlOperation(customGetCommandWithParameters, {
				id: commandID,
			})
		);
		// @ts-ignore
		const commandWithParameters = response.data?.getCommand;

		return commandWithParameters;
	} catch (error) {
		console.error("Error fetching command with parameters:", error);
		return null;
	}
};

/**
 * Validates all parameters and updates their order.
 * Returns whether all parameters are valid.
 */
function validateAndUpdateParameters(
	parameters: AnyParameter[],
	methods: any
): boolean {
	let nonFlagOrder = 1;
	let flagOrder = 1;
	let isFormValuesValid = true;

	parameters?.forEach((parameter, index) => {
		parameter.order = parameter.type === "FLAG" ? flagOrder++ : nonFlagOrder++;

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

	return isFormValuesValid;
}

/**
 * Handles creation of new command.
 */
async function createNewCommand(
	data: CMDBuddyCommandFormValidation,
	dispatch: any,
	loggedInUserId: string
) {
	try {
		const completedCommandFromDB = await submitNewCommandAndParamsToDB(
			data,
			loggedInUserId
		);

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
		throw new Error("New command submission failed");
	}
}

/**
 * Handles editing of existing command.
 */
async function editExistingCommand(
	data: CMDBuddyCommandFormValidation,
	dispatch: any,
	commandToEdit: CMDBuddyCommand
) {
	try {
		await submitParamEditsToDB(data, commandToEdit);
		dispatch(editSingleCommand(data as CMDBuddyCommand));
	} catch {
		toast(
			"Error submitting edited Command - please use contact form if issue persists"
		);
		throw new Error("Edit command submission failed");
	}
}

/**
 * Main function to handle form submission for both creating and editing commands.
 */
const handleSubmit = async ({
	data,
	componentMode,
	setIsSubmitting,
	dispatch,
	loggedInUser,
	commandToEdit,
	methods,
	remove,
}: {
	data: CMDBuddyCommandFormValidation;
	componentMode: ComponentMode;
	setIsSubmitting: (value: React.SetStateAction<boolean>) => void;
	dispatch: Dispatch<AnyAction>;
	loggedInUser: CMDBuddyUser;
	commandToEdit: CMDBuddyCommand | null;
	methods: UseFormReturn<CMDBuddyCommandFormValidation>;
	remove: (index?: number | number[] | undefined) => void;
}) => {
	setIsSubmitting(true);
	toast(
		componentMode === "createNewCommand"
			? "Submitting new Command..."
			: "Submitting edited Command..."
	);

	data.order = 1; // Setting default order

	let isFormValuesValid = validateAndUpdateParameters(
		data.parameters || [],
		methods
	);

	if (!isFormValuesValid) {
		console.error("Validation failed");
		toast("Encountered validation issues");
		setIsSubmitting(false);
		return;
	}

	try {
		if (componentMode === "createNewCommand") {
			await createNewCommand(data, dispatch, loggedInUser.id);
		} else if (componentMode === "editExistingCommand") {
			await editExistingCommand(data, dispatch, commandToEdit!);
		}
		toast(
			`${
				componentMode === "createNewCommand" ? "New" : "Edited"
			} Command submitted successfully!`
		);
	} catch (error) {
		setIsSubmitting(false);
		return;
	}

	remove();
	methods.reset();
	setIsSubmitting(false);
};

const submitParamEditsToDB = async (
	data: CMDBuddyCommandFormValidation,
	commandToEdit: CMDBuddyCommand
) => {
	const sortedParameters = sortSubmittedEditedParams(data, commandToEdit!);
	const newParameters = sortedParameters?.newParameters;
	const deletedParameters = sortedParameters?.deletedParameters;
	const updatedParameters = sortedParameters?.updatedParameters;

	const editCommandInput: UpdateCommandInput = {
		// @ts-ignore
		id: data.id!,
		order: data.order,
		baseCommand: data.baseCommand,
		title: data.title,
	};

	// Update command in db
	await API.graphql(
		graphqlOperation(updateCommand, { input: editCommandInput })
	);

	// Add new params to the db
	newParameters?.forEach(async (param) => {
		const createParameterInput = param;
		// hasBeenEdited and isCollapsed only exist on the frontend, so leaving them in the DB input would invalidate DB submission
		delete createParameterInput["hasBeenEdited"];
		delete createParameterInput["isCollapsed"];

		await API.graphql(
			graphqlOperation(createParameter, { input: createParameterInput })
		);
	});

	// Delete deleted params from db
	deletedParameters?.forEach(async (param) => {
		await API.graphql(
			graphqlOperation(deleteParameter, {
				input: { id: param.id },
			})
		);
	});

	updatedParameters?.forEach(async (param) => {
		const updateParameterInput = param;
		// DB

		delete updateParameterInput["hasBeenEdited"];
		delete updateParameterInput["isCollapsed"];
		await API.graphql(graphqlOperation(updateParameter, { input: param }));
	});
};

export const CommandSubmitUtils = {
	validateParameterOnSubmit,
	submitParamEditsToDB,
	sortSubmittedEditedParams,
	submitNewCommandAndParamsToDB,
	handleSubmit,
};
