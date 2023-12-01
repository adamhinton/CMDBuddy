import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CMDBuddyCommand, CommandSchema } from "../../utils/zod/CommandSchema";
import { ParameterSchema } from "../../utils/zod/ParameterSchema";

const CommandCreationForm: React.FC = () => {
	const {
		register,
		watch,
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

	const { fields, append, remove } = useFieldArray({
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
			{fields.map((field, index) => {
				const name = watch(`parameters.${index}.name`);

				return (
					<section key={field.id}>
						<h3>{field.name || `Parameter ${index + 1}`}</h3>

						<label htmlFor={`parameters.${index}.type`}>Type</label>
						<select {...register(`parameters.${index}.type`)}>
							<option value="STRING">String</option>
							<option value="INT">Int</option>
							<option value="BOOLEAN">Boolean</option>
							<option value="DROPDOWN">Dropdown</option>
						</select>

						<label htmlFor={`parameters.${index}.defaultValue`}>
							Default Value
						</label>
						<input
							{...register(`parameters.${index}.defaultValue`)}
							placeholder="Default Value"
						/>

						<label htmlFor={`parameters.${index}.name`}>Name</label>
						<input
							{...register(`parameters.${index}.name`)}
							placeholder="Name"
						/>

						<input
							type="checkbox"
							{...register(`parameters.${index}.isNullable`)}
						/>
						<label htmlFor={`parameters.${index}.isNullable`}>
							Is Nullable
						</label>

						<button type="button" onClick={() => remove(index)}>
							Delete Parameter
						</button>
					</section>
				);
			})}

			<button
				type="button"
				// TODO: Fix this as any. It wanted a full Parameter and we're just passing a partial one.
				onClick={() => append(defaultParameterValues as any)}
			>
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
	type: "STRING",
	name: "",
	isNullable: false,
	defaultValue: "",
};
