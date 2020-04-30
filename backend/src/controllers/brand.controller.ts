import { Request, Response, NextFunction } from "express";
import { Brand, Battery } from "../entity";
import {
    findAllBrands,
    findBrand,
    IBrand,
    createBrand,
    updateBrand,
    removeBrand,
    findProductsByBrand,
} from "../services/brand.service";

export const getAllBrands = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const brands: Brand[] = await findAllBrands();
        return res.status(200).json(brands);
    } catch (err) {
        next(err);
    }
};

export const getBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { brand_id } = req.params;
    try {
        const brand: Brand = await findBrand(brand_id);
        return res.status(200).json(brand);
    } catch (err) {
        next(err);
    }
};

export const postBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { brand, user } = req.body;
    const newBrandData: IBrand = {
        brand,
        user,
        deleted: false,
    };
    try {
        const newBrand: Brand = await createBrand(newBrandData);
        return res.status(200).json(newBrand);
    } catch (err) {
        next(err);
    }
};

export const editBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { brand_id } = req.params;
    const { brand, user } = req.body;
    const updatedBrand: IBrand = {
        brand_id: Number(brand_id),
        brand,
        user,
    };
    try {
        const updatedResults: Brand = await updateBrand(updatedBrand);
        return res.status(200).json(updatedResults);
    } catch (err) {
        next(err);
    }
};

export const deleteBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { brand_id } = req.params;
    try {
        const deleteResults: Brand = await removeBrand(brand_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};

export const getProductsByBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { brand_id } = req.params;
    try {
        const batteries: Battery[] = await findProductsByBrand(brand_id);
        return res.status(200).json(batteries);
    } catch (err) {
        next(err);
    }
};
