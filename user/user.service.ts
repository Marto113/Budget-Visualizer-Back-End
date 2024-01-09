import { PrismaClient } from '@prisma/client';
import AuthService from '../auth/auth.service';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class UserService {
    static async register(username: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            },
        });

        const accessToken = UserService.generateAccessToken(user.id);
        const refreshToken = UserService.generateRefreshToken(user.id);
        
        return { user, accessToken, refreshToken };
    }

    private static generateAccessToken(userId: number): string {
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
        return accessToken;
    }

    private static generateRefreshToken(userId: number): string {
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
        return refreshToken;
    }
}

export default UserService;