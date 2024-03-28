import httpStatus from "http-status";
import { sendRes } from "../../../shared/sendRes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync ";
import { profileServices } from "./profile.services";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const result = await profileServices.getProfile(req.user.id);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "Profile rettrived successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const result = await profileServices.updateProfile(req.user.id,req.body);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
};



export const profileController = {
    getProfile: catchAsync(getProfile),
    updateProfile: catchAsync(updateProfile),
  };
  