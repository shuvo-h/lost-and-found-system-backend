import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';
// import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';
import { env } from '../config/config';
import { ICloudinaryResponse, IUploadFile } from '../app/interfaces/file';


cloudinary.config({
    cloud_name: env.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: IUploadFile): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                fs.unlinkSync(file.path);
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};

export const FileUploadHelper = {
    uploadToCloudinary,
    upload
}