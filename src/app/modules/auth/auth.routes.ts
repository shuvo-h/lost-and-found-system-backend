import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { userValidationSchema } from '../user/user.validation';
// import { authValidators } from './auth.validator';
// import { auth } from '../../middleware/auth';
// import { UserRole } from '@prisma/client';


export const authRouter = express.Router();


authRouter.post("/register",validateRequest(userValidationSchema.createUser),authController.createUser)
authRouter.post("/login",validateRequest(userValidationSchema.loginUser),authController.loginUser)