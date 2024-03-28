import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TClaimPayload } from "./claims.interface";


const createClaim = async (userId:string,payload: TClaimPayload) => {
    // check category is valid and exist
    const foundItem = await prisma.foundItem.findFirst({
        where:{
            id: payload.foundItemId
        }
    })
    if (!foundItem) {
        throw new ApiError(httpStatus.FORBIDDEN,"Invalid found item id","","foundItemId")
    }
    
    // already claim on this item
    const existClaim = await prisma.foundItem.findFirst({
        where:{
            id: payload.foundItemId,
            userId,
        }
    })
    if (existClaim) {
        throw new ApiError(httpStatus.FORBIDDEN,"You have already claimed for this item","","foundItemId")
    }


    const result = await prisma.claim.create({
      data: {...payload,userId,},
    });
    return result;
  };
  
    
export const claimServices = {
    createClaim,
};
