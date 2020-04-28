import { getRepository, DeleteResult, Repository } from "typeorm";
import { User, Role } from "../entity";
import { HTTPClientResponse, Boom, HTTPServerError } from "../utils/HTTP";

export interface IUser {
    user_id?: number;
    username: string;
    password: string;
    role?: number;
    deleted?: boolean;
}

export const findAllUsers = async (): Promise<User[]> => {
    try {
        const users: User[] = await getRepository(User).find();
        if (users.length < 1) {
            throw Boom.notFound(`Users not found`);
        }
        return users;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const findUser = async (userId: number | string): Promise<User> => {
    try {
        const user: User | undefined = await getRepository(User).findOne(
            userId
        );
        if (!user) {
            throw Boom.notFound(`User not found`);
        }
        return user;
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const createUser = async (user: IUser): Promise<User> => {
    try {
        const newUser: User = new User();
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.deleted = false;
        const role: Role = new Role();
        role.role = "Administrador";
        role.deleted = false;
        const newRole: Role = await getRepository(Role).save(role);
        newUser.role = newRole;
        return await getRepository(User).save(newUser);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const updateUser = async (updatedUser: IUser): Promise<User> => {
    const { user_id, username, password, role } = updatedUser;
    try {
        const userToUpdate: User | undefined = await getRepository(
            User
        ).findOne(user_id);
        if (!userToUpdate) {
            throw Boom.notFound(`User to update not found`);
        }
        const userRole: Role | undefined = await getRepository(Role).findOne(
            role
        );
        if (!userRole) {
            throw Boom.badRequest(`That role doesn't exist`);
        }
        userToUpdate.role = userRole;
        userToUpdate.username = username;
        userToUpdate.password = password;
        return await getRepository(User).save(userToUpdate);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};

export const removeUser = async (userId: number | string): Promise<User> => {
    try {
        const userToDelete: User | undefined = await getRepository(
            User
        ).findOne(userId);
        if (!userToDelete) {
            throw Boom.notFound(`User to delete not found`);
        }
        userToDelete.deleted = true;
        return await getRepository(User).save(userToDelete);
    } catch (err) {
        if (err instanceof HTTPClientResponse) {
            throw err;
        }
        throw new HTTPServerError(err.name);
    }
};
