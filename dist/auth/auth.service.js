"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
class AuthService {
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { username } });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }
            const accessToken = AuthService.generateAccessToken(user.id);
            const refreshToken = AuthService.generateRefreshToken(user.id);
            return { userId: user.id, accessToken, refreshToken };
        });
    }
    static refreshToken(refreshToken) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
            const userId = decodedToken.userId;
            const accessToken = AuthService.generateAccessToken(userId);
            return Promise.resolve(accessToken);
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
    static generateAccessToken(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        return accessToken;
    }
    static generateRefreshToken(userId) {
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
        return refreshToken;
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return hashedPassword;
        });
    }
}
exports.default = AuthService;
