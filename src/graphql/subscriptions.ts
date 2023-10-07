/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      email
      password
      darkMode
      commands {
        items {
          id
          userID
          baseCommand
          title
          order
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      email
      password
      darkMode
      commands {
        items {
          id
          userID
          baseCommand
          title
          order
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      email
      password
      darkMode
      commands {
        items {
          id
          userID
          baseCommand
          title
          order
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommand = /* GraphQL */ `
  subscription OnCreateCommand($filter: ModelSubscriptionCommandFilterInput) {
    onCreateCommand(filter: $filter) {
      id
      userID
      baseCommand
      title
      order
      parameters {
        items {
          id
          commandID
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      user {
        id
        email
        password
        darkMode
        commands {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommand = /* GraphQL */ `
  subscription OnUpdateCommand($filter: ModelSubscriptionCommandFilterInput) {
    onUpdateCommand(filter: $filter) {
      id
      userID
      baseCommand
      title
      order
      parameters {
        items {
          id
          commandID
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      user {
        id
        email
        password
        darkMode
        commands {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommand = /* GraphQL */ `
  subscription OnDeleteCommand($filter: ModelSubscriptionCommandFilterInput) {
    onDeleteCommand(filter: $filter) {
      id
      userID
      baseCommand
      title
      order
      parameters {
        items {
          id
          commandID
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      user {
        id
        email
        password
        darkMode
        commands {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateParameter = /* GraphQL */ `
  subscription OnCreateParameter(
    $filter: ModelSubscriptionParameterFilterInput
  ) {
    onCreateParameter(filter: $filter) {
      id
      commandID
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
      command {
        id
        userID
        baseCommand
        title
        order
        parameters {
          nextToken
          __typename
        }
        user {
          id
          email
          password
          darkMode
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateParameter = /* GraphQL */ `
  subscription OnUpdateParameter(
    $filter: ModelSubscriptionParameterFilterInput
  ) {
    onUpdateParameter(filter: $filter) {
      id
      commandID
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
      command {
        id
        userID
        baseCommand
        title
        order
        parameters {
          nextToken
          __typename
        }
        user {
          id
          email
          password
          darkMode
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteParameter = /* GraphQL */ `
  subscription OnDeleteParameter(
    $filter: ModelSubscriptionParameterFilterInput
  ) {
    onDeleteParameter(filter: $filter) {
      id
      commandID
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
      command {
        id
        userID
        baseCommand
        title
        order
        parameters {
          nextToken
          __typename
        }
        user {
          id
          email
          password
          darkMode
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;