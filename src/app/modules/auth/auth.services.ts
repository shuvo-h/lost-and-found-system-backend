import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { env } from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TUserPayload } from "../user/interface.user";

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

export const authServices = {
  createUser,
  loginUser,
};
