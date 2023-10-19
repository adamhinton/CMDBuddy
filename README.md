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


