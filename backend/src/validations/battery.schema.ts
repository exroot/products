import { string, object, number, boolean } from "yup";

export const createBatterySchema = object().shape({
    name: string()
        .min(4, "Battery name too short")
        .max(255, "Battery name too large")
        .required(),
    image: string().min(0).max(255),
    price: number().positive("price must be positive").required(),
    amperage: number().positive("amperage must be positive").required(),
    stock: number().integer().positive().notRequired(),
    brand: number().integer().positive().required(),
    group: number().integer().positive().required(),
    user: number().integer().positive().notRequired(),
    deleted: boolean().notRequired(),
});
