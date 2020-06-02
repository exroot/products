import { Request, Response, NextFunction } from "express";
import {
    findAllProducts,
    findProduct,
    createProduct,
    updateProduct,
    removeProduct,
    IProduct,
} from "../services/product.service";
import { Product } from "../entity";
import { createProductSchema } from "../validations";
import { Boom } from "../utils/HTTP";

export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const products: Product[] = await findAllProducts();
        return res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { product_id } = req.params;
    try {
        const product: Product = await findProduct(product_id);
        return res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

export const postProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { name, image, price } = req.body;
    const productData: IProduct = {
        name,
        image,
        price: Number(price),
        user: Number(req.user.user_id),
        deleted: false,
    };
    try {
        await createProductSchema
            .validate(productData, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const newProduct: Product = await createProduct(productData);
        return res.status(200).json(newProduct);
    } catch (err) {
        next(err);
    }
};

export const editProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { product_id } = req.params;
    const { name, image, price } = req.body;
    const updatedProduct: IProduct = {
        product_id: Number(product_id),
        name,
        image,
        price: Number(price),
    };
    try {
        await createProductSchema
            .validate(updatedProduct, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const updateResults: Product = await updateProduct(updatedProduct);
        return res.status(200).json(updateResults);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { product_id } = req.params;
    try {
        const deleteResults: Product = await removeProduct(product_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};
