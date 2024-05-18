import { Router } from 'express';
import UserController from './user.controller';

const userRouter = Router();

userRouter.get('/user/balance', UserController.getUserBalance);
userRouter.post('/user/balance', UserController.setUserBalance);
userRouter.put('/user/balance', UserController.updateUserBalance);

export default userRouter;