import { Router } from 'express';
import UserController from './user.controller';

const userRouter = Router();

userRouter.post('/user/register', UserController.register);
userRouter.get('/user/balance', UserController.getUserBalance);
userRouter.post('/user/balance', UserController.setUserBalance);
// ruserRouter.patch('/user/update-user', UserController.updateUser);
// ruserRouter.delete('/user/delete/{id}', UserController.deleteUser);

export default userRouter;