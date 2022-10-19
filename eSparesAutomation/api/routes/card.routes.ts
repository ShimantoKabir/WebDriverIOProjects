import { Router } from "express";
import CardController from "../controllers/card.controller";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.get("/", cardController.get);
cardRouter.post("/", cardController.post);
cardRouter.get("/:id", cardController.getById);

export default cardRouter;