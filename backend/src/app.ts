import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit, { RateLimit } from "express-rate-limit";
import commonMiddlewares from "./middlewares/commons";
import routes from "./routes";
import { applyRoutes } from "./utils/applyRoutes";
import { errorLogger, errorHandler } from "./middlewares/errorHandlers";
import { createConnection, Connection } from "typeorm";
import { dbConfig } from "./config/database";
import dotenv from "dotenv";

export class App {
    protected express: Application;
    protected apiRateLimiter!: RateLimit;

    constructor() {
        console.log("Starting server...");
        this.express = express();
        this.setEnviroment();
        this.setDatabase();
        this.setMiddlewares();
        this.setRoutes();
        this.catchErrors();
    }
    private setEnviroment(): void {
        console.log("Setting enviroment...");
        /* Load .env file and fetched on process.env */
        dotenv.config();
        /* Set port on express config */
        this.express.set("PORT", Number(process.env.PORT) || 3000);
        /*  API limiter */
        this.apiRateLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100,
        });
    }
    private async setDatabase(): Promise<void> {
        try {
            await createConnection(dbConfig);
        } catch (err) {}
    }
    private setRoutes(): void {
        console.log("Setting routes...");
        applyRoutes(routes, this.express);
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
        console.log(`Server running on port ${PORT}`);
    }
}
