import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken =(payloadBody:any,secretKey:Secret,expiresIn:string) =>{
    return jwt.sign(payloadBody,secretKey,{
        algorithm:"HS256",
        expiresIn: expiresIn || '15m',
    })
}
const verifyToken =(token:string,secretKey:Secret,) =>{
    return jwt.verify(token,secretKey) as JwtPayload;
}

export const jwtHelpers = {
    generateToken,
    verifyToken,
}