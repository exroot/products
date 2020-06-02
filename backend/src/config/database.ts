import { Product, Category, Role, User } from "../entity";
import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

export const dbConfig: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Product, Category, Role, User],
    synchronize: true,
};
