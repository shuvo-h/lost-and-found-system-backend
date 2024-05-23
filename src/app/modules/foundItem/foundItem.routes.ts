import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { foundItemValidationSchema } from './foundItem.validation';
import { foundItemController } from './foundItem.controller';


export const foundItemRouter = express.Router();


foundItemRouter.get("/found-items",auth(),foundItemController.getFoundItems)
foundItemRouter.delete("/found-items/:found_id",auth(),foundItemController.deleteFoundItemById)
foundItemRouter.patch("/found-items/:found_id",auth(),validateRequest(foundItemValidationSchema.updateFoundItem),foundItemController.updateFoundItemById)
foundItemRouter.post("/found-items",auth(),validateRequest(foundItemValidationSchema.createFoundItem),foundItemController.createFoundItem)



