import httpStatus from "http-status";
import { sendRes } from "../../../shared/sendRes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync ";
import { foundItemServices } from "./foundItem.services";
import { TFoundItemQuery } from "./foundItem.interface";

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
const updateFoundItemById = async (req: Request, res: Response, next: NextFunction) => {
  const foundId = req.params.found_id;
    const result = await foundItemServices.updateFoundItemById(req.user.id,foundId,req.body);
  
    sendRes(res, {
      statusCode: httpStatus.CREATED,
      message: "Found Item updated successfully",
      data: result,
      error: null,
      success: true,
      meta: null,
    });
};
const getFoundItems = async (req: Request, res: Response, next: NextFunction) => {

    const {data,meta} = await foundItemServices.getFoundItems(req.query as unknown as TFoundItemQuery);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "Found Items retrived successfully",
      data,
      error: null,
      success: true,
      meta,
    });
};

const deleteFoundItemById = async (req: Request, res: Response, next: NextFunction) => {
    const found_id = req.params.found_id;
    const result = await foundItemServices.deleteFoundItemById(req.user.id,found_id);
  
    sendRes(res, {
      statusCode: httpStatus.OK,
      message: "Found Item deleted successfully",
      data:result,
      error: null,
      success: true,
      meta:null,
    });
};



export const foundItemController = {
    createFoundItem: catchAsync(createFoundItem),
    getFoundItems: catchAsync(getFoundItems),
    deleteFoundItemById: catchAsync(deleteFoundItemById),
    updateFoundItemById: catchAsync(updateFoundItemById),
  };
  