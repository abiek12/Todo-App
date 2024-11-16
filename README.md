# Todo Application

This application allows users to manage projects and their associated todos. It provides the following functionalities:
1. **Create a new project**
   - Add, Update Title, and Delete
2. **Manage todos within a project**:
   - Add, Edit, Delete and Mark todos as complete
3. **Export project summary** to GitHub as a secret gist in Markdown format

## Features

- **User authentication** using jwt
- **CRUD operations** on projects and todos
- **Export project summary** as a secret gist on GitHub
- **Project and Todo Management** with task status tracking

## Technologies Used

This project uses the following technologies:

- **Node.js**: Backend framework
- **Express.js**: For building the API
- **MongoDB**: Database for storing data
- **Vue.js**: Frontend framework
- **GitHub API**: For exporting and creating Gists

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install from [https://nodejs.org](https://nodejs.org)
- **Vue.js**: You need Vue CLI to run the frontend. Install Vue CLI by running the following command:
  
    ```bash
    npm install -g @vue/cli
    ```
    
## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/abiek12/Todo-App-Hatio-Take-Home-Challenge-.git
    ```
    
2. Navigate to the project directory::

    ```bash
    cd Todo-App-Hatio-Take-Home-Challenge
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the server directory of your project and add the necessary environment variables (if any):

    ```env
    PORT=3000
    MONGO_URI=your_mongoDB_uri
    SALT_ROUND=10
    JWT_SECRET=secret@123
    GITHUB_API_URL=https://api.github.com/gists
    GITHUB_TOKEN=your_github_personal_access_token
    ```

## Running the Project

To run the project locally, use the following command:

```bash
npm run dev
