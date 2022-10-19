import Order from "../../models/order";
import IBaseService from "./ibase.service";
import Response from "../../models/response";

export default interface IOrderService extends IBaseService<Order> {
    delete(id: number): Promise<Response>;
}