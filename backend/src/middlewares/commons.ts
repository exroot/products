import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { urlencoded, json, Response, Request, NextFunction } from "express";

const headers = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
};

export default [
    morgan("dev"),
    cors(),
    urlencoded({ extended: false }),
    json(),
    compression(),
    headers,
];
