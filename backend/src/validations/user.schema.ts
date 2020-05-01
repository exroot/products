import { string, object, number, boolean } from "yup";

export const createUserSchema = object().shape({
    username: string()
        .min(4, "Username too short")
        .max(50, "Username too large")
        .required(),
    password: string()
        .min(8, "Password too short")
        .max(255, "Password too large")
        .required(),
    role: number().integer().positive().notRequired(),
    deleted: boolean().notRequired(),
});
