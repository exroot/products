import { getRepository } from "typeorm";
import { Battery } from "../models";

export const getAllBateries = async (): Promise<Battery | Battery[]> => {
    try {
        return await getRepository(Battery).find();
    } catch (err) {
        return err;
    }
};

export const getBattery = async (batteryId: Number) => {};
