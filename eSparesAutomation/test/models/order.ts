import Card from "./card";
import Customer from "./customer";
import Product from "./product";

export default class Order {

    breakPoint!: string;
    orderNumber!: string;
    customer!: Customer;
    card!: Card;
    product!: Product;
    cardId!: number;
    customerId!: number;

    constructor(
        breakPoint?: string,
        orderNumber?: string,
        customer?: Customer,
        card?: Card,
        product?: Product,
        cardId?: number,
        customerId?: number
    ){
        this.breakPoint = breakPoint;
        this.orderNumber = orderNumber;
        this.customer = customer;
        this.card = card;
        this.product = product;
        this.cardId = cardId;
        this.customerId = customerId;
    }
}