import express from 'express';

import { authRouter } from '../modules/auth/auth.routes';
import { foundItemCategoryRouter } from '../modules/foundItemCategory/foundItemCtg.routes';
import { foundItemRouter } from '../modules/foundItem/foundItem.routes';
import { claimRouter } from '../modules/claims/claims.routes';
import { profileRouter } from '../modules/profile/profile.router';
import { lostItemRouter } from '../modules/lostItem/lostItem.routes';
import { userRouter } from '../modules/user/user.routes';

export const v1ModuleRouter = express.Router();

const moduleRoutes = [
    {
        path:"/",
        route: authRouter
    },
    {
        path:"/",
        route: foundItemCategoryRouter
    },
    {
        path:"/",
        route: foundItemRouter
    },
    {
        path:"/",
        route: claimRouter
    },
    {
        path:"/",
        route: lostItemRouter
    },
    {
        path:"/",
        route: profileRouter
    },
    {
        path:"/",
        route: userRouter
    },
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})