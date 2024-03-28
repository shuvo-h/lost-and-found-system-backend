import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TClaimPayload } from "./claims.interface";
import { CLAIM_STATUS } from "@prisma/client";


const createClaim = async (userId:string,payload: TClaimPayload) => {
    // check item is valid and exist
    const foundItem = await prisma.foundItem.findFirst({
        where:{
            id: payload.foundItemId
        }
    })
    if (!foundItem) {
        throw new ApiError(httpStatus.FORBIDDEN,"Invalid found item id","","foundItemId")
    }
    
    // already claim on this item
    const existClaim = await prisma.claim.findFirst({
        where:{
            foundItemId: payload.foundItemId,
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
  

const getClaims = async () => {
    const result = await prisma.claim.findMany({
        include:{
            foundItem:{
                include:{
                    user: {
                        select:{
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    category: true
                }
            }
        }
    });
    return result;
  };
  
const updateClaim = async (claimId:string,payload:{status:CLAIM_STATUS}) => {
    console.log(claimId);
    
    // check claim exist 
    const isExist = await prisma.claim.findUnique({
        where:{
            id: claimId
        }
    })
    if (!isExist) {
        throw new ApiError(httpStatus.FORBIDDEN,"Claim item didn't found","","claimId")
    }
    
    
    const result = await prisma.claim.update({
        where:{
            id: claimId
        },
        data:{
            status: payload.status
        }
    });

    return result;
    
  };
  
    
export const claimServices = {
    createClaim,
    getClaims,
    updateClaim,
};
