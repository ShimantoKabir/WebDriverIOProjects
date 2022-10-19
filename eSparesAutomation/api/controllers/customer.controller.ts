import { autoInjectable } from "tsyringe";
import CustomerService from "../../test/services/customer.service";
import BaseController from "./base.controller";
import MyResponse from "../../test/models/response";
import { Request, Response } from "express";
import Customer from "../../test/models/customer";
import { ResponseCode } from "../../test/enums/response.code";
import { ResponseMessage } from "../../test/enums/response.message";

@autoInjectable()
export default class CustomerController extends BaseController{
    
    customerService: CustomerService;

    constructor(service?: CustomerService){
        super(service);
        this.customerService = service;
    }

    put = async (req: Request, res: Response) => {
        let resource : MyResponse;

        let id : number = parseInt(req.params['id']);
        let customer: Customer = req.body;

        if(id){

            let sCustomer: Customer = new Customer(
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
            );

            sCustomer.id = id;

            resource = await this.customerService.update(sCustomer);

        }else{
            resource = new MyResponse();
            resource.code = ResponseCode.ERROR;
            resource.message = ResponseMessage.FIELD_MISSING;
        }

        res.send(resource);
    }

}