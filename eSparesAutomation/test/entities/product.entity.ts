// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: string;

    @Column()
    stockNumber: string;

    @Column()
    title: string;
}