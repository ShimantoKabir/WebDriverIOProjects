// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class CustomerEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    country: string;

    @Column()
    houseNumber: string;

    @Column()
    postCode: string;

    @Column()
    email: string;

    @Column({
        nullable: true
    })
    city!: string;

    @Column({
        nullable: true
    })
    state!: string;

    @Column({
        nullable: true
    })
    addressOne!: string;

    @Column({
        nullable: true
    })
    addressTwo!: string;
}