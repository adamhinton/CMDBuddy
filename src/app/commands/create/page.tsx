import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config, ssr: true });

// Calling this CommandCreationForm here because we're not using its "edit" mode in this file
import CommandCreationForm, {
	ComponentMode,
} from "@/components/CommandCreationComponents/CommandCreationOrEditForm";

const CreateCommandsPage = () => {
	return <CommandCreationForm componentMode={"createNewCommand"} />;
};

export default CreateCommandsPage;
