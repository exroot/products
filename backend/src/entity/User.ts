import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Length, IsBoolean } from "class-validator";
import { Role, Category, Product } from ".";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    @Length(4, 50)
    username!: string;

    @Column()
    @Length(8, 255)
    password!: string;

    @ManyToOne((type) => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;

    @OneToMany((type) => Product, (product) => product.user)
    products!: Product[];

    @OneToMany((type) => Category, (category) => category.user)
    categories!: Category[];

    @Column()
    @IsBoolean()
    deleted!: boolean;
}
