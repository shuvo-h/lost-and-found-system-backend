import { NextFunction, Request, Response } from "express"
import { userServices } from "../user/user.services"
import { sendRes } from "../../../shared/sendRes"
import httpStatus from "http-status"
import { catchAsync } from "../../../shared/catchAsync "

const createUser  = async(req:Request,res:Response,next:NextFunction) =>{
    const result = await userServices.createUser(req)
    sendRes(res,{
        statusCode: httpStatus.CREATED,
        message:"Admin created successfully",
        data: result,
        error: null,
        success:true,
        meta: null
    })
}
const loginUser  = async(req:Request,res:Response,next:NextFunction) =>{
    const result = await userServices.loginUser(req.body)
    sendRes(res,{
        statusCode: httpStatus.CREATED,
        message:"User login successfully",
        data: result,
        error: null,
        success:true,
        meta: null
    })
}


export const authController = {
    createUser: catchAsync(createUser),
    loginUser: catchAsync(loginUser),
} 