import { Request, Response, NextFunction } from "express";
import {
    findAllBatteries,
    findBattery,
    createBattery,
    updateBattery,
    removeBattery,
    IBattery,
} from "../services/battery.service";
import { Battery } from "../entity";
import { createBatterySchema } from "../validations";
import { Boom } from "../utils/HTTP";

export const getAllBatteries = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const batteries = await findAllBatteries();
        return res.status(200).json(batteries);
    } catch (err) {
        next(err);
    }
};

export const getBattery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { battery_id } = req.params;
    try {
        const battery = await findBattery(battery_id);
        return res.status(200).json(battery);
    } catch (err) {
        next(err);
    }
};

export const postBattery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { name, image, price, amperage, brand, group, user } = req.body;
    const batteryData: IBattery = {
        name,
        image,
        price,
        amperage,
        stock: 1,
        brand,
        group,
        user,
        deleted: false,
    };
    try {
        await createBatterySchema
            .validate(batteryData, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const newBattery = await createBattery(batteryData);
        return res.status(200).json(newBattery);
    } catch (err) {
        next(err);
    }
};

export const editBattery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { battery_id } = req.params;
    const { name, image, price, amperage, brand, group, user } = req.body;
    const updatedBattery: IBattery = {
        battery_id: Number(battery_id),
        name,
        image,
        price: Number(price),
        amperage: Number(amperage),
        brand: Number(brand),
        group: Number(group),
    };
    try {
        await createBatterySchema
            .validate(updatedBattery, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const updateResults: Battery = await updateBattery(updatedBattery);
        return res.status(200).json(updateResults);
    } catch (err) {
        next(err);
    }
};

export const deleteBattery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { battery_id } = req.params;
    try {
        const deleteResults = await removeBattery(battery_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};
