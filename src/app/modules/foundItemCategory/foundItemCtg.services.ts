import { prisma } from "../../../shared/prisma";

const createFoundItemCtg = async (payload: { name: string; }) => {
    const result = await prisma.foundItemCategory.create({
      data: payload,
    });
    return result;
  };
  
  export const foundItemCtgServices = {
    createFoundItemCtg,
  };
  