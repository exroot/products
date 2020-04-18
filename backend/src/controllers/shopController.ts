import { Request, Response, NextFunction } from "express";
import { getAllUsers } from "../services/shopServices";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
        return res.json("blabla");
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const userId = req
    try {
        const user = await getSingleUser();
    }
}
