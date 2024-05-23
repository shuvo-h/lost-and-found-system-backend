import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createFoundItemCtg = async (payload: { name: string; }) => {
  
  const isExistCategory = await prisma.foundItemCategory.findUnique({
    where:{
      name: payload.name
    }
  })
  if (isExistCategory) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Category already exist",
      null,
      "name"
    );
  }

    const result = await prisma.foundItemCategory.create({
      data: payload,
    });
    return result;
  };
  
const getFoundItemCtg = async () => {
  


    const result = await prisma.foundItemCategory.findMany();
    return result;
  };
  
  export const foundItemCtgServices = {
    createFoundItemCtg,
    getFoundItemCtg,
  };
  