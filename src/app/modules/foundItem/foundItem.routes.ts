import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { foundItemCtgValidationSchema } from './foundItemCtg.validation';
import { foundItemCtgController } from './foundItemCtg.controller';


export const foundItemRouter = express.Router();


foundItemRouter.post("/found-items",auth(),validateRequest(foundItemCtgValidationSchema.createFoundIteCtg),foundItemCtgController.createFoundItemCtg)



