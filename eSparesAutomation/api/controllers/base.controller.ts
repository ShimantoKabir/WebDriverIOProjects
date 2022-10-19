import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ResponseCode } from "../../test/enums/response.code";
import { ResponseMessage } from "../../test/enums/response.message";
import Card from "../../test/models/card";
import BaseService from "../../test/services/base.service";
import MyResponse from "../../test/models/response";
import CardService from "../../test/services/card.service";
import CustomerService from "../../test/services/customer.service";
import Customer from "../../test/models/customer";
import OrderService from "../../test/services/order.service";
import Order from "../../test/models/order";
import Product from "../../test/models/product";

@injectable()
export default class BaseController{

    service: BaseService<any>

    constructor(service: BaseService<any>){
        this.service = service
    }

    get = async (req: Request, res: Response) => {

        let resource : MyResponse;

        if(this.service.constructor.name === CardService.name){
            resource = await this.service.read(Card.name);
        } else if(this.service.constructor.name === CustomerService.name){
            resource = await this.service.read(Customer.name);
        }else if(this.service.constructor.name === OrderService.name){
            resource = await this.service.read(Order.name);
        }

        res.send(resource);
    }

    getById  = async (req: Request, res: Response) => {

        let id : number = parseInt(req.params['id']);
        let resource : MyResponse;

        if(this.service.constructor.name === CardService.name){
            resource = await this.service.readById(id,Card.name);
        } else if(this.service.constructor.name === CustomerService.name){
            resource = await this.service.readById(id,Customer.name);
        }else if(this.service.constructor.name === OrderService.name){
            resource = await this.service.readById(id,Order.name);
        }

        res.send(resource);
    }

    post = async (req: Request, res: Response) => {

        let resource : MyResponse;

        if(this.service.constructor.name === CardService.name){

            let card: Card = req.body;

            if(card.number && card.expiryDate && card.securityCode && card.password){

                resource = await this.service.create(new Card(card.number, card.expiryDate, card.securityCode, card.password));

            }else{
                resource = new MyResponse();
                resource.code = ResponseCode.ERROR;
                resource.message = ResponseMessage.FIELD_MISSING;
            } 

        } else if(this.service.constructor.name === CustomerService.name){

            let customer: Customer = req.body;

            if(
                customer.title && 
                customer.firstName && 
                customer.lastName && 
                customer.phoneNumber && 
                customer.country &&
                customer.houseNumber &&
                customer.postCode &&
                customer.email
            ){

                resource = await this.service.create(new Customer(
                    customer.title,
                    customer.firstName,
                    customer.lastName,
                    customer.phoneNumber,
                    customer.country,
                    customer.postCode,
                    customer.houseNumber,
                    customer.email,
                    customer.city,
                    customer.state,
                    customer.addressOne,
                    customer.addressTwo
                ));

            }else{
                resource = new MyResponse();
                resource.code = ResponseCode.ERROR;
                resource.message = ResponseMessage.FIELD_MISSING;
            }

        } else if(this.service.constructor.name === OrderService.name){

            let order: Order = req.body;
            let card: Card = req.body.card;
            let customer: Customer = req.body.customer;
            let product: Product = req.body.product;

            resource = await this.service.create(new Order(order.breakPoint,order.orderNumber,customer,card,product));

        }else{
            resource = new MyResponse();
            resource.code = ResponseCode.ERROR;
            resource.message = ResponseMessage.SERVICE_NOT_FOUND;
        }
        
        res.send(resource)
    }

}