/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCommand = /* GraphQL */ `
  query GetCommand($id: ID!) {
    getCommand(id: $id) {
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
export const listCommands = /* GraphQL */ `
  query ListCommands(
    $filter: ModelCommandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getParameter = /* GraphQL */ `
  query GetParameter($id: ID!) {
    getParameter(id: $id) {
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
export const listParameters = /* GraphQL */ `
  query ListParameters(
    $filter: ModelParameterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParameters(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        command {
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
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
