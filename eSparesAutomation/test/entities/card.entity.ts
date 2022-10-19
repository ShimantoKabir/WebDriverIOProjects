// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class CardEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    expiryDate: string;

    @Column()
    securityCode: string;

    @Column()
    password: string;
}