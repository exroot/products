import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entity";
import {
    IRole,
    findAllRoles,
    findRole,
    createRole,
    updateRole,
    removeRole,
    findUsersByRole,
} from "../services/role.service";

export const getAllRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const roles: Role[] = await findAllRoles();
        return res.status(200).json(roles);
    } catch (err) {
        next(err);
    }
};
export const getRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { role_id } = req.params;
    try {
        const role: Role = await findRole(role_id);
        return res.status(200).json(role);
    } catch (err) {
        next(err);
    }
};
export const postRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { role } = req.body;
    const newRoleData: IRole = {
        role,
        deleted: false,
    };
    try {
        const newRole = await createRole(newRoleData);
        return res.status(200).json(newRole);
    } catch (err) {
        next(err);
    }
};

export const editRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { role_id } = req.params;
    const { role } = req.body;
    const updatedRole: IRole = {
        role_id: Number(role_id),
        role,
    };
    try {
        const updatedResults: Role = await updateRole(updatedRole);
        return res.status(200).json(updatedResults);
    } catch (err) {
        next(err);
    }
};
export const deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { role_id } = req.params;
    try {
        const deleteResults: Role = await removeRole(role_id);
        return res.status(200).json(deleteResults);
    } catch (err) {
        next(err);
    }
};

export const getUsersByRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { role_id } = req.params;
    try {
        const users: User[] = await findUsersByRole(role_id);
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
