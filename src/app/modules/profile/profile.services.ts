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
    return result;
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
  