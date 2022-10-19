import Customer from "../../models/customer";
import Response from "../../models/response";
import IBaseService from "./ibase.service";

export default interface ICustomerService extends IBaseService<Customer>{
    update(customer: Customer): Promise<Response>;
}