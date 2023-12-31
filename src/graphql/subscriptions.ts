/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateCommand = /* GraphQL */ `subscription OnCreateCommand($filter: ModelSubscriptionCommandFilterInput) {
  onCreateCommand(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCommandSubscriptionVariables,
  APITypes.OnCreateCommandSubscription
>;
export const onUpdateCommand = /* GraphQL */ `subscription OnUpdateCommand($filter: ModelSubscriptionCommandFilterInput) {
  onUpdateCommand(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommandSubscriptionVariables,
  APITypes.OnUpdateCommandSubscription
>;
export const onDeleteCommand = /* GraphQL */ `subscription OnDeleteCommand($filter: ModelSubscriptionCommandFilterInput) {
  onDeleteCommand(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommandSubscriptionVariables,
  APITypes.OnDeleteCommandSubscription
>;
export const onCreateParameter = /* GraphQL */ `subscription OnCreateParameter($filter: ModelSubscriptionParameterFilterInput) {
  onCreateParameter(filter: $filter) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    minLength
    maxLength
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
` as GeneratedSubscription<
  APITypes.OnCreateParameterSubscriptionVariables,
  APITypes.OnCreateParameterSubscription
>;
export const onUpdateParameter = /* GraphQL */ `subscription OnUpdateParameter($filter: ModelSubscriptionParameterFilterInput) {
  onUpdateParameter(filter: $filter) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    minLength
    maxLength
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
` as GeneratedSubscription<
  APITypes.OnUpdateParameterSubscriptionVariables,
  APITypes.OnUpdateParameterSubscription
>;
export const onDeleteParameter = /* GraphQL */ `subscription OnDeleteParameter($filter: ModelSubscriptionParameterFilterInput) {
  onDeleteParameter(filter: $filter) {
    id
    type
    defaultValue
    name
    order
    validationRegex
    minLength
    maxLength
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
` as GeneratedSubscription<
  APITypes.OnDeleteParameterSubscriptionVariables,
  APITypes.OnDeleteParameterSubscription
>;
