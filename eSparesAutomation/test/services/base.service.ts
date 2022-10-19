import { AppDataSource } from "../data.source";
import { ResponseCode } from "../enums/response.code";
import { ResponseMessage } from "../enums/response.message";
import CardEntity from "../entities/card.entity";
import CustomerEntity from "../entities/customer.entity";
import Card from "../models/card";
import Customer from "../models/customer";
import Product from "../models/product";
import Response from "../models/response";
import Order from "../models/order";
import OrderEntity from "../entities/order.entity";
import ProductEntity from "../entities/product.entity";
import { Equal } from "typeorm";

export default class BaseService<T>{

    readonly productDataKey: string = "PRODUCT_DATA_KEY";
    readonly customerDataKey: string = "CUSTOMER_DATA_KEY";
    readonly orderDataKey: string = "ORDER_DATA_KEY";

    async create(data: T): Promise<Response> {
        
        let response = new Response();
        try {

            if(data.constructor.name === Card.name){
                // @ts-ignore
                let card: Card = data;

                let cardEntity = new CardEntity();
                cardEntity.number = card.number;
                cardEntity.password = card.password;
                cardEntity.securityCode = card.securityCode;
                cardEntity.expiryDate = card.expiryDate;
                await AppDataSource.manager.save(cardEntity);  

            }else if(data.constructor.name === Customer.name){

                // @ts-ignore
                let customer: Customer = data;
                
                let customerEntity : CustomerEntity = new CustomerEntity();
                customerEntity.title = customer.title;
                customerEntity.firstName = customer.firstName;
                customerEntity.lastName = customer.lastName;
                customerEntity.phoneNumber = customer.phoneNumber;
                customerEntity.country = customer.country;
                customerEntity.houseNumber = customer.houseNumber;
                customerEntity.postCode = customer.postCode;
                customerEntity.email = customer.email;
                customerEntity.city = customer.city;
                customerEntity.state = customer.state;
                customerEntity.addressOne = customer.addressOne;
                customerEntity.addressTwo = customer.addressTwo;
                await AppDataSource.manager.save(customerEntity);  

            }else if(data.constructor.name === Order.name){
                
                // @ts-ignore
                let order: Order = data;
                // @ts-ignore
                let card: Card = data.card;
                // @ts-ignore
                let customer: Customer = data.customer;
                // @ts-ignore
                let product: Product = data.product;

                let cardEntity = new CardEntity();
                cardEntity.id = card.id;

                let customerEntity: CustomerEntity = new CustomerEntity();
                customerEntity.id = customer.id;
                
                let productEntity: ProductEntity = new ProductEntity();
                productEntity.price = product.price;
                productEntity.stockNumber = product.stockNumber;
                productEntity.title = product.title;

                let orderEntity: OrderEntity = new OrderEntity();
                orderEntity.breakPoint = order.breakPoint;
                orderEntity.orderNumber = order.orderNumber;
                orderEntity.customer = customerEntity;
                orderEntity.card = cardEntity;
                orderEntity.product = productEntity;
                await AppDataSource.manager.save(orderEntity);

            }

            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;
        } catch (e) {
            response.code = ResponseCode.ERROR;
            response.message = e.message;
        }
        return response;
    }

    async read(name: string): Promise<Response> {
        let response = new Response();
        try {
            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;

            if(name === Card.name){
                response.cards = await AppDataSource.getRepository(CardEntity).find({
                    order: {
                        id: "DESC",
                    },
                    skip: 0,
                    take: 5,
                });
            }else if(name === Customer.name){
                response.customers = await AppDataSource.getRepository(CustomerEntity).find({
                    order: {
                        id: "DESC",
                    },
                    skip: 0,
                    take: 5,
                });
            }else if(name === Order.name){

                response.orders = await AppDataSource.getRepository(OrderEntity).find({
                    relations: {
                        card: true,
                        product: true,
                        customer: true
                    },
                    order: {
                        id: "DESC",
                    },
                    skip: 0,
                    take: 5,
                });
            }

        } catch (e) {
            response.code = ResponseCode.ERROR;
            response.message = e.message;
        }
        return response;
    }

    async readById(id: number, name: string): Promise<Response> {
        let response = new Response();
        try {

            if(name === Card.name){
                response.card = await AppDataSource.getRepository(CardEntity).findOneBy({
                    id : Equal(id)
                });
            }else if(name === Customer.name){
                response.customer = await AppDataSource.getRepository(CustomerEntity).findOneBy({
                    id : Equal(id)
                });
            }else if(name === Order.name){
                response.orderEntity = await AppDataSource.getRepository(OrderEntity).findOne({
                    where : {
                        id : id
                    },
                    relations: {
                        card: true,
                        product: true,
                        customer: true
                    },
                });
            }

            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;

        } catch (e) {
            response.code = ResponseCode.ERROR;
            response.message = e.message;
        }
        return response;
    }

    async sharedSet(data: T): Promise<Response> {

        let response = new Response();

        try {

            if(data.constructor.name === Product.name){
                // @ts-ignore
                let product: Product = data;
                // @ts-ignore
                await browser.sharedStore.set(this.productDataKey, JSON.stringify(product));    
                response.product = product;    
            }else if(data.constructor.name === Customer.name){
                // @ts-ignore
                let customer: Customer = data;
                // @ts-ignore
                await browser.sharedStore.set(this.customerDataKey, JSON.stringify(customer));    
                response.customer = customer;
            }else if(data.constructor.name === Order.name){
                // @ts-ignore
                let order: Order = data;
                // @ts-ignore
                await browser.sharedStore.set(this.orderDataKey, JSON.stringify(order));    
                response.order = order;
            }

            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;

        } catch (error) {
            response.code = ResponseCode.ERROR;
            response.message = ResponseMessage.ERROR
        }

        return response;

    }

    async sharedGet(key: string): Promise<Response> {

        let response = new Response();

        try {

            if(key === this.productDataKey){

                // @ts-ignore
                let productString = await browser.sharedStore.get(this.productDataKey);
                let product: Product = JSON.parse(productString);
                response.product = product;

            }else if(key === this.customerDataKey){
                // @ts-ignore
                let customerString = await browser.sharedStore.get(this.customerDataKey);
                let customer: Customer = JSON.parse(customerString);
                response.customer = customer;

            }else if(key === this.orderDataKey){
                // @ts-ignore
                let orderString = await browser.sharedStore.get(this.orderDataKey);
                let order: Order = JSON.parse(orderString);
                response.order = order;
            }
            
            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;

        } catch (error) {
            response.code = ResponseCode.ERROR;
            response.message = ResponseMessage.ERROR
        }

        return response;

    }
}