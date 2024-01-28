# CMDBuddy

## Introduction

### What is CMDBuddy?

CMDBuddy is a full-stack application designed to help users create, manage, and customize CLI commands and their associated parameters.

This is designed for developers who often find themselves running the same CLI commands over and over, often with different dynamic variables. CMDBuddy streamlines that by letting them save commands, input values for the parameters to the UI, and quickly copy the generated commands.

### Backend

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

### Frontend (Planned)

- **React with TypeScript**: To build a dynamic, component-based user interface.
- **Styled-components**: For component-specific styles and theming.
- **Vite**: As the build and development tool.
- **Redux**: For state management, including the management of user-generated commands and parameters.
- **Zod**: For frontend type validation.
- **React-Router-Dom**: For application routing and navigation.

## Features

### Backend

#### Data Management

- Handle CRUD operations (Create, Read, Update, Delete) for commands and parameters.
- Implement data validation logic, including user-defined regex patterns.

#### User Authentication

- Implement user registration and login functionalities using AWS Amplify and Amazon Cognito.
- Security measures such as encrypted passwords and secure tokens.

#### Data Storage

- Store user data, commands, parameters, and potential saved commands.
- Ensure data integrity and consistency.

#### Guest User Features

- Design allows for functionalities that don't strictly require authentication.

### Frontend (Planned)

#### User Interface

- Dynamic command input and display modules.
- Drag-and-drop functionality for reordering commands and parameters.
- Dark mode toggle based on user preference.

#### User Authentication

- Combined login/registration page.
- Profile management page for updating settings or details.
- Guest user functionality with certain limitations.

#### Data Interaction

- Fetch and display user-specific commands and parameters.
- CRUD operations for commands and parameters reflecting changes on the backend.

#### Keyboard Shortcuts (Stretch)

- Implement shortcuts for common actions like copying a command.

#### How-to Guide & User Feedback (Stretch)

- A basic how-to page to guide users.
- A simple feedback or suggestions form.

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

#### Frontend (Planned)

##### Component Structure

TODO: Fill out component structures

##### State Management

- **Redux**: Used for managing the state of user-generated commands and parameters.
- **Local State**: React's useState and useContext for component-level state.

##### Routing

- **React-Router-Dom**: Manages application routing and navigation.

##### Data Validation

- **Zod**: Used for frontend type validation to ensure data integrity before sending to the backend.
