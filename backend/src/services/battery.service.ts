import { getRepository, DeleteResult } from "typeorm";
import { Battery } from "../entity";
import { HTTPServerError, Boom, HTTPClientResponse } from "../utils/HTTP";
import { validate } from "class-validator";

export interface IBattery {
    battery_id?: number;
    name: string;
    image: string;
    price: number;
    amperage: number;
    stock?: number;
    brand: number;
    group: number;
    user?: number;
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
    const newBattery: Battery = getRepository(Battery).create(battery);
    const validationErrors: string[] = [];
    try {
        // validate new battery data before save it on DB
        await validate(newBattery).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
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
        const batteryUpdated: Battery = getRepository(Battery).create(
            updatedBattery
        );

        // stock, user, and state (deleted or not) values of battery remains the same
        const { stock, user, deleted } = batteryToUpdate;
        batteryUpdated.stock = stock;
        batteryUpdated.user = user;
        batteryUpdated.deleted = deleted;

        // validate battery updated registry before save it on DB
        let validationErrors: string[] = [];
        await validate(batteryUpdated).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
        return await getRepository(Battery).save(batteryUpdated);
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
