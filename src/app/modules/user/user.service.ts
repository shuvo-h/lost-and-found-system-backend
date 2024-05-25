import { USER_STATUS } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const getUsers = async () => {
    const result = await prisma.user.findMany({
      select:{
        id: true,
        name: true,
        username: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
  
    return result;
  };
const updateStatus = async (user_id:string,status:USER_STATUS) => {
  
  await prisma.user.findUniqueOrThrow({
    where:{
      id: user_id
    }
  })

  const result = await prisma.user.update({
    where:{
      id: user_id
    },
    data:{
      status
    }
  })
  
    return {status:result.status};
  };
  
  
  export const userServices = {
    getUsers,
    updateStatus,
  };
  