import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { Role, Brand } from ".";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    @Length(4, 255)
    username!: string;

    @Column()
    @Length(8, 255)
    password!: string;

    @Column()
    @ManyToOne((type: Role) => Role, (role: Role) => role.users)
    @JoinColumn({ name: "role" })
    role!: Role;

    // @OneToMany((type: Battery) => Battery, (battery: Battery) => battery.user)
    // batteries!: Battery[];

    // @OneToMany((type: Group) => Group, (group: Group) => group.user)
    // groups!: Group[];

    @OneToMany((type: Brand) => Brand, (brand: Brand) => brand.user)
    brands!: Brand[];
}
