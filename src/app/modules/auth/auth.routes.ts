import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { userValidationSchema } from '../user/user.validation';
import { auth } from '../../middleware/auth';


export const authRouter = express.Router();


authRouter.post("/register",validateRequest(userValidationSchema.createUser),authController.createUser)
authRouter.post("/login",validateRequest(userValidationSchema.loginUser),authController.loginUser)
authRouter.patch("/password",auth(),validateRequest(userValidationSchema.passwordChange),authController.passwordChange)
authRouter.patch("/update-user",auth(),validateRequest(userValidationSchema.updateUser),authController.updateUser)
authRouter.get("/metrics",auth(),authController.getMetrics)