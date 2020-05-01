import { string, object, number, boolean } from "yup";

export const createBrandSchema = object().shape({
    brand: string()
        .min(4, "Brand name too short")
        .max(50, "Brand name too large")
        .required(),
    user: number().integer().positive().notRequired(),
    deleted: boolean().notRequired(),
});
