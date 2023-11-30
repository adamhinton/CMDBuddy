import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CMDBuddyCommand, CommandSchema } from "../../utils/zod/CommandSchema";
import { ParameterSchema } from "../../utils/zod/ParameterSchema";

const CommandCreationForm: React.FC = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CMDBuddyCommand>({
		resolver: zodResolver(
			CommandSchema.omit({
				id: true,
				order: true,
				userID: true,
			}).extend({
				parameters: ParameterSchema.omit({
					id: true,
					order: true,
					validationRegex: true,
					length: true,
					minValue: true,
					maxValue: true,
					allowedValues: true,
					commandID: true,
				}).array(),
			})
		),
	});

	const { fields, append } = useFieldArray({
		control,
		name: "parameters",
	});

	const onSubmit = (data: CMDBuddyCommand) => {
		console.log(data);
		// Handle command creation logic here
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Command Fields */}
			<div>
				<label htmlFor="baseCommand">Base Command</label>
				<input {...register("baseCommand")} />
				{errors.baseCommand && <p>{errors.baseCommand.message}</p>}
			</div>

			<div>
				<label htmlFor="title">Title</label>
				<input {...register("title")} />
				{errors.title && <p>{errors.title.message}</p>}
			</div>

			{/* Parameters Fields */}
			{fields.map((field, index) => (
				<div key={field.id}>
					<select {...register(`parameters.${index}.type`)}>
						<option value="STRING">String</option>
						<option value="INT">Int</option>
						<option value="BOOLEAN">Boolean</option>
						<option value="DROPDOWN">Dropdown</option>
					</select>
					<input
						{...register(`parameters.${index}.defaultValue`)}
						placeholder="Default Value"
					/>
					<input {...register(`parameters.${index}.name`)} placeholder="Name" />
					<input
						type="checkbox"
						{...register(`parameters.${index}.isNullable`)}
					/>
					<label htmlFor={`parameters.${index}.isNullable`}>Is Nullable</label>
				</div>
			))}

			<button type="button" onClick={() => append(defaultParameterValues)}>
				Add Parameter
			</button>

			<input type="submit" value="Create Command" />
		</form>
	);
};

export default CommandCreationForm;

type DefaultParameterValues = Omit<
	z.infer<typeof ParameterSchema>,
	| "id"
	| "order"
	| "commandID"
	| "validationRegex"
	| "length"
	| "minValue"
	| "maxValue"
	| "allowedValues"
>;

// Define default values for a new parameter
const defaultParameterValues: DefaultParameterValues = {
	type: "STRING", // Default type
	name: "", // Empty default name
	isNullable: false, // Default isNullable value
	defaultValue: "", // Empty default value
};
