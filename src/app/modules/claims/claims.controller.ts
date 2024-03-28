import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync ";
import { sendRes } from "../../../shared/sendRes";
import { NextFunction, Request, Response } from "express";
import { claimServices } from "./claims.services";

const createClaim = async (req: Request, res: Response, next: NextFunction) => {

    const result = await claimServices.createClaim(req.user.id,req.body);
  
    sendRes(res, {
      statusCode: httpStatus.CREATED,
      message: "Claim created successfully",
      data:result,
      error: null,
      success: true,
      meta:null,
    });
};



export const claimController = {
    createClaim: catchAsync(createClaim),
  };
  