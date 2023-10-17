/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  darkMode: boolean,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  darkMode?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  darkMode: boolean,
  commands?: ModelCommandConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCommandConnection = {
  __typename: "ModelCommandConnection",
  items:  Array<Command | null >,
  nextToken?: string | null,
};

export type Command = {
  __typename: "Command",
  id: string,
  userID: string,
  baseCommand: string,
  title: string,
  order: number,
  parameters?: ModelParameterConnection | null,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelParameterConnection = {
  __typename: "ModelParameterConnection",
  items:  Array<Parameter | null >,
  nextToken?: string | null,
};

export type Parameter = {
  __typename: "Parameter",
  id: string,
  commandID: string,
  type: ParameterType,
  defaultValue?: string | null,
  name: string,
  order: number,
  validationRegex?: string | null,
  length?: number | null,
  minValue?: number | null,
  maxValue?: number | null,
  isNullable?: boolean | null,
  allowedValues?: Array< string | null > | null,
  command?: Command | null,
  createdAt: string,
  updatedAt: string,
};

export enum ParameterType {
  STRING = "STRING",
  INT = "INT",
  BOOLEAN = "BOOLEAN",
  DROPDOWN = "DROPDOWN",
}


export type UpdateUserInput = {
  id: string,
  email?: string | null,
  darkMode?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCommandInput = {
  id?: string | null,
  userID: string,
  baseCommand: string,
  title: string,
  order: number,
};

export type ModelCommandConditionInput = {
  userID?: ModelIDInput | null,
  baseCommand?: ModelStringInput | null,
  title?: ModelStringInput | null,
  order?: ModelIntInput | null,
  and?: Array< ModelCommandConditionInput | null > | null,
  or?: Array< ModelCommandConditionInput | null > | null,
  not?: ModelCommandConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateCommandInput = {
  id: string,
  userID?: string | null,
  baseCommand?: string | null,
  title?: string | null,
  order?: number | null,
};

export type DeleteCommandInput = {
  id: string,
};

export type CreateParameterInput = {
  id?: string | null,
  commandID: string,
  type: ParameterType,
  defaultValue?: string | null,
  name: string,
  order: number,
  validationRegex?: string | null,
  length?: number | null,
  minValue?: number | null,
  maxValue?: number | null,
  isNullable?: boolean | null,
  allowedValues?: Array< string | null > | null,
};

export type ModelParameterConditionInput = {
  commandID?: ModelIDInput | null,
  type?: ModelParameterTypeInput | null,
  defaultValue?: ModelStringInput | null,
  name?: ModelStringInput | null,
  order?: ModelIntInput | null,
  validationRegex?: ModelStringInput | null,
  length?: ModelIntInput | null,
  minValue?: ModelIntInput | null,
  maxValue?: ModelIntInput | null,
  isNullable?: ModelBooleanInput | null,
  allowedValues?: ModelStringInput | null,
  and?: Array< ModelParameterConditionInput | null > | null,
  or?: Array< ModelParameterConditionInput | null > | null,
  not?: ModelParameterConditionInput | null,
};

export type ModelParameterTypeInput = {
  eq?: ParameterType | null,
  ne?: ParameterType | null,
};

export type UpdateParameterInput = {
  id: string,
  commandID?: string | null,
  type?: ParameterType | null,
  defaultValue?: string | null,
  name?: string | null,
  order?: number | null,
  validationRegex?: string | null,
  length?: number | null,
  minValue?: number | null,
  maxValue?: number | null,
  isNullable?: boolean | null,
  allowedValues?: Array< string | null > | null,
};

export type DeleteParameterInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  darkMode?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelCommandFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  baseCommand?: ModelStringInput | null,
  title?: ModelStringInput | null,
  order?: ModelIntInput | null,
  and?: Array< ModelCommandFilterInput | null > | null,
  or?: Array< ModelCommandFilterInput | null > | null,
  not?: ModelCommandFilterInput | null,
};

export type ModelParameterFilterInput = {
  id?: ModelIDInput | null,
  commandID?: ModelIDInput | null,
  type?: ModelParameterTypeInput | null,
  defaultValue?: ModelStringInput | null,
  name?: ModelStringInput | null,
  order?: ModelIntInput | null,
  validationRegex?: ModelStringInput | null,
  length?: ModelIntInput | null,
  minValue?: ModelIntInput | null,
  maxValue?: ModelIntInput | null,
  isNullable?: ModelBooleanInput | null,
  allowedValues?: ModelStringInput | null,
  and?: Array< ModelParameterFilterInput | null > | null,
  or?: Array< ModelParameterFilterInput | null > | null,
  not?: ModelParameterFilterInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  darkMode?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionCommandFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  baseCommand?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  order?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionCommandFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommandFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionParameterFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  commandID?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  defaultValue?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  order?: ModelSubscriptionIntInput | null,
  validationRegex?: ModelSubscriptionStringInput | null,
  length?: ModelSubscriptionIntInput | null,
  minValue?: ModelSubscriptionIntInput | null,
  maxValue?: ModelSubscriptionIntInput | null,
  isNullable?: ModelSubscriptionBooleanInput | null,
  allowedValues?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionParameterFilterInput | null > | null,
  or?: Array< ModelSubscriptionParameterFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommandMutationVariables = {
  input: CreateCommandInput,
  condition?: ModelCommandConditionInput | null,
};

export type CreateCommandMutation = {
  createCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommandMutationVariables = {
  input: UpdateCommandInput,
  condition?: ModelCommandConditionInput | null,
};

export type UpdateCommandMutation = {
  updateCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommandMutationVariables = {
  input: DeleteCommandInput,
  condition?: ModelCommandConditionInput | null,
};

export type DeleteCommandMutation = {
  deleteCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateParameterMutationVariables = {
  input: CreateParameterInput,
  condition?: ModelParameterConditionInput | null,
};

export type CreateParameterMutation = {
  createParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateParameterMutationVariables = {
  input: UpdateParameterInput,
  condition?: ModelParameterConditionInput | null,
};

export type UpdateParameterMutation = {
  updateParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteParameterMutationVariables = {
  input: DeleteParameterInput,
  condition?: ModelParameterConditionInput | null,
};

export type DeleteParameterMutation = {
  deleteParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommandQueryVariables = {
  id: string,
};

export type GetCommandQuery = {
  getCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommandsQueryVariables = {
  filter?: ModelCommandFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommandsQuery = {
  listCommands?:  {
    __typename: "ModelCommandConnection",
    items:  Array< {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetParameterQueryVariables = {
  id: string,
};

export type GetParameterQuery = {
  getParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListParametersQueryVariables = {
  filter?: ModelParameterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParametersQuery = {
  listParameters?:  {
    __typename: "ModelParameterConnection",
    items:  Array< {
      __typename: "Parameter",
      id: string,
      commandID: string,
      type: ParameterType,
      defaultValue?: string | null,
      name: string,
      order: number,
      validationRegex?: string | null,
      length?: number | null,
      minValue?: number | null,
      maxValue?: number | null,
      isNullable?: boolean | null,
      allowedValues?: Array< string | null > | null,
      command?:  {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    darkMode: boolean,
    commands?:  {
      __typename: "ModelCommandConnection",
      items:  Array< {
        __typename: "Command",
        id: string,
        userID: string,
        baseCommand: string,
        title: string,
        order: number,
        parameters?:  {
          __typename: "ModelParameterConnection",
          nextToken?: string | null,
        } | null,
        user?:  {
          __typename: "User",
          id: string,
          email: string,
          darkMode: boolean,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommandSubscriptionVariables = {
  filter?: ModelSubscriptionCommandFilterInput | null,
};

export type OnCreateCommandSubscription = {
  onCreateCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommandSubscriptionVariables = {
  filter?: ModelSubscriptionCommandFilterInput | null,
};

export type OnUpdateCommandSubscription = {
  onUpdateCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommandSubscriptionVariables = {
  filter?: ModelSubscriptionCommandFilterInput | null,
};

export type OnDeleteCommandSubscription = {
  onDeleteCommand?:  {
    __typename: "Command",
    id: string,
    userID: string,
    baseCommand: string,
    title: string,
    order: number,
    parameters?:  {
      __typename: "ModelParameterConnection",
      items:  Array< {
        __typename: "Parameter",
        id: string,
        commandID: string,
        type: ParameterType,
        defaultValue?: string | null,
        name: string,
        order: number,
        validationRegex?: string | null,
        length?: number | null,
        minValue?: number | null,
        maxValue?: number | null,
        isNullable?: boolean | null,
        allowedValues?: Array< string | null > | null,
        command?:  {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      darkMode: boolean,
      commands?:  {
        __typename: "ModelCommandConnection",
        items:  Array< {
          __typename: "Command",
          id: string,
          userID: string,
          baseCommand: string,
          title: string,
          order: number,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnCreateParameterSubscription = {
  onCreateParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnUpdateParameterSubscription = {
  onUpdateParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteParameterSubscriptionVariables = {
  filter?: ModelSubscriptionParameterFilterInput | null,
};

export type OnDeleteParameterSubscription = {
  onDeleteParameter?:  {
    __typename: "Parameter",
    id: string,
    commandID: string,
    type: ParameterType,
    defaultValue?: string | null,
    name: string,
    order: number,
    validationRegex?: string | null,
    length?: number | null,
    minValue?: number | null,
    maxValue?: number | null,
    isNullable?: boolean | null,
    allowedValues?: Array< string | null > | null,
    command?:  {
      __typename: "Command",
      id: string,
      userID: string,
      baseCommand: string,
      title: string,
      order: number,
      parameters?:  {
        __typename: "ModelParameterConnection",
        items:  Array< {
          __typename: "Parameter",
          id: string,
          commandID: string,
          type: ParameterType,
          defaultValue?: string | null,
          name: string,
          order: number,
          validationRegex?: string | null,
          length?: number | null,
          minValue?: number | null,
          maxValue?: number | null,
          isNullable?: boolean | null,
          allowedValues?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        darkMode: boolean,
        commands?:  {
          __typename: "ModelCommandConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
