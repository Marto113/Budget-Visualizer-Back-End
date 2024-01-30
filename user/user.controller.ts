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
}

export default UserController;