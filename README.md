# CMDBuddy

## Introduction

**Update 10.18.2023**:  
The project is in its early stages, with a basic API setup and plans for a dynamic frontend.

### What is CMDBuddy?
CMDBuddy is a full-stack application designed to help users create, manage, and customize CLI commands and their associated parameters.

### Backend
The backend is built with **AWS Amplify** and **GraphQL**, offering a robust and scalable architecture for data management and user authentication.

### Frontend (In Planning)
The frontend, currently in the planning stage, aims to provide a user-friendly interface built with **React** and **TypeScript**.

### Who is this for?
This application serves as a centralized hub for all your command-line needs, offering features like real-time command previews, drag-and-drop functionality, and much more.


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
  - **Relationships**:
    - One-to-many relationship with the Command table via `commands`.

- **Command Table**: Stores the base commands.
  - `id`: Unique identifier for each command.
  - `baseCommand`: The actual command string.
  - `title`: A title to describe what the command does.
  - `order`: An integer to maintain the order of commands.
  - `userID`: Foreign key linking back to the User table.
  - **Relationships**:
    - Many-to-one relationship with the User table via `user`.
    - One-to-many relationship with the Parameter table via `parameters`.

- **Parameter Table**: Stores parameters for each command.
  - `id`: Unique identifier for each parameter.
  - `type`: The type of parameter (STRING, INT, BOOLEAN, DROPDOWN).
  - `defaultValue`: The default value for the parameter.
  - `name`: The name of the parameter.
  - `order`: An integer to maintain the order of parameters.
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

- `<App>`: The root component that houses all other components.
  - `<Header>`: Contains navigation and user settings.
    - `<Dropdown>`: Allows users to filter commands.
  - `<CommandList>`: Displays a list of user commands.
    - `<CommandItem>`: Individual command items within the list.
      - `<ParameterList>`: Lists parameters for each command.
        - `<ParameterItem>`: Individual parameters.

##### State Management

- **Redux**: Used for managing the state of user-generated commands and parameters.
- **Local State**: React's useState and useContext for component-level state.

##### Routing

- **React-Router-Dom**: Manages application routing and navigation.

##### Data Validation

- **Zod**: Used for frontend type validation to ensure data integrity before sending to the backend.


