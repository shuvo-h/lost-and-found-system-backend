import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { sendRes } from "../../../shared/sendRes";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync ";
import ApiError from "../../errors/ApiError";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getUsers();
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "Users retrived successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
  };

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    const {user_id} = req.params;
    if (user_id === req.user.id) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "You can't change your own status")
    }
  const result = await userServices.updateStatus(user_id,req.body.status);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
  };


  
export const userController = {
    getUsers: catchAsync(getUsers),
    updateStatus: catchAsync(updateStatus),
  };
  