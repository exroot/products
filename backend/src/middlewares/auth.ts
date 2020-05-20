import { Request, Response, NextFunction } from "express";
import { client } from "../config/redisConnection";
import jwt from "jsonwebtoken";
import { Boom } from "../utils/HTTP";

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`is authenticated middleware triggered`);
    const accessToken: any = req.cookies.Authorization;
    try {
        if (!accessToken) {
            throw Boom.unauthorized("Not token available");
        }
        jwt.verify(
            accessToken,
            process.env.AUTH_SECRET_KEY as string,
            (err, user) => {
                if (err) {
                    throw Boom.unauthorized("Invalid access token.");
                }
                if (inBlackList(accessToken, user.username)) {
                    return res.status(401).json({
                        message: "go back",
                    });
                }
                req.user = user;
                next();
            }
        );
    } catch (err) {
        next(err);
    }
};

const inBlackList = (accessToken: string, username: string): boolean | void => {
    try {
        if (!client.exists(username)) {
            return false;
        }
        client.get(username, (err, token) => {
            if (err) {
                return false;
            }
            if (accessToken === token) {
                return true;
            }
        });
    } catch (err) {
        throw new Error(err);
    }
};
