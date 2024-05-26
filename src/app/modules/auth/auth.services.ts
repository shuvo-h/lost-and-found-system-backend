import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { env } from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TUserPayload } from "../user/interface.user";
import { CLAIM_STATUS, USER_STATUS } from "@prisma/client";

const createUser = async (payload: TUserPayload) => {
  // if email already exist, through error
  const isExistuser = await prisma.user.findFirst({
    where:{
      OR:[
        {email:payload.email},
        {username:payload.username},
      ]
      // email: payload.email
    }
  })
  if (isExistuser?.email === payload.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Email already exist",
      null,
      "email"
    );
  }
  if (isExistuser?.username === payload.username) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Username already exist",
      null,
      "username"
    );
  }
  const saltRound = 12;
  const hashedPassword: string = await bcrypt.hash(payload.password, saltRound);
  const userData = {
    email: payload.email,
    username: payload.username,
    name: payload.name,
    password: hashedPassword,
  };

  // user transcetion and rollback
  const result = await prisma.$transaction(async (transectionClient) => {
    const createdUserData = await transectionClient.user.create({
      data: userData,
    });
    const profileData = {
      ...payload.profile,
      userId: createdUserData.id,
    };
    const createdProfileData = await transectionClient.userProfile.create({
      data: profileData,
    });
    return {...createdUserData,profile:createdProfileData};
  });
  const {password,...rest} = result;
  return rest;
};

const loginUser = async (payload: { email_or_username: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      OR:[
        {
          email: payload.email_or_username,
        },
        {
          username: payload.email_or_username,
        },
      ]
    },
  });

  
  
  if (user.status !== USER_STATUS.ACTIVE) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Account is deactive",
      null,
      "common"
    );
  }

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isCorrectPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Password incorrect",
      null,
      "password"
    );
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    env.JWT_SECRET as string,
    env.EXPIRES_IN as string
  );
  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    env.REFRESH_TOKEN_SECRET as string,
    env.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    data: jwtPayload,
  };
};

const passwordChange = async (userId:string,payload: { new_password: string; old_password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.old_password,
    user.password
  );
  if (!isCorrectPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Password incorrect",
      null,
      "password"
    );
  }
  const saltRound = 12;
  const hashedPassword: string = await bcrypt.hash(payload.new_password, saltRound);

  await prisma.user.update({
    where:{
      id: userId
    },
    data: {
      password: hashedPassword
    }
  })

  return {};
};

type TUpdatePayload = {
  email: string;
  username: string;
  name: string;
  profile:  {
    bio: string;
    age: number;
  };
}

const updateUser = async (userId:string,payload: Partial<TUpdatePayload>) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId
    },
  });

  if (payload.email) {
    const isExist = await prisma.user.findFirst({
      where:{
          email:payload.email,
          NOT:{
            id: userId
          }
      }
   })
   if (isExist) {
    throw new ApiError(httpStatus.CONFLICT,"Email already exist")
   }
  }
  if (payload.username) {
    const isExist = await prisma.user.findFirst({
      where:{
        username:payload.username,
        NOT:{
          id: userId
        }
      }
   })
   if (isExist) {
    throw new ApiError(httpStatus.CONFLICT,"Username already exist")
   }
  }

  const result = prisma.$transaction(async(tx)=>{
    const userR = await tx.user.update({
      where:{
        id: userId
      },
      data: {
        name: payload.name,
        email: payload.email,
        username: payload.username,
      }
    })

    const userP = await tx.userProfile.update({
      where:{userId: userId},
      data: {
        bio: payload.profile?.bio,
        age: payload.profile?.age,
      }
    })

    return {
      email: userR.email,
      username: userR.username,
      name: userR.name,
      profile:{
          bio:userP.bio,
          age: userP.age
      }
  }

  })


  return {};
};

const getMetrics = async () => {
  // user metrics 
  const userCount = await prisma.user.count()
  const userActiveCount = await prisma.user.count({where:{status: USER_STATUS.ACTIVE}});
  const userDeactiveCount = await prisma.user.count({where:{status: USER_STATUS.DEACTIVE}});
  
  // found items metrics
  const totalFound = await prisma.foundItem.count();
  const totalFoundByCatagory = await prisma.foundItem.groupBy({
    by:['categoryId'],
    _count: {id: true},
    // name:{category:true}
  });

  const categoriesWithCounts = await Promise.all(totalFoundByCatagory.map(async item => {
    const category = await prisma.foundItemCategory.findUnique({
      where: {
        id: item.categoryId,
      },
    });
    return {
      categoryId: item.categoryId,
      name: category ? category.name : null,
      count: item._count.id,
    };
  }));
  
  

  
  const lastSevenDaysFoundItemsCount = await prisma.foundItem.count({
    where:{
      createdAt: {
        gte: new Date(Date.now() - 7*24*60*60*1000)
      }
    },
    
  })
  const foundItemsByStatus = {
    pending: await prisma.foundItem.count({ where: { status: CLAIM_STATUS.PENDING } }),
    approved: await prisma.foundItem.count({ where: { status: CLAIM_STATUS.APPROVED } }),
    rejected: await prisma.foundItem.count({ where: { status: CLAIM_STATUS.REJECTED } }),
  };

  // lost items metrics
  const totalLost = await prisma.lostItem.count();
  const totalLostByCatagory = await prisma.lostItem.groupBy({
    by:['categoryId'],
    _count: {id: true}
  });
  const totalLostByCategoryName = await Promise.all(totalLostByCatagory.map(async item=>{
    const category = await prisma.foundItemCategory.findUnique({
      where:{id:item.categoryId}
    })
    return {
      categoryId: item.categoryId,
      name: category? category.name : "",
      count: item._count.id,
    }
  }))
  const lastSevenDaysLostItemsCount = await prisma.lostItem.count({
    where:{
      createdAt: {
        gte: new Date(Date.now() - 7*24*60*60*1000)
      }
    }
  })
  const lostItemsByStatus = {
    pending: await prisma.lostItem.count({ where: { status: CLAIM_STATUS.PENDING } }),
    approved: await prisma.lostItem.count({ where: { status: CLAIM_STATUS.APPROVED } }),
    rejected: await prisma.lostItem.count({ where: { status: CLAIM_STATUS.REJECTED } }),
  };

  // claim items metrics
  const totalClaim = await prisma.claim.count();
 
  const lastSevenDaysClaimItemsCount = await prisma.claim.count({
    where:{
      createdAt: {
        gte: new Date(Date.now() - 7*24*60*60*1000)
      }
    }
  })
  const claimsByStatus = {
    pending: await prisma.claim.count({ where: { status: CLAIM_STATUS.PENDING } }),
    approved: await prisma.claim.count({ where: { status: CLAIM_STATUS.APPROVED } }),
    rejected: await prisma.claim.count({ where: { status: CLAIM_STATUS.REJECTED } }),
  };
  

  return {
    user:{
      count: userCount,
      totalActive: userActiveCount,
      totalDeactive: userDeactiveCount,
    },
    found:{
      total: totalFound,
      byCategory: categoriesWithCounts,
      last7Day: lastSevenDaysFoundItemsCount,
      status: foundItemsByStatus
    },
    lost:{
      total: totalLost,
      byCategory: totalLostByCategoryName,
      last7Day: lastSevenDaysLostItemsCount,
      status: lostItemsByStatus
    },
    claim:{
      total: totalClaim,
      last7Day: lastSevenDaysClaimItemsCount,
      status: claimsByStatus
    },

  };
};


export const authServices = {
  createUser,
  loginUser,
  passwordChange,
  updateUser,
  getMetrics,
};
