import { Request } from "express";

const createUser  = async(req:Request) =>{
    /*
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
    }

    const saltRound = 12;
    const hashedPassword: string =  await bcrypt.hash(req.body.password,saltRound)
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    
    // user transcetion and rollback
    const result = await prisma.$transaction(async(transectionClient)=>{
        const createdUserData = await transectionClient.user.create({
            data: userData,
        })
        const createdAdminData = await transectionClient.admin.create({
            data: req.body.admin
        })
        return createdAdminData;
    })
    */
   const result = {ad:"ASd"}
    return result;
}
const loginUser  = async(payload:{email:string,password:string}) =>{
   const result = {ad:"ASd",...payload}
    return result;
}


export const userServices = {
    createUser,
    loginUser,
}