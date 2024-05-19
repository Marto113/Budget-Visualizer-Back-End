import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/refresh-token', AuthController.refreshToken);

export default authRouter;