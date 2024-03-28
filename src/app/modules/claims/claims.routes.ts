import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { claimController } from './claims.controller';
import { claimValidationSchema } from './claims.validation';


export const claimRouter = express.Router();


claimRouter.get("/claims",auth(),claimController.getClaims)
claimRouter.post("/claims",auth(),validateRequest(claimValidationSchema.createClaim),claimController.createClaim)