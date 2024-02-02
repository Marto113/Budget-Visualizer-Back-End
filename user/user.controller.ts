import { Request, Response } from "express";
import UserService from './user.service';

class UserController {
    static async register(req: Request, res: Response) {
        const { username, password } = req.body;
        
        try {
            const response = await UserService.register(username, password);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async getUserBalance(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const response = await UserService.getUserBalance(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async setUserBalance(req: Request, res: Response) {
        const { id, savings, income, budget } = req.body;

        try {
            const response = await UserService.setUserBalance(id, savings, income, budget);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}

export default UserController;