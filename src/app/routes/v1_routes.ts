import express from 'express';

import { authRouter } from '../modules/auth/auth.routes';

export const v1ModuleRouter = express.Router();

const moduleRoutes = [
    {
        path:"/",
        route: authRouter
    },
    // {
    //     path:"/user",
    //     route: userRouter
    // },
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})