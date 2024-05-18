import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter = Router();

authRouter.post('/auth/login', AuthController.login);
authRouter.post('/auth/register', AuthController.register);
authRouter.post('/auth/refresh-token', AuthController.refreshToken);

export default authRouter;