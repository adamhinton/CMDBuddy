import React from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";

const ParameterExecutionForm = ({
	parameter,
}: {
	parameter: CMDBuddyParameter;
}) => {
	const { register } = useFormContext();

	// Render input based on parameter type
	const renderInputField = () => {
		switch (parameter.type) {
			case "STRING":
				return (
					<input
						type="text"
						{...register(parameter.name, {
							required: !parameter.isNullable,
							maxLength: parameter.maxLength,
							minLength: parameter.minLength,
							pattern: parameter.validationRegex
								? new RegExp(parameter.validationRegex)
								: undefined,
						})}
					/>
				);
			case "INT":
				return (
					<input
						type="number"
						{...register(parameter.name, {
							required: !parameter.isNullable,
							max: parameter.maxValue,
							min: parameter.minValue,
						})}
					/>
				);
			case "BOOLEAN":
				return (
					<div>
						<label>
							<input
								type="radio"
								value="true"
								{...register(parameter.name, {
									required: !parameter.isNullable,
								})}
							/>
							True
						</label>
						<label>
							<input
								type="radio"
								value="false"
								{...register(parameter.name, {
									required: !parameter.isNullable,
								})}
							/>
							False
						</label>
					</div>
				);
			case "DROPDOWN":
				return (
					<select
						{...register(parameter.name, {
							required: !parameter.isNullable,
							value: parameter.defaultValue,
						})}
					>
						{parameter.allowedValues?.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
				);
			case "FLAG":
				return (
					<div>
						<label>
							<input
								type="radio"
								value="On"
								{...register(parameter.name, {
									required: !parameter.isNullable,
								})}
							/>
							On
						</label>
						<label>
							<input
								type="radio"
								value="Off"
								{...register(parameter.name, {
									required: !parameter.isNullable,
								})}
							/>
							Off
						</label>
					</div>
				);
			default:
				return <p>Unsupported parameter type</p>;
		}
	};

	return (
		<div>
			<label htmlFor={parameter.name}>{parameter.name}</label>
			{renderInputField()}
		</div>
	);
};

export default ParameterExecutionForm;
