import { Response, NextFunction, Request } from "express";
import { HTTPServerError, HTTPClientResponse } from "../utils/HTTP";

export const errorLogger = (
    err: HTTPServerError | HTTPClientResponse,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof HTTPServerError) {
        console.warn(`\n\nSERVER ERROR\n`);
        if (err.isCritical) {
            // TODO: send an email to the administrator / support
            console.warn(`PLEASE CONTACT ADMINISTRATOR\n\n`);
        }
        console.error(err);
    }
    next(err);
};

export const errorHandler = (
    err: HTTPServerError | HTTPClientResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message, statusCode } = err;
    if (err instanceof HTTPServerError) {
        return res.status(statusCode).json({
            status: statusCode,
            message,
        });
    }
    return res.status(statusCode).json({
        status: statusCode,
        message,
    });
};
