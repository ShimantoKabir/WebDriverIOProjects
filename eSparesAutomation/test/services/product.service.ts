import Product from "../models/product";
import IProductService from "./iservices/iproduct.service";
import BaseService from "./base.service";

export default class ProductService extends BaseService<Product> implements IProductService {}