// README:
// User fills out this form to create a Command
// Each Command has multiple Parameters; they fill out ParameterCreationForm once per Parameter
// Parameters can be of type STRING, INT, BOOLEAN, DROPDOWN or FLAG, there will be different fields for each

// TODO:
// Also clear form on submit - but instate submit logic first and get that squared away
// Collapse Params && Collapse All && Expand All
// Order before or after baseCommand. FLAG comes after, everything else comes first?
// Final validation on submit. Like make sure defaultValue meets other criteria, that minLength is less than maxLength.

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

import {
	useForm,
	useFieldArray,
	FormProvider,
	useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CommandSchema } from "../../utils/zod/CommandSchema";
import ParameterCreationForm from "./ParameterCreationForm";
import {
	CommandCreationUtils,
	AnyParameter,
} from "../../utils/CommandCreationUtils";
import LiveCommandPreview from "./LiveCommandPreview";

const {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
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
type CMDBuddyCommandFormValidation = z.infer<typeof CommandCreationFormSchema>;

const CommandCreationForm: React.FC = () => {
	const methods = useForm<CMDBuddyCommandFormValidation>({
		resolver: zodResolver(CommandCreationFormSchema),
	});

	const { watch } = methods;

	type FilteredParameter = {
		name?: string;
		defaultValue?: string;
	};

	// This state and useEffect are for the sake of LiveCommandPreview which shows a preview of the Command you've created. Like it'll show `companyName= zipCode= npx playwright test testName --headed`
	const [filteredParameters, setFilteredParameters] = useState<
		FilteredParameter[]
	>([]);

	const isLoggedIn = useSelector((state: RootState) => {
		return state.auth.user ? true : false;
	});
	const router = useRouter();

	useEffect(() => {
		!isLoggedIn && router.push("login");
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

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	const onSubmit = (data: CMDBuddyCommandFormValidation) => {
		console.log(data);

		const parameters: AnyParameter[] | undefined = data.parameters;
		let nonFlagOrder = 1;
		let flagOrder = 1;

		parameters?.forEach((parameter) => {
			if (parameter.type === "FLAG") {
				parameter.order = flagOrder++;
			} else {
				parameter.order = nonFlagOrder++;
			}
		});

		console.log("TRANSFORMED data:", data.parameters);
		// Handle command creation logic here

		// TODO:
		// Add Order
		// Any leftover validation
		// Submit CMD, get id back, submit Params with id
	};

	// Maybe refactor this to also clear form on submit. Wouldn't need the user conf then.
	const clearForm = () => {
		if (
			window.confirm("Are you sure you want to DELETE all values in this form?")
		) {
			methods.reset(); // Resets the form to default values
			remove(); // Removes all parameter fields
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{/* Command Fields */}
				<div>
					<label htmlFor="baseCommand">Base Command</label>
					<input
						{...methods.register("baseCommand")}
						placeholder="npm test myTestName"
					/>
					{methods.formState.errors.baseCommand && (
						<p>{methods.formState.errors.baseCommand.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="title">Title</label>
					<input {...methods.register("title")} />
					{methods.formState.errors.title && (
						<p>{methods.formState.errors.title.message}</p>
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

				<button
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
				</button>

				<button type="button" onClick={clearForm}>
					Clear Form
				</button>

				<button type="submit">Create Command</button>

				{/* This shows an example of the Command the user has created. */}
				{/* Example: `companyName= zipCode= npx playwright test createCompany --headed` */}
				<LiveCommandPreview
					baseCommand={methods.getValues().baseCommand}
					parameters={methods.getValues().parameters}
					watch={watch}
				/>
			</form>
		</FormProvider>
	);
};

export default CommandCreationForm;
