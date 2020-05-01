import { string, object, number, boolean } from "yup";

export const createGroupSchema = object().shape({
    groupSchema: string()
        .min(4, "Group name too short")
        .max(50, "Group name too large")
        .required(),
    user: number().integer().positive().notRequired(),
    deleted: boolean().notRequired(),
});
