import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../shared/pick";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TLostItem, TLostItemQuery } from "./lostItem.interface";

const createLostItem = async (userId: string, payload: TLostItem) => {
  
  // check category is valid and exist
  const foundItemCtg = await prisma.foundItemCategory.findFirst({
    where: {
      id: payload.categoryId,
    },
  });
  if (!foundItemCtg) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Invalid category id",
      "",
      "categoryId"
    );
  }
  
  
  const result = await prisma.lostItem.create({
    data: { 
       userId, 
       ...payload
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
  });
  return result;
};

const updateLostItem = async (userId: string, itemId:string,payload: TLostItem) => {
  
  // check category is valid and exist
  await prisma.lostItem.findFirstOrThrow({
    where: {
      id: itemId,
      userId: userId
    },
  });
  
  const result = await prisma.lostItem.update({
    where: { 
       id: itemId,
       userId: userId
    },
    data: payload
  });
  return result;
};

const getLostItems = async (query: TLostItemQuery) => {
  const foundItemSearchableFields = [
    "lostItemName",
    "location",
    "description",
  ];
  const foundItemsFilterableFields: (keyof TLostItemQuery)[] = [
    "searchTerm",
    "lostItemName",
    "userId"
  ];
  const filters = pick(query, foundItemsFilterableFields);
  
  // replace foundDate property by createdAt
  if (query.sortBy === "lostDate") {
    query.sortBy = "createdAt";
  } else if (query.sortBy === "category") {
    query.sortOrder = { name: query.sortOrder } as unknown as any;
  }
  const options = pick(query, ["page", "limit", "sortBy", "sortOrder"]);
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andCondition: Prisma.LostItemWhereInput[] = [];
  if (searchTerm) {
    andCondition.push({
      OR: foundItemSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
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
  const whereCondition: Prisma.LostItemWhereInput = { AND: andCondition };
  const result = await prisma.lostItem.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
      // category:{name:"asc"}
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const total = await prisma.lostItem.count({
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



const deleteLostItem = async (userId:string,lostId: string) => {
  // check category is valid and exist
  const foundItemCtg = await prisma.lostItem.findFirstOrThrow({
      where:{
          id: lostId,
          userId: userId,
      }
  })

  const result = await prisma.lostItem.delete({
    where:{
      id: lostId,
      userId: userId
    }
  })
  
  return result;
};


export const lostItemServices = {
  createLostItem,
  getLostItems,
  updateLostItem,
  deleteLostItem,
};
