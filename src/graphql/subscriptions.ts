/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateCommand = /* GraphQL */ `
  subscription OnCreateCommand(
    $filter: ModelSubscriptionCommandFilterInput
    $owner: String
  ) {
    onCreateCommand(filter: $filter, owner: $owner) {
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateCommand = /* GraphQL */ `
  subscription OnUpdateCommand(
    $filter: ModelSubscriptionCommandFilterInput
    $owner: String
  ) {
    onUpdateCommand(filter: $filter, owner: $owner) {
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteCommand = /* GraphQL */ `
  subscription OnDeleteCommand(
    $filter: ModelSubscriptionCommandFilterInput
    $owner: String
  ) {
    onDeleteCommand(filter: $filter, owner: $owner) {
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateParameter = /* GraphQL */ `
  subscription OnCreateParameter(
    $filter: ModelSubscriptionParameterFilterInput
    $owner: String
  ) {
    onCreateParameter(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateParameter = /* GraphQL */ `
  subscription OnUpdateParameter(
    $filter: ModelSubscriptionParameterFilterInput
    $owner: String
  ) {
    onUpdateParameter(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteParameter = /* GraphQL */ `
  subscription OnDeleteParameter(
    $filter: ModelSubscriptionParameterFilterInput
    $owner: String
  ) {
    onDeleteParameter(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
