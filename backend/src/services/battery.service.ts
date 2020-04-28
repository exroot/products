import { getRepository, DeleteResult } from "typeorm";
import { Battery } from "../entity";
import { HTTPServerError, Boom, HTTPClientResponse } from "../utils/HTTP";

export interface IBattery {
    battery_id?: number;
    name: string;
    image: string;
    price: number;
    amperage: number;
    stock?: number;
    brand: number;
    user: number;
    deleted?: boolean;
}

export const findAllBatteries = async (): Promise<Battery[]> => {
    try {
        const batteries: Battery[] = await getRepository(Battery).find();
        if (batteries.length < 1) {
            throw Boom.notFound(`Batteries not found`);
        }
        return batteries;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findBattery = async (
    batteryId: number | string
): Promise<Battery> => {
    try {
        const battery: Battery | undefined = await getRepository(
            Battery
        ).findOne(batteryId);
        if (!battery) {
            throw Boom.notFound(`Battery not found`);
        }
        return battery;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const createBattery = async (battery: IBattery): Promise<Battery> => {
    try {
        const newBattery = getRepository(Battery).create(battery);
        return await getRepository(Battery).save(newBattery);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const updateBattery = async (
    updatedBattery: IBattery
): Promise<Battery> => {
    const { battery_id } = updatedBattery;
    try {
        let batteryToUpdate: Battery | undefined = await getRepository(
            Battery
        ).findOne(battery_id);
        if (!batteryToUpdate) {
            throw Boom.notFound(`Battery to update not found`);
        }
        return await getRepository(Battery).save(updatedBattery);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const removeBattery = async (
    batteryId: number | string
): Promise<Battery> => {
    try {
        const batteryToDelete: Battery | undefined = await getRepository(
            Battery
        ).findOne(batteryId);
        if (!batteryToDelete) {
            throw Boom.notFound(`Battery not found`);
        }
        batteryToDelete.deleted = true;
        return await getRepository(Battery).save(batteryToDelete);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};
