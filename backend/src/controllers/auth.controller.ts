import { Request, Response, NextFunction } from "express";
import { login, logout, generateTokens } from "../services/auth.service";

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { username, password } = req.body;
    try {
        const { refreshToken, accessToken } = await login(username, password);
        return res
            .cookie("Authorization", refreshToken, {
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

export const generateNewTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const refreshToken = req.cookies.Authorization;
        const { newRefreshToken, newAccessToken } = await generateTokens(
            refreshToken
        );
        return res
            .cookie("Authorization", newRefreshToken, {
                httpOnly: false,
                sameSite: true,
                maxAge: 3600000,
            })
            .status(200)
            .json({
                accessToken: newAccessToken,
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
        const refreshToken = req.cookies.Authorization;
        const response = await logout(refreshToken);
        return (
            res
                // .cookie("Authorization", "", {
                //     httpOnly: false,
                //     sameSite: true,
                //     maxAge: 3600000,
                // })
                .status(200)
                .json({
                    response,
                })
        );
    } catch (err) {
        next(err);
    }
};
