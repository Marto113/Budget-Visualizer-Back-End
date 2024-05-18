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

  static async register(req: Request, res: Response) {
    const { username, password } = req.body;
    
    try {
        const response = await AuthService.register(username, password);
        res.status(200).json(response);
    } catch (error: any) {
        if (error.message === "Username already exists") {
            res.status(409).json({ error: "Username already exists" });
        } else if (error.message === "Password must be at least 8 characters long" || error.message === "Password must contain at least one number") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
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