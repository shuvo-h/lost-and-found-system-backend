import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (validatorSchema:AnyZodObject) =>{
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {
            await validatorSchema.parseAsync({body:req.body});
            next();
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
}