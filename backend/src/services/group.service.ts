import { getRepository } from "typeorm";
import { Group, Battery } from "../entity";
import { HTTPServerError, Boom, HTTPClientResponse } from "../utils/HTTP";
import { validate } from "class-validator";

export interface IGroup {
    group_id?: number;
    group: string;
    user: number;
    deleted?: boolean;
}

export const findAllGroups = async (): Promise<Group[]> => {
    try {
        const groups: Group[] = await getRepository(Group).find();
        if (groups.length < 1) {
            throw Boom.notFound(`Groups not found`);
        }
        return groups;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findGroup = async (group_id: number | string): Promise<Group> => {
    try {
        const group: Group | undefined = await getRepository(Group).findOne(
            group_id
        );
        if (!group) {
            throw Boom.notFound(`Group not found`);
        }
        return group;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const createGroup = async (group: IGroup): Promise<Group> => {
    const newGroup: Group = getRepository(Group).create(group);
    const validationErrors: string[] = [];
    try {
        await validate(newGroup).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
        return await getRepository(Group).save(newGroup);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const updateGroup = async (updatedGroup: IGroup): Promise<Group> => {
    const { group_id } = updatedGroup;
    try {
        const groupToUpdate: Group | undefined = await getRepository(
            Group
        ).findOne(group_id);
        if (!groupToUpdate) {
            throw Boom.notFound(`Group to update not found`);
        }
        groupToUpdate.group = updatedGroup.group;
        const validationErrors: string[] = [];
        await validate(groupToUpdate).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
        return await getRepository(Group).save(groupToUpdate);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const removeGroup = async (
    group_id: number | string
): Promise<Group> => {
    try {
        const groupToDelete: Group | undefined = await getRepository(
            Group
        ).findOne(group_id);
        if (!groupToDelete) {
            throw Boom.notFound(`Battery to delete not found`);
        }
        groupToDelete.deleted = true;
        return await getRepository(Group).save(groupToDelete);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findProductsByGroup = async (
    group_id: number | string
): Promise<Battery[]> => {
    try {
        const group: Group | undefined = await getRepository(
            Group
        ).findOne(group_id, { relations: ["batteries"] });
        if (!group) {
            throw Boom.notFound(`Group not found`);
        }
        const batteries: Battery[] = group.batteries;
        return batteries;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};
