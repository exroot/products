import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Length, IsBoolean } from "class-validator";
import { User } from ".";

@Entity("brands")
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id!: number;

    @Column()
    @Length(4, 255)
    brand!: string;

    @Column()
    @IsBoolean()
    deleted!: boolean;

    @Column()
    @ManyToOne((type: User) => User, (user: User) => user.brands)
    @JoinColumn({ name: "user" })
    user!: number;

    // @OneToMany((type: Battery) => Battery, (battery: Battery) => battery.brand)
    // batteries!: Battery[];
}
