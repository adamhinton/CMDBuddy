/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { User } from "../API.ts";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
    email?: string;
    darkMode?: boolean;
};
export declare type UserUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    darkMode?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    darkMode?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
