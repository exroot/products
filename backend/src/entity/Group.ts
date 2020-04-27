import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Length, IsBoolean } from "class-validator";

@Entity("groups")
export class Group {
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column()
    @Length(4, 255)
    group!: string;

    @Column()
    @IsBoolean()
    deleted!: boolean;

    // @Column()
    // @ManyToOne((type: User) => User, (user: User) => user.groups)
    // @JoinColumn({ name: "user" })
    // user!: number;

    // @OneToMany((type: Battery) => Battery, (battery: Battery) => battery.group)
    // batteries!: Battery[];
}
