/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    email
    darkMode
    commands {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    email
    darkMode
    commands {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    email
    darkMode
    commands {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createCommand = /* GraphQL */ `mutation CreateCommand(
  $input: CreateCommandInput!
  $condition: ModelCommandConditionInput
) {
  createCommand(input: $input, condition: $condition) {
    id
    baseCommand
    title
    order
    userID
    user {
      id
      email
      darkMode
      createdAt
      updatedAt
      __typename
    }
    parameters {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommandMutationVariables,
  APITypes.CreateCommandMutation
>;
export const updateCommand = /* GraphQL */ `mutation UpdateCommand(
  $input: UpdateCommandInput!
  $condition: ModelCommandConditionInput
) {
  updateCommand(input: $input, condition: $condition) {
    id
    baseCommand
    title
    order
    userID
    user {
      id
      email
      darkMode
      createdAt
      updatedAt
      __typename
    }
    parameters {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommandMutationVariables,
  APITypes.UpdateCommandMutation
>;
export const deleteCommand = /* GraphQL */ `mutation DeleteCommand(
  $input: DeleteCommandInput!
  $condition: ModelCommandConditionInput
) {
  deleteCommand(input: $input, condition: $condition) {
    id
    baseCommand
    title
    order
    userID
    user {
      id
      email
      darkMode
      createdAt
      updatedAt
      __typename
    }
    parameters {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommandMutationVariables,
  APITypes.DeleteCommandMutation
>;
export const createParameter = /* GraphQL */ `mutation CreateParameter(
  $input: CreateParameterInput!
  $condition: ModelParameterConditionInput
) {
  createParameter(input: $input, condition: $condition) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    length
    minValue
    maxValue
    isNullable
    allowedValues
    commandID
    command {
      id
      baseCommand
      title
      order
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateParameterMutationVariables,
  APITypes.CreateParameterMutation
>;
export const updateParameter = /* GraphQL */ `mutation UpdateParameter(
  $input: UpdateParameterInput!
  $condition: ModelParameterConditionInput
) {
  updateParameter(input: $input, condition: $condition) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    length
    minValue
    maxValue
    isNullable
    allowedValues
    commandID
    command {
      id
      baseCommand
      title
      order
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateParameterMutationVariables,
  APITypes.UpdateParameterMutation
>;
export const deleteParameter = /* GraphQL */ `mutation DeleteParameter(
  $input: DeleteParameterInput!
  $condition: ModelParameterConditionInput
) {
  deleteParameter(input: $input, condition: $condition) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    length
    minValue
    maxValue
    isNullable
    allowedValues
    commandID
    command {
      id
      baseCommand
      title
      order
      userID
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteParameterMutationVariables,
  APITypes.DeleteParameterMutation
>;
