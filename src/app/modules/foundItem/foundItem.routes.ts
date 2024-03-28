import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { foundItemValidationSchema } from './foundItem.validation';
import { foundItemController } from './foundItem.controller';


export const foundItemRouter = express.Router();


foundItemRouter.post("/found-items",auth(),validateRequest(foundItemValidationSchema.createFoundItem),foundItemController.createFoundItem)



