import { NextFunction, Request, Response } from "express";
import { env } from "../../config/config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { prisma } from "../../shared/prisma";
import { USER_STATUS } from "@prisma/client";

type TDecodeuser = {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
  }
// attach the user property with Request object
declare global {
    namespace Express {
      interface Request {
        user: TDecodeuser;
      }
    }
}

 export const auth = (...roles:string[]) =>{
     
     return async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED,"Token is required");
            }
            const decodeduser = jwtHelpers.verifyToken(token,env.JWT_SECRET as string) as TDecodeuser;

            // not implementing role based 
            // if (roles.length && !roles.includes(decodeduser.role)) {
            //     throw new ApiError(httpStatus.FORBIDDEN,"Must be a admin to create another admin");
            // }

            // check if this is real user
            const user = await prisma.user.findFirstOrThrow({
              where:{
                id: decodeduser.id,
              },
            })

            if (user.status !== USER_STATUS.ACTIVE) {
              throw new ApiError(
                httpStatus.FORBIDDEN,
                "Account is deactive",
                null,
                "common"
              );
            }
          
            
            req.user = decodeduser;
            next()
        } catch (error) {
            next(error)
            
        }
    }
}
