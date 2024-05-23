import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TFoundItemPayload, TFoundItemQuery } from "./foundItem.interface";
import { pick } from "../../../shared/pick";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";

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
const updateFoundItemById = async (userId:string,foundItemId:string,payload: TFoundItemPayload) => {
    // check category is valid and exist
     await prisma.foundItem.findFirstOrThrow({
        where:{
            id: foundItemId,
            userId: userId
        }
    })
    

    const result = await prisma.foundItem.update({
      where:{
        id: foundItemId,
        userId: userId
      },
      data:{...payload}
    });
    return result;
  };
  

  

const getFoundItems = async (query:TFoundItemQuery) => {
  const foundItemSearchableFields = ['foundItemName','location','description'];
   const foundItemsFilterableFields:(keyof TFoundItemQuery)[] = ['searchTerm','foundItemName','userId'];
    const filters = pick(query,foundItemsFilterableFields)
    // replace foundDate property by createdAt
    if (query.sortBy === "foundDate") {
      query.sortBy = "createdAt"
    }else if(query.sortBy === "category"){
      query.sortOrder = {name: query.sortOrder} as unknown as any;
    }
    const options = pick(query, ["page", "limit", "sortBy", "sortOrder"]);
    const {searchTerm,...filterData} = filters;
    const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

    const andCondition:Prisma.FoundItemWhereInput[] = [];
    if (searchTerm) {
      andCondition.push({
        OR: foundItemSearchableFields.map((field)=>({
          [field]:{
            contains: searchTerm,
            mode:"insensitive"
          }
        }))
      })
    }
    if (Object.keys(filterData).length) {
      andCondition.push({
        AND: Object.keys(filterData).map((key) => ({
          [key]: {
            equals: (filterData as any)[key],
            mode: "insensitive",
          },
        })),
      });
    }
    const whereCondition: Prisma.FoundItemWhereInput = { AND: andCondition };
    const result = await prisma.foundItem.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
        // category:{name:"asc"}
      },
      include:{
        category: true,
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



    const total = await prisma.foundItem.count({
      where: whereCondition,
    });
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };

  };
  

  const deleteFoundItemById = async (userId:string,found_id: string) => {
    // check category is valid and exist
    const foundItemCtg = await prisma.foundItem.findFirstOrThrow({
        where:{
            id: found_id,
            userId: userId,
        }
    })

    const result = await prisma.foundItem.delete({
      where:{
        id: found_id,
        userId: userId
      }
    })
    
    return result;
  };

  export const foundItemServices = {
    createFoundItem,
    getFoundItems,
    deleteFoundItemById,
    updateFoundItemById,
  };
  