import { autoInjectable } from "tsyringe";
import OrderService from "../../test/services/order.service";
import BaseController from "./base.controller";
import MyResponse from "../../test/models/response";
import { Request, Response } from "express";
import { ResponseCode } from "../../test/enums/response.code";
import { ResponseMessage } from "../../test/enums/response.message";
import Order from "../../test/models/order";

@autoInjectable()
export default class OrderController extends BaseController{

    orderService : OrderService;

    constructor(service?: OrderService){
        super(service);
        this.orderService = service;
    }

    delete = async (req: Request, res: Response) => {
        let resource : MyResponse;
        
        let id : number = parseInt(req.params['id']);

        if(id){

            resource = await this.orderService.delete(id);

        }else{
            resource = new MyResponse();
            resource.code = ResponseCode.ERROR;
            resource.message = ResponseMessage.URL_PARAMETER_MISSING;
        }

        res.send(resource);
    }

}