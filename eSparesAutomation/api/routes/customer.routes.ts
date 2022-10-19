import { Router } from "express";
import CustomerController from "../controllers/customer.controller";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", customerController.get);
customerRouter.post("/", customerController.post);
customerRouter.put("/:id", customerController.put);
customerRouter.get("/:id", customerController.getById);

export default customerRouter;