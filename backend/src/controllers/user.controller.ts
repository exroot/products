import { Request, Response, NextFunction } from "express";
import { User } from "../entity";
import {
    IUser,
    updateUser,
    removeUser,
    createUser,
    findUser,
    findAllUsers,
} from "../services/user.service";
import { hash } from "bcryptjs";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const users: User[] = await findAllUsers();
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
        const user: User = await findUser(user_id);
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
    const newUser: IUser = {
        username,
        password,
    };
    try {
        newUser.username = username;
        newUser.password = await hash(password, 12);
        const newUserSave: User = await createUser(newUser);
        return res.status(200).json(newUserSave);
    } catch (err) {
        next(err);
    }
};

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { user_id } = req.params;
    const { username, password, role } = req.body;
    const updatedUser: IUser = {
        user_id: Number(user_id),
        username,
        password: await hash(password, 12),
        role,
    };
    console.log(updatedUser);
    try {
        const updateResults: User = await updateUser(updatedUser);
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
        const deleteResults: User = await removeUser(user_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};
