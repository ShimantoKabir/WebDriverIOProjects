import Order from "../models/order";
import BaseService from "./base.service";
import IOrderService from "./iservices/iorder.service";
import Response from "../models/response";
import { ResponseCode } from "../enums/response.code";
import { ResponseMessage } from "../enums/response.message";
import { AppDataSource } from "../data.source";
import OrderEntity from "../entities/order.entity";

export default class OrderService extends BaseService<Order> implements IOrderService{

    async delete(id: number): Promise<Response> {

        let response = new Response();
        try {
            await AppDataSource.getRepository(OrderEntity).delete(id);
            response.code = ResponseCode.OK;
            response.message = ResponseMessage.OK;
        } catch (e) {
            response.code = ResponseCode.ERROR;
            response.message = e.message;
        }
        
        return response;

    }

}