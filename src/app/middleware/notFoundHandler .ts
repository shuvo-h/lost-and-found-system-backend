import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { sendRes } from "../../shared/sendRes";

export const notFoundHandler = (req:Request,res:Response,next:NextFunction)=>{
    
    sendRes(res,{
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "API doesn't exist",
        data:null,
        error:{
            path: req.originalUrl
        }
    })
}