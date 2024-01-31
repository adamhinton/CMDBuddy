import { useForm } from "react-hook-form";
import { AnyParameter } from "../../utils/CommandCreationUtils/CommandCreationTypes";
import { validateParameterOnSubmit } from "../../utils/CommandCreationUtils/CommandSubmissionUtils";
import { CMDBuddyCommandFormValidation } from "@/components/CommandCreationComponents/CommandCreationOrEditForm";

const testParam: AnyParameter = {
	type: "STRING",
	name: "Bob",
	isNullable: true,
};

jest.mock("react-hook-form", () => ({
	...jest.requireActual("react-hook-form"), // This line preserves other exports from react-hook-form
	useForm: jest.fn(() => {
		methods: jest.fn();
	}),
}));

// const fakeMethods = jest.fn(() => {});
// const fakeMethods = jest.mock("react-hook-form");
// const bob = fakeMethods.x;

const isParameterValid = validateParameterOnSubmit(
	testParam,
	1,
	useForm.methods,
	true,
	jest.fn()
);
