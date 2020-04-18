import { Router } from "express";

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middlewares: Wrapper[], router: Router) => {
    for (const middleware of middlewares) {
        middleware(router);
    }
};
