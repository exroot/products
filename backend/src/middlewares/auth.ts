import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Boom } from "../utils/HTTP";

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.header("Authorization")?.split(" ")[1];
    console.log(`this is ${accessToken}`);
    try {
        if (!accessToken) {
            throw Boom.unauthorized("Not access token available");
        }
        jwt.verify(
            accessToken,
            process.env.AUTH_ACCESS_SECRET_KEY as string,
            (err, user) => {
                if (err) {
                    throw Boom.unauthorized("Invalid access token");
                }
                req.user = user;
                next();
            }
        );
    } catch (err) {
        next(err);
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("Authorization")?.split(" ")[1];
    try {
        if (!accessToken) {
            throw Boom.unauthorized("Not token available");
        }
        jwt.verify(
            accessToken,
            process.env.AUTH_ACCESS_SECRET_KEY as string,
            (err, user) => {
                if (err) {
                    throw Boom.unauthorized("Invalid access token");
                }
                if (user.role !== 1) {
                    throw Boom.forbidden();
                }
                next();
            }
        );
    } catch (err) {
        next(err);
    }
};

// const inBlackList = (
//     refreshToken: string,
//     username: string
// ): boolean | void => {
//     try {
//         if (!client.exists(username)) {
//             return false;
//         }
//         client.get(username, (err, tokenBlacklisted) => {
//             if (err) {
//                 return false;
//             }
//             if (refreshToken === tokenBlacklisted) {
//                 return true;
//             }
//         });
//         return false;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// export const validRefreshToken = (refreshToken: string): boolean => {
//     jwt.verify(
//         refreshToken,
//         process.env.AUTH_SECRET_KEY as string,
//         (err, user) => {
//             if (err) {
//                 return false;
//             }
//             if (inBlackList(refreshToken, user.username)) {
//                 return false;
//             }
//         }
//     );
//     return true;
// };
