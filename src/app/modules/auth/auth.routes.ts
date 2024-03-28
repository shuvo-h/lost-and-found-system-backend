import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { userValidationSchema } from '../user/user.validation';


export const authRouter = express.Router();


authRouter.post("/register",validateRequest(userValidationSchema.createUser),authController.createUser)
authRouter.post("/login",validateRequest(userValidationSchema.loginUser),authController.loginUser)