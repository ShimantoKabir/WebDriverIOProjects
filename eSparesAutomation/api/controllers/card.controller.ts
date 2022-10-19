import { autoInjectable } from "tsyringe";
import CardService from "../../test/services/card.service";
import BaseController from "./base.controller";

@autoInjectable()
export default class UserController extends BaseController{

    constructor(service?: CardService){
        super(service)
    }
}