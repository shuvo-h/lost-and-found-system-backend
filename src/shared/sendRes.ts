import { Response } from "express";

export const sendRes = <T>(res:Response,jsonData:{
    statusCode:number,
    success:boolean,
    message: string,
    meta?: {
        page: number,
        limit: number,
        total: number,
    }|null,
    data: T | null | undefined
    error?: any
}) =>{
    const {statusCode,message,data,success,meta,error} = jsonData;
    res.status(statusCode).json({
        statusCode,
        success,
        message,
        meta,
        data,
        errorDetails:error,
    });
}