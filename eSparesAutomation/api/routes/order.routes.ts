import { Router } from "express";
import OrderController from "../controllers/order.controller";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get("/", orderController.get);
orderRouter.post("/", orderController.post);
orderRouter.get("/:id", orderController.getById);
orderRouter.delete("/:id", orderController.delete);

export default orderRouter;