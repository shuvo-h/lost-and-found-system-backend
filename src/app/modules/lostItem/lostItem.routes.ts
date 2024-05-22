import express, { NextFunction, Request, Response } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { auth } from '../../middleware/auth';
import { lostItemValidationSchema } from './lostItem.validation';
import {  lostItemController } from './lostItem.controller';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';


export const lostItemRouter = express.Router();


lostItemRouter.get("/lost-items",lostItemController.getLostItems)
lostItemRouter.post("/lost-items",
auth(),
FileUploadHelper.upload.single('file'),
// validateRequest(lostItemValidationSchema.createLostItem),
(req: Request, res: Response, next: NextFunction) => {
    req.body = lostItemValidationSchema.createLostItem.parse(JSON.parse(req.body.data))
    return lostItemController.createLostItem(req, res, next)
  }
// lostItemController.createLostItem
)



