import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { v1ModuleRouter } from "./app/routes/v1_routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import cookieParser from 'cookie-parser';
import "./config/config"
import { notFoundHandler } from "./app/middleware/notFoundHandler ";

export const app: Application = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



// app.use("/api/v1/user",userRouter)
// app.use("/api/v1/admin",adminRouter)
app.use('/api',v1ModuleRouter)

app.get("/",(req:Request,res:Response)=>{
    res.json({
        Okay: "Ok"
    })
})


app.use(notFoundHandler)
app.use(globalErrorHandler)