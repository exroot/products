import { Role, User } from "../entity";
import { HTTPClientResponse, Boom, HTTPServerError } from "../utils/HTTP";
import { getRepository, Repository, DeleteResult } from "typeorm";
import { validate } from "class-validator";

export interface IRole {
    role_id?: number;
    role: string;
    deleted?: boolean;
}

export const findAllRoles = async (): Promise<Role[]> => {
    try {
        const roles: Role[] = await getRepository(Role).find();
        if (roles.length < 1) {
            throw Boom.notFound(`Roles not found`);
        }
        return roles;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findRole = async (roleId: number | string): Promise<Role> => {
    try {
        const role: Role | undefined = await getRepository(Role).findOne(
            roleId
        );
        if (!role) {
            throw Boom.notFound(`Role not found`);
        }
        return role;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const createRole = async (role: IRole): Promise<Role> => {
    const newRole: Role = new Role();
    newRole.role = role.role;
    newRole.deleted = false;
    const validationErrors: string[] = [];
    try {
        await validate(newRole).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
        return await getRepository(Role).save(newRole);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const updateRole = async (updatedRole: IRole): Promise<Role> => {
    const { role_id } = updatedRole;
    try {
        const roleToUpdate: Role | undefined = await getRepository(
            Role
        ).findOne(role_id);
        if (!roleToUpdate) {
            throw Boom.notFound(`Role to update not found`);
        }
        roleToUpdate.role = updatedRole.role;
        const validationErrors: string[] = [];
        await validate(roleToUpdate).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
        return await getRepository(Role).save(roleToUpdate);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const removeRole = async (roleId: number | string): Promise<Role> => {
    try {
        const roleToDelete: Role | undefined = await getRepository(
            Role
        ).findOne(roleId);
        if (!roleToDelete) {
            throw Boom.notFound(`Role to delete not found`);
        }
        roleToDelete.deleted = true;
        return await getRepository(Role).save(roleToDelete);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findUsersByRole = async (
    roleId: number | string
): Promise<User[]> => {
    try {
        const role: Role | undefined = await getRepository(Role).findOne(
            roleId,
            { relations: ["users"] }
        );
        if (!role) {
            throw Boom.notFound(`Role not found`);
        }
        const users: User[] = role.users;
        return users;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};
