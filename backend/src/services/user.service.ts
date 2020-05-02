import { getRepository, DeleteResult, Repository } from "typeorm";
import { User, Role } from "../entity";
import { HTTPClientResponse, Boom, HTTPServerError } from "../utils/HTTP";
import { validate } from "class-validator";

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
    const { username, password } = user;
    try {
        const newUser: User = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.deleted = false;
        const role: Role | undefined = await getRepository(Role).findOne(2);
        if (!role) {
            throw Boom.badRequest(`You need to create a role first`);
        }
        newUser.role = role;
        // validate new user data before save it on DB
        const validationErrors: string[] = [];
        await validate(newUser).then((errors) => {
            console.log(errors);
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
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

        // state (deleted or not) value of user remains the same
        userToUpdate.username = username;
        userToUpdate.password = password;
        userToUpdate.role = userRole;

        // validate user updated data before save it on DB
        const validationErrors: string[] = [];
        await validate(userToUpdate).then((errors) => {
            if (errors.length > 0) {
                errors.forEach((err) => {
                    const error: string[] = Object.values(err.constraints);
                    validationErrors.push(...error);
                });
                throw Boom.badRequest(validationErrors);
            }
        });
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
