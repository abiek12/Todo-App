import bcrypt from 'bcrypt'
const saltRound = process.env.SALT_ROUND || 10;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRound);
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);    
}