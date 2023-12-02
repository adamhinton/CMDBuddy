import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CommandSchema, CMDBuddyCommand } from "../../utils/zod/CommandSchema";
import ParameterCreationForm from "./ParameterCreationForm"; // Assuming this is the correct path
import { ParameterSchema } from "../../utils/zod/ParameterSchema";
import {
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
} from "./ParameterCreationForm";
import { cwd } from "process";

// Creating a specific schema for the Command Creation Form
// This is because the user doesn't define things like `id` or `order`
export const CommandCreationFormSchema = CommandSchema.omit({
	id: true,
	order: true,
	userID: true,
}).extend({
	// Each Parameter can be one of four types
	parameters: z
		.array(
			z.union([
				StringParameterSchema,
				IntParameterSchema,
				BooleanParameterSchema,
				DropdownParameterSchema,
			])
		)
		.optional(),
});
type CMDBuddyCommandFormValidation = z.infer<typeof CommandCreationFormSchema>;

const CommandCreationForm: React.FC = () => {
	const methods = useForm<CMDBuddyCommandFormValidation>({
		resolver: zodResolver(CommandCreationFormSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "parameters",
	});

	console.log(
		"methods.getValues().parameters:",
		methods.getValues().parameters
	);

	const onSubmit = (data: CMDBuddyCommandFormValidation) => {
		console.log("submitting");
		console.log(data);
		// Handle command creation logic here
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{/* Command Fields */}
				<div>
					<label htmlFor="baseCommand">Base Command</label>
					<input {...methods.register("baseCommand")} />
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

				{/* Parameters Fields */}
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

				<button type="submit">Create Command</button>
			</form>
		</FormProvider>
	);
};

export default CommandCreationForm;
