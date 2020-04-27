import { Request, Response, NextFunction } from "express";
import {
    findAll,
    findOne,
    create,
    update,
    remove,
} from "../services/battery.service";
import { Battery } from "../entity";

export const getAllBatteries = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const batteries = await findAll();
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
        const battery = await findOne(battery_id);
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
    const { name, image, price, amperage } = req.body;
    const newBattery = new Battery();
    try {
        newBattery.stock = 1;
        newBattery.name = name;
        newBattery.image = image;
        newBattery.price = price;
        newBattery.amperage = amperage;
        const addNew = await create(newBattery);
        return res.status(200).json(addNew);
    } catch (err) {
        next(err);
    }
};

export const updateBattery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { battery_id } = req.params;
    const { name, image, price, amperage } = req.body;
    try {
        const batteryToUpdate = await findOne(battery_id);
        const updatedBattery: Battery = batteryToUpdate;
        updatedBattery.name = name;
        updatedBattery.image = image;
        updatedBattery.price = price;
        updatedBattery.amperage = amperage;
        const updateResults: Battery = await update(updatedBattery);
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
        const deleteResults = await remove(battery_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};
