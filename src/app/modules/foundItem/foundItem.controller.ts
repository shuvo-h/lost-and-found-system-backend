import httpStatus from "http-status";
import { sendRes } from "../../../shared/sendRes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync ";
import { foundItemServices } from "./foundItem.services";

const createFoundItem = async (req: Request, res: Response, next: NextFunction) => {

    const result = await foundItemServices.createFoundItem(req.user.id,req.body);
  
    sendRes(res, {
      statusCode: httpStatus.CREATED,
      message: "Found Item reported successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
};



export const foundItemController = {
    createFoundItem: catchAsync(createFoundItem),
  };
  