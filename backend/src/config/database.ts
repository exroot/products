import { Battery, Brand, Group, Role, User } from "../entity";
import { ConnectionOptions } from "typeorm";
import "reflect-metadata";

export const dbConfig: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "exroot",
    password: "nevera123",
    database: "getsales",
    entities: [Battery, Brand, Group, Role, User],
    synchronize: true,
};
