import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../utils/zod/ParameterSchema";

type FormProps = {
	index: number;
	removeParameter: Function;
};

const ParameterCreationForm = ({ index, removeParameter }: FormProps) => {
	const { register, watch, setValue } = useFormContext();
	const [parameterType, setParameterType] = useState("STRING");

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (type === "change" && name?.includes(`parameters.${index}.type`)) {
				setParameterType(value.parameters[index].type);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, index]);

	const renderParameterFields = () => {
		switch (parameterType) {
			case "STRING":
				return <StringParameterFields index={index} />;
			case "INT":
				return <IntParameterFields index={index} />;
			// Add cases for other types
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
				{/* Other types */}
			</select>

			{renderParameterFields()}

			<button type="button" onClick={() => removeParameter(index)}>
				Delete Parameter
			</button>
		</div>
	);
};

const StringParameterFields = ({ index }: { index: number }) => {
	const { register } = useFormContext();
	return (
		<>
			{/* String specific fields */}
			<input
				type="string"
				{...register(`parameters.${index}.name`)}
				placeholder="Name"
			/>
		</>
	);
};

const IntParameterFields = ({ index }: { index: number }) => {
	const { register } = useFormContext();
	return (
		<>
			{/* Integer specific fields */}
			<input
				type="string"
				{...register(`parameters.${index}.name`)}
				placeholder="Name"
			/>
		</>
	);
};

export default ParameterCreationForm;
