import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class AuthService {
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

            return Promise.resolve(accessToken);
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