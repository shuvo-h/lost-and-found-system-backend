import express from 'express';

import { authRouter } from '../modules/auth/auth.routes';
import { foundItemCategoryRouter } from '../modules/foundItemCategory/foundItemCtg.routes';
import { foundItemRouter } from '../modules/foundItem/foundItem.routes';
import { claimRouter } from '../modules/claims/claims.routes';

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
];

moduleRoutes.forEach(routeEl=>{
    v1ModuleRouter.use(routeEl.path,routeEl.route)
})