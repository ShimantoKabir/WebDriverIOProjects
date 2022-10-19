import CardEntity from "../entities/card.entity";
import CustomerEntity from "../entities/customer.entity";
import OrderEntity from "../entities/order.entity";
import Customer from "../models/customer";
import Product from "../models/product";
import Card from "./card";
import Order from "./order";

export default class Response {
    code: number;
    message: string;
    customer: Customer;
    product: Product;
    order: Order;
    card: Card;
    cardEntity: CardEntity;
    cards: CardEntity[];
    customerEntity: CustomerEntity;
    customers: CustomerEntity[];
    orders: OrderEntity[];
    orderEntity: OrderEntity;
}