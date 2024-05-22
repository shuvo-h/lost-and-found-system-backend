import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync ";
import { sendRes } from "../../../shared/sendRes";
import {  TLostItemQuery } from "./lostItem.interface";
import { foundItemServices } from "./lostItem.services";
import { IUploadFile } from "../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/fileUploadHelper";

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
  console.log(req.body);
  
  const result = await foundItemServices.createLostItem(req.user.id, req.body);

  sendRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Found Item reported successfully",
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
  const { data, meta } = await foundItemServices.getLostItems(
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

export const lostItemController = {
  createLostItem: catchAsync(createLostItem),
  getLostItems: catchAsync(getLostItems),
};
