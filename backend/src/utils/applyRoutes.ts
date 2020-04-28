import { Router } from "express";

export const applyRoutes = (routes: Router[], router: Router) => {
    for (const route of routes) {
        router.use(route);
    }
};
