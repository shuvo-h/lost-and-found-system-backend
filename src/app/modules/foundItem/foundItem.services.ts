import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TFoundItemPayload } from "./foundItem.interface";

const createFoundItem = async (userId:string,payload: TFoundItemPayload) => {
    // check category is valid and exist
    const foundItemCtg = await prisma.foundItemCategory.findFirst({
        where:{
            id: payload.categoryId
        }
    })
    if (!foundItemCtg) {
        throw new ApiError(httpStatus.FORBIDDEN,"Invalid category id","","categoryId")
    }

    const result = await prisma.foundItem.create({
      data: {...payload,userId},
      include:{
        user:{
            select:{
                id: true,
                name: true,
                email: true,
                createdAt:true,
                updatedAt: true
            }
        },
        category: true
      }
    });
    return result;
  };
  
  export const foundItemServices = {
    createFoundItem,
  };
  