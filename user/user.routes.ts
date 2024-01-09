import { Router } from 'express';
import UserController from './user.controller';

const ruserRouter = Router();

ruserRouter.post('/user/register', UserController.register);
// ruserRouter.get('/user/{id}', UserController.getUserById);
// ruserRouter.patch('/user/update-user', UserController.updateUser);
// ruserRouter.delete('/user/delete/{id}', UserController.deleteUser);

export default ruserRouter;