import express from 'express';
import { auth } from '../../middleware/auth';
import { userController } from './user.controller';

export const userRouter = express.Router();


userRouter.get("/users",auth(),userController.getUsers)
userRouter.patch("/users/:user_id/status",auth(),userController.updateStatus)