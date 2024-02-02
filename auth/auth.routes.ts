import { Router } from 'express';
import AuthController from './auth.controller';
import AuthService from './auth.service';
const authRouter = Router();

authRouter.post('/auth/login', async (req, res) => {
  try {
    const { userId, accessToken, refreshToken } = await AuthService.login(req.body.username, req.body.password);

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({ userId, accessToken, refreshToken });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

authRouter.post('/auth/refresh-token', AuthController.refreshToken);

export default authRouter;