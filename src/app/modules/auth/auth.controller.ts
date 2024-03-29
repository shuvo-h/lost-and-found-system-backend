import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync ";
import { sendRes } from "../../../shared/sendRes";
import { authServices } from "./auth.services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = await authServices.createUser(req.body);

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: result,
    error: null,
    success: true,
    meta: null,
  });
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const {accessToken,refreshToken,data} = await authServices.loginUser(req.body);
  res.cookie("accessToken", accessToken, {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true,
  });
  sendRes(res, {
    statusCode: httpStatus.OK,
    message: "User login successfully",
    data: {
        token:accessToken,
        ...data
    },
    error: null,
    success: true,
    meta: null,
  });
};

export const authController = {
  createUser: catchAsync(createUser),
  loginUser: catchAsync(loginUser),
};
