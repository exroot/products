import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Length, IsBoolean } from "class-validator";
import { User, Product } from ".";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    category_id!: number;

    @Column()
    @Length(4, 50)
    category!: string;

    @ManyToOne((type) => User, (user) => user.categories)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToMany((type) => Product, (product) => product.categories)
    @JoinTable({
        name: "products_categories",
        joinColumn: {
            name: "category_id",
            referencedColumnName: "category_id",
        },
        inverseJoinColumn: {
            name: "product_id",
            referencedColumnName: "product_id",
        },
    })
    products!: Product[];

    @Column()
    @IsBoolean()
    deleted!: boolean;
}
