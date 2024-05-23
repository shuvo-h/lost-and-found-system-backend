import { prisma } from "../../../shared/prisma";

const getProfile = async (userId:string) => {
    const result = await prisma.userProfile.findUniqueOrThrow({
      where:{
        userId
      },
      include:{
        user: {
            select:{
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        }
      }
    });

    //  return my count of lost item, found item and claims
    const [lost,found,claim] = await Promise.all([
      prisma.lostItem.count({
        where:{
          userId
        }
      }),
      prisma.foundItem.count({
        where:{
          userId
        }
      }),
      prisma.claim.count({
        where:{
          userId
        }
      }),
    ])


    return {
      ...result,
      count: {lost,found,claim}
    };
  };
  
const updateProfile = async (userId:string,payload: { bio?: string; age?:number }) => {
  
    const result = await prisma.userProfile.update({
      where:{
        userId
      },
      data: payload,
      include:{
        user:{
          select:{
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
    return result;
  };
  
  export const profileServices = {
    getProfile,
    updateProfile,
  };
  