import httpStatus from "http-status";
import { sendRes } from "../../../shared/sendRes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync ";
import { foundItemCtgServices } from "./foundItemCtg.services";

const createFoundItemCtg = async (req: Request, res: Response, next: NextFunction) => {
    const result = await foundItemCtgServices.createFoundItemCtg(req.body);
  
    sendRes(res, {
      statusCode: httpStatus.CREATED,
      message: "Found Item Category created successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
};



export const foundItemCtgController = {
    createFoundItemCtg: catchAsync(createFoundItemCtg),
  };
  