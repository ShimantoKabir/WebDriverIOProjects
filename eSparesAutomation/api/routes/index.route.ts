import { Router } from "express";
import cardRouter from "./card.routes";
import customerRouter from "./customer.routes";
import orderRouter from "./order.routes";

const router = Router()

router.use("/card", cardRouter);
router.use("/customer", customerRouter);
router.use("/order",orderRouter);

export default router;