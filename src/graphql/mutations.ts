/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCommand = /* GraphQL */ `
  mutation CreateCommand(
    $input: CreateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    createCommand(input: $input, condition: $condition) {
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
export const updateCommand = /* GraphQL */ `
  mutation UpdateCommand(
    $input: UpdateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    updateCommand(input: $input, condition: $condition) {
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
export const deleteCommand = /* GraphQL */ `
  mutation DeleteCommand(
    $input: DeleteCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    deleteCommand(input: $input, condition: $condition) {
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
export const createParameter = /* GraphQL */ `
  mutation CreateParameter(
    $input: CreateParameterInput!
    $condition: ModelParameterConditionInput
  ) {
    createParameter(input: $input, condition: $condition) {
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
export const updateParameter = /* GraphQL */ `
  mutation UpdateParameter(
    $input: UpdateParameterInput!
    $condition: ModelParameterConditionInput
  ) {
    updateParameter(input: $input, condition: $condition) {
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
export const deleteParameter = /* GraphQL */ `
  mutation DeleteParameter(
    $input: DeleteParameterInput!
    $condition: ModelParameterConditionInput
  ) {
    deleteParameter(input: $input, condition: $condition) {
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
