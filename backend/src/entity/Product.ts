import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from "typeorm";
import {
    IsNumber,
    Length,
    IsBoolean,
    IsPositive,
    IsOptional,
} from "class-validator";
import { User, Category } from ".";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    product_id!: number;

    @Column()
    @Length(4, 255)
    name!: string;

    @Column()
    @Length(0, 255)
    @IsOptional()
    image!: string;

    @Column()
    @IsNumber()
    @IsPositive()
    price!: number;

    @ManyToOne((type) => User, (role) => role.products)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToMany((type) => Category, (category) => category.products)

    categories!: Category[];
    @Column()
    @IsBoolean()
    deleted!: boolean;
}
