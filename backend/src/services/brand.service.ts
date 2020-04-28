import { getRepository, DeleteResult } from "typeorm";
import { Brand, Battery } from "../entity";
import { HTTPServerError, Boom, HTTPClientResponse } from "../utils/HTTP";

export interface IBrand {
    brand_id?: number;
    brand: string;
    user: number;
    deleted?: boolean;
}

export const findAllBrands = async (): Promise<Brand[]> => {
    try {
        const brands: Brand[] = await getRepository(Brand).find();
        if (brands.length < 1) {
            throw Boom.notFound(`Brands not found`);
        }
        return brands;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findBrand = async (brand_id: number | string): Promise<Brand> => {
    try {
        const brand: Brand | undefined = await getRepository(Brand).findOne(
            brand_id
        );
        if (!brand) {
            throw Boom.notFound(`brand not found`);
        }
        return brand;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const createBrand = async (brand: IBrand): Promise<Brand> => {
    try {
        const newBrand: Brand = getRepository(Brand).create(brand);
        return await getRepository(Brand).save(newBrand);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const updateBrand = async (updatedBrand: IBrand): Promise<Brand> => {
    const { brand_id } = updatedBrand;
    try {
        const brandToUpdate: Brand | undefined = await getRepository(
            Brand
        ).findOne(brand_id);
        if (!brandToUpdate) {
            throw Boom.notFound(`Brand to update not found`);
        }
        return await getRepository(Brand).save(updatedBrand);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const deleteBrand = async (
    brand_id: number | string
): Promise<Brand> => {
    try {
        const brandToDelete: Brand | undefined = await getRepository(
            Brand
        ).findOne(brand_id);
        if (!brandToDelete) {
            throw Boom.notFound(`Battery to delete not found`);
        }
        brandToDelete.deleted = true;
        return await getRepository(Brand).save(brandToDelete);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findProductsByBrand = async (
    brand_id: number | string
): Promise<Battery[]> => {
    try {
        const brand: Brand | undefined = await getRepository(
            Brand
        ).findOne(brand_id, { relations: ["batteries"] });
        if (!brand) {
            throw Boom.notFound(`Brand not found`);
        }
        const batteries: Battery[] = brand.batteries;
        return batteries;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};
