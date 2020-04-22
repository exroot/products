import { Response, NextFunction, Request } from "express";
import { HTTPServerError, HTTPClientError } from "../utils/errors";

export const errorLogger = (
    err: HTTPServerError | HTTPClientError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof HTTPServerError) {
        console.log(`\n\nSERVER ERROR\n`);
        if (err.isCritical) {
            // TODO: send an email to the administrator / support
            console.log(`PLEASE CONTACT ADMINISTRATOR\n\n`);
        }
        console.error(err);
        next(err);
    }
    next(err);
};

export const errorHandler = (
    err: HTTPServerError | HTTPClientError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message, name, statusCode } = err;
    if (err instanceof HTTPServerError) {
        return res.status(statusCode).json({
            status: statusCode,
            name,
            message,
        });
    }
    return res.status(statusCode).json({
        status: statusCode,
        message,
    });
};
