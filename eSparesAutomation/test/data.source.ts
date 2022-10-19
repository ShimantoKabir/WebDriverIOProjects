// @ts-ignore
import { DataSource } from "typeorm";
import ProductEntity from "./entities/product.entity";
import CardEntity from "./entities/card.entity";
import CustomerEntity from "./entities/customer.entity";
import OrderEntity from "./entities/order.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [ProductEntity, CardEntity, CustomerEntity, OrderEntity],
    subscribers: [],
    migrations: []
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
});