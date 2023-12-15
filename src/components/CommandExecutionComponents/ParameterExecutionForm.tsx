import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";

const ParameterExecutionForm = ({
	parameter,
}: {
	parameter: CMDBuddyParameter;
}) => {
	return <div>{parameter.name}</div>;
};

export default ParameterExecutionForm;
