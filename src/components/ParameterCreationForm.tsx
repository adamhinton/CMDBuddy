import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type FormProps = {
	index: number;
	removeParameter: Function;
};

const ParameterCreationForm = ({ index, removeParameter }: FormProps) => {
	const { register, watch } = useFormContext();
	const [parameterType, setParameterType] = useState("STRING");

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (type === "change" && name?.includes(`parameters.${index}.type`)) {
				setParameterType(value.parameters[index].type);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, index]);

	const renderParameterSpecificFields = () => {
		switch (parameterType) {
			case "STRING":
				return <StringParameterFields index={index} />;
			case "INT":
				return <IntParameterFields index={index} />;
			case "BOOLEAN":
				return <BooleanParameterFields index={index} />;
			case "DROPDOWN":
				return <DropdownParameterFields index={index} />;
			default:
				return null;
		}
	};

	return (
		<div>
			<label>Type</label>
			<select
				{...register(`parameters.${index}.type`)}
				onChange={(e) => setParameterType(e.target.value)}
			>
				<option value="STRING">String</option>
				<option value="INT">Int</option>
				<option value="BOOLEAN">Boolean</option>
				<option value="DROPDOWN">Dropdown</option>
			</select>

			{/* Shared Name field */}
			<input {...register(`parameters.${index}.name`)} placeholder="Name" />

			{renderParameterSpecificFields()}

			<button type="button" onClick={() => removeParameter(index)}>
				Delete Parameter
			</button>
		</div>
	);
};

const StringParameterFields = ({ index }: { index: number }) => {
	// String specific fields (if any)
	return <></>;
};

const IntParameterFields = ({ index }: { index: number }) => {
	// Integer specific fields (if any)
	return <></>;
};

const BooleanParameterFields = ({ index }: { index: number }) => {
	// Boolean specific fields (if any)
	return <></>;
};

const DropdownParameterFields = ({ index }: { index: number }) => {
	// Dropdown specific fields (if any)
	return <></>;
};

export default ParameterCreationForm;
