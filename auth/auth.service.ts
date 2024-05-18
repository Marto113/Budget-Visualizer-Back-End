import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class AuthService {
    static async register(username: string, password: string): Promise<any> {
        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (existingUser) {
            throw new Error("Username already exists");
        }

        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }

        if (!/\d/.test(password)) {
            throw new Error("Password must contain at least one number");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            },
        });

        const accessToken = AuthService.generateAccessToken(newUser.id);
        const refreshToken = AuthService.generateRefreshToken(newUser.id);
        
        return { accessToken, refreshToken };
    }

    static async login(username: string, password: string): Promise<any> {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        const accessToken = AuthService.generateAccessToken(user.id);
        const refreshToken = AuthService.generateRefreshToken(user.id);

        return { userId: user.id, accessToken, refreshToken };
    }

    static refreshToken(refreshToken: string): Promise<any> {
        try {
            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as { userId: number };

            const userId = decodedToken.userId;

            const accessToken = AuthService.generateAccessToken(userId);

            return Promise.resolve({
                refreshToken: refreshToken,
                accessToken: accessToken
            });
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    private static generateAccessToken(userId: number): string {
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
        return accessToken;
    }

    private static generateRefreshToken(userId: number): string {
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
        return refreshToken;
    }

    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}

export default AuthService;