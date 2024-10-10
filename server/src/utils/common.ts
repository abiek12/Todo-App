import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SALT_ROUND = process.env.SALT_ROUND || 10;

export class httpStatus {
    INTERNAL_ERROR = 500;
    BAD_REQUEST = 400;
    NOT_FOUND = 404;
    UNAUTHORIZED = 401;
    CONFLICT = 409;
    SUCCESS = 200;
    CREATED = 201;
}

export class commonMessages {
    INTERNAL_ERORR = 'Internal Server Erorr';
    BAD_REQUEST = 'Bad Request';
    NOT_FOUND = 'Not Found';
    UNAUTHORIZED = 'Unautherised';
    SUCCESS = 'Ok';
}

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUND);
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);    
}

export const generateAccessToken = async (userId: string): Promise<string> => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
}

export const generateRefreshToken = async (userId: string): Promise<string> => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

export const createMarkdown = async (projectTitle: string, pendingTodos: any, completedTodos: any): Promise<any> => {
    try {
        const totalTodos = pendingTodos.length + completedTodos.length;
        const completedCount = completedTodos.length;

        const markdown = `
            # ${projectTitle}

            Summary: ${completedCount}/${totalTodos} todos completed

            ## Pending
            ${pendingTodos.map((pendingTodo: any) => `- [ ] ${pendingTodo.description}`).join('\n')}

            ## Completed
            ${completedTodos.map((completedTodo: any) => `- [x] ${completedTodo.description}`).join('\n')}
                `.trim();

        return markdown;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createPrivateGist = async (description: string, markdownContent: any, projectTitle: string): Promise<string> => {
    try {
        const token = process.env.GITHUB_TOKEN;

        // GitHub API request headers
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        // The gist data
        const data = {
            description: description,
            public: false,
            files: {
                [`${projectTitle}.md`]: {
                    content: markdownContent,
                },
            },
        };

        // GitHub API URL
        const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com/gists';

         // Create the gist
         const response = await axios.post(GITHUB_API_URL, data, { headers });
         return response.data.html_url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}