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
    const groupData: IGroup = {
        group,
        user,
        deleted: false,
    };
    try {
        const newGroup: Group = await createGroup(groupData);
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
        user,
    };
    try {
        const updatedResults: Group = await updateGroup(updatedGroup);
        return res.status(200).json(updatedResults);
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
