import { Request, Response, NextFunction } from "express";
import { Role, User } from "../entity";
import {
    findAllRoles,
    findRole,
    createRole,
    updateRole,
    removeRole,
    findUsersByRole,
} from "../services/role.service";
import { DeleteResult } from "typeorm";

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
    const newRoleData = new Role();
    try {
        newRoleData.role = role;
        newRoleData.deleted = false;
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
    const { rol_id } = req.params;
    const { role } = req.body;
    try {
        const rolToUpdate: Role = await findRole(rol_id);
        const updatedRole = rolToUpdate;
        updatedRole.role = role;
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
        const deleteResults: DeleteResult = await removeRole(role_id);
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
