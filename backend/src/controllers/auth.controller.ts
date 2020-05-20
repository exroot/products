import { Request, Response, NextFunction } from "express";
import { login, logout } from "../services/auth.service";

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { username, password } = req.body;
    try {
        const accessToken: string = await login(username, password);
        return res
            .cookie("Authorization", accessToken, {
                httpOnly: false,
                sameSite: true,
                maxAge: 3600000,
            })
            .status(200)
            .json({
                accessToken,
            });
    } catch (err) {
        next(err);
    }
};

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const token = req.cookies.Authorization;
        console.log(token);
        const response = await logout(token);
        return res
            .cookie("Authorization", "", {
                expires: new Date(),
            })
            .status(204);
    } catch (err) {
        next(err);
    }
};
