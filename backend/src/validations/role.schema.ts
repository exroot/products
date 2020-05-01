import { string, object, boolean } from "yup";

export const createRoleSchema = object().shape({
    role: string()
        .min(4, "Role too short")
        .max(50, "Role too large")
        .required(),
    deleted: boolean().notRequired(),
});
