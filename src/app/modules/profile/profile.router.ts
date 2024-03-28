import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { profileController } from './profile.controller';
import { profileValidationSchema } from './profile.validation';


export const profileRouter = express.Router();


profileRouter.get("/my-profile",auth(),profileController.getProfile)
profileRouter.put("/my-profile",auth(),validateRequest(profileValidationSchema.updateProfile),profileController.updateProfile)



