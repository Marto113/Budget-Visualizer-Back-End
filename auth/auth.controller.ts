import { Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const tokens = await AuthService.login(username, password);
      res.status(200).json(tokens);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const newTokens = await AuthService.refreshToken(refreshToken);
      res.status(200).json(newTokens);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AuthController;