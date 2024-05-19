import { Router } from 'express';
import UserController from './user.controller';

const userRouter = Router();

userRouter.get('/balance', UserController.getUserBalance);
userRouter.post('/balance', UserController.setUserBalance);
userRouter.put('/balance', UserController.updateUserBalance);

export default userRouter;