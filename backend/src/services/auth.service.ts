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
): Promise<string> => {
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
            process.env.AUTH_SECRET_KEY as string,
            {
                expiresIn: "10m",
            }
        );
        return accessToken;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const logout = async (token: string): Promise<void | string> => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.AUTH_SECRET_KEY as string,
                (err, user) => {
                    if (err) {
                        throw Boom.unauthorized();
                    }
                    client.set(user.username, token, (err, data) => {
                        const username: string = user.username as string;
                        if (err) {
                            throw Boom.badRequest(`Problem on logout`);
                        } else {
                            resolve(username);
                        }
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
