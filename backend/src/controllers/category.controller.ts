import { Request, Response, NextFunction } from "express";
import { Category, Product } from "../entity";
import {
    findAllCategories,
    findCategory,
    ICategory,
    createCategory,
    updateCategory,
    removeCategory,
    // findProductsByCategory,
} from "../services/category.service";
import { createCategorySchema } from "../validations";
import { Boom } from "../utils/HTTP";

export const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const categories: Category[] = await findAllCategories();
        return res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
};

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { category_id } = req.params;
    try {
        const category: Category = await findCategory(category_id);
        return res.status(200).json(category);
    } catch (err) {
        next(err);
    }
};

export const postCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { category, user } = req.body;
    const newCategoryData: ICategory = {
        category,
        user_id: Number(user),
        deleted: false,
    };
    try {
        await createCategorySchema
            .validate(newCategoryData, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const newCategory: Category = await createCategory(newCategoryData);
        return res.status(200).json(newCategory);
    } catch (err) {
        next(err);
    }
};

export const editCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { category_id } = req.params;
    const { category } = req.body;
    const updatedCategory: ICategory = {
        category_id: Number(category_id),
        category,
    };
    try {
        await createCategorySchema
            .validate(updatedCategory, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const updateResults: Category = await updateCategory(updatedCategory);
        return res.status(200).json(updateResults);
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { category_id } = req.params;
    try {
        const deleteResults: Category = await removeCategory(category_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};

// export const getProductsByCategory = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response | void> => {
//     const { category_id } = req.params;
//     try {
//         const products: Product[] = await findProductsByBrand(brand_id);
//         return res.status(200).json(products);
//     } catch (err) {
//         next(err);
//     }
// };
