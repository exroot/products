import { Request, Response, NextFunction } from "express";
import {
    findAllGroups,
    findGroup,
    IGroup,
    createGroup,
    updateGroup,
    removeGroup,
    findProductsByGroup,
} from "../services/group.service";
import { Group, Battery } from "../entity";
import { createGroupSchema } from "../validations";
import { Boom } from "../utils/HTTP";

export const getAllGroups = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const groups: Group[] = await findAllGroups();
        return res.status(200).json(groups);
    } catch (err) {
        next(err);
    }
};

export const getGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { group_id } = req.params;
    try {
        const group: Group = await findGroup(group_id);
        return res.status(200).json(group);
    } catch (err) {
        next(err);
    }
};

export const postGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { group, user } = req.body;
    const newGroupData: IGroup = {
        group,
        user: Number(user),
        deleted: false,
    };
    try {
        await createGroupSchema
            .validate(newGroupData, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const newGroup: Group = await createGroup(newGroupData);
        return res.status(200).json(newGroup);
    } catch (err) {
        next(err);
    }
};

export const editGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { group_id } = req.params;
    const { group, user } = req.body;
    const updatedGroup: IGroup = {
        group_id: Number(group_id),
        group,
        user: Number(user),
    };
    try {
        await createGroupSchema
            .validate(updatedGroup, { abortEarly: false })
            .catch((err) => {
                throw Boom.badRequest(err.errors);
            });
        const updateResults: Group = await updateGroup(updatedGroup);
        return res.status(200).json(updateResults);
    } catch (err) {
        next(err);
    }
};

export const deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { group_id } = req.params;
    try {
        const deletedGroup: Group = await removeGroup(group_id);
        return res.status(200).json(deletedGroup);
    } catch (err) {
        next(err);
    }
};

export const getProductsByGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { group_id } = req.params;
    try {
        const batteries: Battery[] = await findProductsByGroup(group_id);
        return res.status(200).json(batteries);
    } catch (err) {}
};
