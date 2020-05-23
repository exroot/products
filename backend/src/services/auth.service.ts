import { User } from "../entity";
import { getRepository } from "typeorm";
import { Boom, HTTPClientResponse, HTTPServerError } from "../utils/HTTP";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { client } from "../config/redisConnection";

dotenv.config();

export const login = async (
    username: string,
    password: string
): Promise<void | object> => {
    try {
        const user: User | undefined = await getRepository(User).findOne({
            username,
        });
        if (!user) {
            throw Boom.notFound(`User not found`);
        }
        const hasCredentials = await compare(password, user.password);
        if (!hasCredentials) {
            throw Boom.badRequest(`Invalid credentials.`);
        }
        const { user_id, role } = user;
        const payload = {
            user_id,
            username,
            role,
        };
        const accessToken: string = jwt.sign(
            payload,
            process.env.AUTH_ACCESS_SECRET_KEY as string,
            {
                expiresIn: "30s",
            }
        );
        const refreshToken: string = jwt.sign(
            payload,
            process.env.AUTH_REFRESH_SECRET_KEY as string,
            {
                expiresIn: "10m",
            }
        );
        return { refreshToken, accessToken };
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const generateTokens = (
    refreshToken: string
): Promise<void | object> => {
    try {
        return new Promise((resolve) => {
            jwt.verify(
                refreshToken,
                process.env.AUTH_REFRESH_SECRET_KEY as string,
                (err, user) => {
                    if (err) {
                        throw Boom.unauthorized("Invalid refresh token");
                    }
                    if (isBlacklisted(refreshToken, user.username)) {
                        throw Boom.unauthorized(
                            "Invalid refresh token, your session has over."
                        );
                    }
                    const { user_id, username, role } = user;
                    const payload = {
                        user_id,
                        username,
                        role,
                    };
                    const newAccessToken: string = jwt.sign(
                        payload,
                        process.env.AUTH_ACCESS_SECRET_KEY as string,
                        {
                            expiresIn: "30s",
                        }
                    );
                    const newRefreshToken: string = jwt.sign(
                        payload,
                        process.env.AUTH_REFRESH_SECRET_KEY as string,
                        {
                            expiresIn: "10m",
                        }
                    );
                    return resolve({ newRefreshToken, newAccessToken });
                }
            );
        });
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const logout = async (refreshToken: string): Promise<void | string> => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                process.env.AUTH_REFRESH_SECRET_KEY as string,
                (err, user) => {
                    if (err) {
                        throw Boom.unauthorized();
                    }
                    const username: string = user.username as string;
                    client.set(username, refreshToken, (err, data) => {
                        if (err) {
                            throw Boom.badRequest(`Problem on logout`);
                        }
                        resolve(username);
                    });
                }
            );
        });
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

const isBlacklisted = (refreshToken: string, username: string): boolean => {
    try {
        if (!client.exists(username)) {
            return false;
        }
        client.get(username, (err, tokenBlacklisted) => {
            if (err) {
                return false;
            }
            if (refreshToken === tokenBlacklisted) {
                return true;
            }
        });
    } catch (err) {
        throw new Error(err);
    }
};
