import express, { Application } from "express";
import rateLimit, { RateLimit } from "express-rate-limit";
import commonMiddlewares from "./middlewares/commons";
import { errorLogger, errorHandler } from "./middlewares/errorHandlers";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";

export class AuthServer {
    protected express: Application;
    protected apiRateLimiter!: RateLimit;

    constructor() {
        this.express = express();
        this.setEnviroment();
        this.setMiddlewares();
        this.setRoutes();
        this.catchErrors();
    }
    private setEnviroment(): void {
        console.log("Setting enviroment...");
        /* Load .env file and fetched on process.env */
        dotenv.config();
        /* Set port on express config */
        this.express.set("PORT", Number(process.env.AUTH_SERVER_PORT) || 3001);
        /*  API limiter */
        this.apiRateLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100,
        });
    }
    private setRoutes(): void {
        console.log("Setting routes...");
        this.express.use(authRoutes);
    }
    private setMiddlewares(): void {
        console.log("Loading middlewares...");
        this.express.use(commonMiddlewares);
    }
    private catchErrors(): void {
        this.express.use(errorLogger);
        this.express.use(errorHandler);
    }
    public listen(): void {
        const PORT = this.express.get("PORT");
        this.express.listen(PORT);
        console.log(`Auth server running on port ${PORT}`);
    }
}
