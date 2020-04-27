import { Request, Response, NextFunction } from "express";
import { User } from "../entity";
import {
    findAll,
    findOne,
    create,
    update,
    remove,
} from "../services/user.service";
import { hash } from "bcryptjs";
import { DeleteResult } from "typeorm";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const users: User[] = await findAll();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { user_id } = req.params;
    try {
        const user: User = await findOne(user_id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { username, password } = req.body;
    const newUser = new User();
    try {
        newUser.username = username;
        newUser.password = await hash(password, 12);
        const newUserSave: User = await create(newUser);
        return res.status(200).json(newUserSave);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { user_id } = req.params;
    const { username, password } = req.body;
    try {
        const userToUpdate: User = await findOne(user_id);
        const updatedUser: User = userToUpdate;
        updatedUser.username = username;
        updatedUser.password = await hash(password, 12);
        const updateResults: User = await update(updatedUser);
        return res.status(200).json(updateResults);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { user_id } = req.params;
    try {
        const deleteResults: DeleteResult = await remove(user_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};
