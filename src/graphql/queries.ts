/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      darkMode
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getCommand = /* GraphQL */ `query GetCommand($id: ID!) {
  getCommand(id: $id) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommandQueryVariables,
  APITypes.GetCommandQuery
>;
export const listCommands = /* GraphQL */ `query ListCommands(
  $filter: ModelCommandFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommands(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      baseCommand
      title
      order
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommandsQueryVariables,
  APITypes.ListCommandsQuery
>;
export const commandsByUserID = /* GraphQL */ `query CommandsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommandFilterInput
  $limit: Int
  $nextToken: String
) {
  commandsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      baseCommand
      title
      order
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommandsByUserIDQueryVariables,
  APITypes.CommandsByUserIDQuery
>;
