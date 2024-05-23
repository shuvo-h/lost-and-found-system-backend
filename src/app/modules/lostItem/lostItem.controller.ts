import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync ";
import { sendRes } from "../../../shared/sendRes";
import {  TLostItemQuery } from "./lostItem.interface";
import { IUploadFile } from "../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";
import { lostItemServices } from "./lostItem.services";

const createLostItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // construct body with uploaded image, and then call serveive
  const file = req.file as IUploadFile;
  if (file) {
    const uploadIcon = await FileUploadHelper.uploadToCloudinary(file);
    req.body.img = uploadIcon?.secure_url;
  }
  
  const result = await lostItemServices.createLostItem(req.user.id, req.body);

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Found Item reported successfully",
    data: result,
    error: null,
    success: true,
    meta: null,
  });
};
const updateLostItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // construct body with uploaded image, and then call serveive
  const file = req.file as IUploadFile;
  if (file) {
    const uploadIcon = await FileUploadHelper.uploadToCloudinary(file);
    req.body.img = uploadIcon?.secure_url;
  }
  
  const lostItemId = req.params.lost_item_id;
  const result = await lostItemServices.updateLostItem(req.user.id, lostItemId,req.body);

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Found Item updated successfully",
    data: result,
    error: null,
    success: true,
    meta: null,
  });
};

const getLostItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data, meta } = await lostItemServices.getLostItems(
    req.query as unknown as TLostItemQuery
  );

  sendRes(res, {
    statusCode: httpStatus.OK,
    message: "Found Items retrived successfully",
    data,
    error: null,
    success: true,
    meta,
  });
};



const deleteLostItem = async (req: Request, res: Response, next: NextFunction) => {
  const lost_item_id = req.params.lost_item_id;
  const result = await lostItemServices.deleteLostItem(req.user.id,lost_item_id);

  sendRes(res, {
    statusCode: httpStatus.OK,
    message: "Lost Item deleted successfully",
    data:result,
    error: null,
    success: true,
    meta:null,
  });
};



export const lostItemController = {
  createLostItem: catchAsync(createLostItem),
  getLostItems: catchAsync(getLostItems),
  updateLostItem: catchAsync(updateLostItem),
  deleteLostItem: catchAsync(deleteLostItem),
};
