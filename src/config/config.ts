import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(),'.env')})
export const env = {
    isProduction: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    CLOUDINARY:{
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
   },
}