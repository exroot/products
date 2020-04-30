import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { IsNumber, Length, IsBoolean } from "class-validator";
import { Brand, User, Group } from ".";

@Entity("batteries")
export class Battery {
    @PrimaryGeneratedColumn()
    battery_id!: number;

    @Column()
    @Length(4, 255)
    name!: string;

    @Column()
    @Length(0, 255)
    image!: string;

    @Column()
    @IsNumber()
    price!: number;

    @Column()
    @IsNumber()
    stock!: number;

    @Column()
    @IsNumber()
    amperage!: number;

    @Column()
    @ManyToOne((type: Group) => Group, (group: Group) => group.batteries)
    @JoinColumn({ name: "group" })
    group!: number;

    @Column()
    @ManyToOne((type: Brand) => Brand, (brand: Brand) => brand.batteries)
    @JoinColumn({ name: "brand" })
    brand!: number;

    @Column()
    @ManyToOne((type: User) => User, (user: User) => user.batteries)
    @JoinColumn({ name: "user" })
    user!: number;

    @Column()
    @IsBoolean()
    deleted!: boolean;
}
