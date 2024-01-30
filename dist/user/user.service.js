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
class UserService {
    static register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    username,
                    password: hashedPassword
                },
            });
            const accessToken = UserService.generateAccessToken(user.id);
            const refreshToken = UserService.generateRefreshToken(user.id);
            return { user, accessToken, refreshToken };
        });
    }
    static generateAccessToken(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        return accessToken;
    }
    static generateRefreshToken(userId) {
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
        return refreshToken;
    }
}
exports.default = UserService;
