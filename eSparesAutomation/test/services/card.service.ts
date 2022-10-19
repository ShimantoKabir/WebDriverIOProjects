import Card from "../models/card";
import BaseService from "./base.service";
import ICardService from "./iservices/icard.service";

export default class CardService extends BaseService<Card> implements ICardService{}