import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { sendRes } from "../../shared/sendRes";
import { z } from "zod";
import jwt from "jsonwebtoken";


const getJWTErrorMessage = (err: jwt.JsonWebTokenError): string => {
    switch (err.name) {
        case 'TokenExpiredError':
            return 'Token has expired';
        case 'JsonWebTokenError':
            return 'Invalid token';
        case 'NotBeforeError':
            return 'Token not yet valid';
        case 'SyntaxError':
            return 'Malformed token';
        default:
            return 'Invalid token';
    }
};

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    let errorDetails = err.errorDetails || null;
    
    let message = err.message || "Something happen wrong";
    if (err instanceof z.ZodError) {
        
        errorDetails = {
            issues: err.errors.map((err:any) => ({
                field:  err.path.join('.')?.replace('body.', ''),
                message: err.message
            }))
        }
        message = errorDetails.issues.map(({message}:{message:string})=>message).join(", ")
    }else if (err instanceof jwt.JsonWebTokenError) {
        errorDetails = {
            issues: [{
                field: 'token',
                message: getJWTErrorMessage(err)
            }]
        };
    }
    
    
    sendRes(res,{
        statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message,
        data: null,
        error:errorDetails,
    })
}