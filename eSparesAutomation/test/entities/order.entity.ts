// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import CardEntity from "./card.entity";
import CustomerEntity from "./customer.entity";
import ProductEntity from "./product.entity";

@Entity()
export default class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    breakPoint: string;

    @Column()
    orderNumber: string;

    @OneToOne((type) => CustomerEntity,{
        createForeignKeyConstraints: false
    })
    @JoinColumn()
    customer: CustomerEntity;

    @OneToOne((type) => CardEntity,{
        createForeignKeyConstraints : false
    })
    @JoinColumn()
    card: CardEntity;

    @OneToOne((type) => ProductEntity,{
        cascade: true
    })
    @JoinColumn()
    product: ProductEntity;
}