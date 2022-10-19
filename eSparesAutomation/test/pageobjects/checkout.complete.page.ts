import Helper from "../utilities/helper";
import AppConstant from "../utilities/app.constant";
import Product from "../models/product";
import DeliveryPostCodeLookupPage from "./deliverypostcodelookup.page";
import Customer from '../models/customer';
import Card from '../models/card';
// @ts-ignore
import { autoInjectable } from 'tsyringe';
import CardService from "../services/card.service";
import CustomerService from "../services/customer.service";
import OrderService from "../services/order.service";
import ProductService from "../services/product.service";
import BaseService from "../services/base.service";
import Response from "../models/response";
import Order from "../models/order";
import { ResponseCode } from "../enums/response.code";
import { DeviceBreakpoint } from "../enums/device.breakpoint";

@autoInjectable()
export default class CheckoutCompletePage {

    urlMustContain: string = "complete";
    orderNumberSelector: string = "#checkout-status>h2";
    cardService : CardService;
    customerService: CustomerService;
    orderService: OrderService;
    productService: ProductService;

    constructor(
        cardService : CardService,
        customerService: CustomerService,
        orderService: OrderService,
        productService: ProductService
    ){
        this.cardService = cardService;
        this.customerService = customerService;
        this.orderService = orderService;
        this.productService = productService;
    }

    public getOrderNumber(){
        return $(this.orderNumberSelector).getText();
    }

    public extractOrderNumberAndSaveDetails = async (argv, deviceBreakpoint: DeviceBreakpoint): Promise<boolean> => {

        let isOpDone: boolean = false;
        let orderNumber: string = await this.getOrderNumber();
        orderNumber = Helper.removeWord(AppConstant.orderNumberPrefix,Helper.removeSpace(orderNumber));
        console.log("orderNumber=",orderNumber);

        let productSharedRes: Response = await this.productService.sharedGet(this.productService.productDataKey);
        console.log("productRes=",productSharedRes);

        let cardDBRes : Response = await this.cardService.readById(argv.cardId, Card.name);
        let customerDBRes: Response = await this.customerService.readById(argv.customerId, Customer.name);

        let order: Order = new Order();
        order.breakPoint = DeviceBreakpoint[deviceBreakpoint];
        order.orderNumber = orderNumber;
        order.card = cardDBRes.card;
        order.customer = customerDBRes.customer;
        order.product = productSharedRes.product;

        console.log("orderComplete=",order);
        
        let orderDbRes = await this.orderService.create(order);

        if(orderDbRes.code === ResponseCode.OK){
            isOpDone = true;
        }

        return isOpDone;
    }

}