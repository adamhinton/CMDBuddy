# CMDBuddy

## Introduction

### What is CMDBuddy?

CMDBuddy is a full-stack application designed to help users create, manage, and customize CLI commands and their associated parameters.

This is meant for developers who often find themselves running the same CLI commands over and over, often with different dynamic variables. CMDBuddy streamlines that by letting them save commands, input values for the commands' parameters to the UI, and quickly copy the generated commands.

### Backend Overview

The backend is built with **AWS Amplify** and **GraphQL**, offering a robust and scalable architecture for data management and user authentication.

### Frontend

The frontend provides user-friendly interface built with **React** and **TypeScript**, supported by **styled-components, redux and Zod**

### What are the use cases?

QA Engineers who want to run E2E tests in different environments, with different variables, on different pipelines etc

Configuring different CI/CD deployment scripts

Automating routine tasks: savings commands for server restarts, deployment scripts, clearing caches, and more!

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Technical Information](#technical-information)
  - [Backend](#backend)
  - [Frontend (Planned)](#frontend-planned)

## Requirements

For development, you will need Node.js and npm installed on your environment.

## Installation

```bash
# Clone the repository
git clone https://github.com/adamhinton/CMDBuddy.git
# Navigate to the project directory
cd CMDBuddy
# Install dependencies
npm install
```

## Tech Stack

### Backend

- **AWS Amplify**: Used for hosting the backend and creating and deploying the GraphQL API.
- **GraphQL**: Responsible for defining the data schema and creating resolvers to handle specific data requests and mutations.

### Frontend

- **NextJS 13**: For routing, server components, data management and more.
- **React with TypeScript**: To build a dynamic, component-based user interface.
- **Styled-components**: For component-specific styles and theming.
- **Redux**: For state management, including the management of user-generated commands and parameters.
- **Zod**: For frontend type validation.
- **Next13's App Router**: For application routing and navigation.

## Features

### Backend Features

#### Data Management

- Handle CRUD operations (Create, Read, Update, Delete) for commands and parameters.
- Lambda sync functions between Cognito auth and User DB table

#### User Authentication (/login)

- User registration and login functionalities using AWS Amplify and Amazon Cognito.
- Cognito handles authentication/authorization. All User CRUD operations are synced between User table and Cognito.

#### Data Storage

- Database is hosted with AWS's DynamoDB
- GraphQL endpoints and queries are used to talk to the backend.

### Frontend Features

#### Command Creation (/commands/create)

- User starts by creating a new Command
- NOTE: This isn't where they fill out the values of Parameters and copy the generated command in to the CLI; that happens in commands/generate
- Each Command has a baseCommand, title, and many Parameters (see (#Tables-and-Relationships))
- **Add New Parameter**: User clicks "Add New Parameter" and adds parameters one by one.
  - e.g. if the command is `npx playwright test createPerson`, they might add parameters like `age`, `location`, `profession`.
- **Parameter Type**: Parameters can be STRING, INT, BOOLEAN, DROPDOWN or FLAG
- **Live Preview**: UI displays a live preview of the command the user has created
- **DragNDrop**: User can drag and drop Parameters to change their order
- **Collapsible**: User can collapse individual Parameters for easier organization.
- **Toolbar**: Each Parameter has a Toolbar with icons for collapse/uncollapse, DragnDrop and deletion.

- **Relevant Files**
  - CommandCreationOrEditForm.tsx
    - Parent component; has form UI to create base Command
    - Calls ParameterCreationOrEditForm.tsx when user clicks Add New Parameter
  - ParameterCreationOrEditForm.tsx
    -User selects a Parameter type (STRING, INT, BOOLEAN, DROPDOWN or FLAG) and the UI displays customized options for each of those types
  - CommandCreationTypes.ts
    - TS types for command creation
  - CommandCreationUtils.ts
    -Various command creation helper utils
  - LiveCommandCreationPreview.tsx
    - displays a live preview of the command the user is creating

#### Command Generation (/commands/generate)

- The meat and potatoes of CMDBuddy
- **Navigation**: User clicks a command in the sidebar, fills in values for the parameters they created in /command/create, and copies the generated CLI command to paste in to their command line
- **Validation**: Has real time validation based on specs the user inputted in commands/create, such as max length, validation regex, and more
- **Collapsible**: User can temporarily collapse individual Commands to focus on the ones they're currently using. They can also exit a Command, to only show the Commands on screen they want to use.

#### Commands Sidebar

- In commands/create, commands/edit and commands/generate
- Lists the user's Commands, with icons for deleting, editing, or generating said Commands
- Users can also Drag and Drop to change the order of Commands

#### Dark/Light mode

- User clicks the dark mode preference icon in the header
- This saves their preference to their account, or to localStorage if they're not logged in
- CMDBuddy remembers their preference when they visit the page in the future

#### User Authentication (/login)

- Combined login/registration page.
- Profile management page for updating settings or details.
- User can delete or change their account, login or register.
- Authentication/authorization handled by AWS's Cognito

#### Data Interaction

- Fetch and display user-specific commands and parameters.
- CRUD operations for commands and parameters reflecting changes on the backend.

#### Keyboard Shortcuts (Stretch)

- Implement shortcuts for common actions like copying a command.

#### About Page (/about)

- A basic how-to page to guide users.
- Contains use cases, UI examples, FAQ and more
- Has a Table of Contents for easy navigation

## Technical Information

### Backend

#### Tables and Relationships

- **User Table**: The central table that holds user information.

  - `id`: Unique identifier for each user.
  - `email`: User's email address.
  - `darkMode`: Boolean to store user's dark mode preference.
  - `commands`: List of the user's Commands
  - **Relationships**:
    - One-to-many relationship with the Command table via `commands`.

- **Command Table**: Stores the base commands.

  - `id`: Unique identifier for each command.
  - `baseCommand`: The actual command string, e.g. `npx playwright test myTestName`
  - `title`: A title to describe what the command does.
  - `order`: An integer to maintain the order of commands in the UI.
  - `userID`: Foreign key linking back to the User table.
  - **Relationships**:
    - Many-to-one relationship with the User table via `user`.
    - One-to-many relationship with the Parameter table via `parameters`.

- **Parameter Table**: Stores parameters for each command.
  - `id`: Unique identifier for each parameter.
  - `type`: The type of parameter (STRING, INT, BOOLEAN, DROPDOWN or FLAG).
  - `defaultValue`: The default value for the parameter.
  - `name`: The variable's name e.g. `age`.
  - `order`: An integer to maintain the order of parameters.
  - `validationRegex`: Regex to validate inputted parameter value
  - `minLength` and `maxLength` - specifying length constraints of STRING types
  - `minValue` and `maxValue` - specifying constraints of INT types
  - `isNullable`: Whether the user can leave this Parameter blank
  - `allowedValues`: The values the user can select from in DROPDOWN parameter
  - `commandID`: Foreign key linking back to the Command table.
  - **Relationships**:
    - Many-to-one relationship with the Command table via `command`.

#### GraphQL

- **Schema Definition**: The GraphQL schema defines the types and relationships between them.
- **Resolvers**: Custom logic to handle specific data requests and mutations.
- **Queries and Mutations**: GraphQL queries are used to fetch data, and mutations are used to modify data.
- **Security**: Utilizes AWS Amplify's built-in authentication to secure GraphQL endpoints.

### Frontend Technical Information

#### Styling

- **Styled-components** : Takes in user's dark/light mode preference to dynamically display theming. App is wrapped in styled-components' ThemeProvider to enable this.

#### Form Management

- **react-hook-form**: Uses r-h-f's powerful form management tools for submission and validation
- **zod**: Uses Zod schemas based on the graphQL tables to validate submitted Commands and Parameters

#### State Management

- **Redux**: Used for managing the state of user-generated commands and parameters. Holds the list of commands, dark mode preference, auth information.
- **Local State**: React's useState and useContext for component-level state.

##### Routing

- **Next13's App Router**: Manages application routing and navigation. Takes advantage of Next's folder-based routing.

##### Data Validation

- **Zod**: Used for frontend type validation to ensure data integrity before sending to the backend.
