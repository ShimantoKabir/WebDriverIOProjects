import Customer from "../models/customer";
import ICustomerService from "./iservices/icustomer.service"
import BaseService from "./base.service";
import { AppDataSource } from "../data.source";
import CustomerEntity from "../entities/customer.entity";
import Response from "../models/response";
import { ResponseCode } from "../enums/response.code";
import { ResponseMessage } from "../enums/response.message";

export default class CustomerService extends BaseService<Customer> implements ICustomerService {

    async update(customer: Customer): Promise<Response> {

        let response = new Response();
        try {
            await AppDataSource.getRepository(CustomerEntity).update(customer.id,customer);
            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;
        } catch (e) {
            response.code = ResponseCode.ERROR;
            response.message = e.message;
        }
        
        return response;

    }
}