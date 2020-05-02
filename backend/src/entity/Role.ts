import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Length, IsBoolean } from "class-validator";
import { User } from "./User";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    role_id!: number;

    @Column()
    @Length(4, 50)
    role!: string;

    @Column()
    @IsBoolean()
    deleted!: boolean;

    @OneToMany((type: User) => User, (user: User) => user.role)
    users!: User[];
}
