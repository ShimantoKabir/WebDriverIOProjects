import ProductService from "../services/product.service";
import Product from "../models/product";
import Helper from "../utilities/helper";
import Response from "../models/response";
import { ResponseCode } from "../enums/response.code";
// @ts-ignore
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class ProductDetailPage {

    urlMustContain: string = "product";
    titleSelector: string = "div.col-content>h1>span";
    stockNumberSelector: string = "div.col-content>h1>small>span";
    priceAndCurrencySelector: string = "div.basket-related.add-item>div.price-large>span:nth-child";
    buyNowButtonSelector: string = "div.quantity-required>form>button";

    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public get scrollToTitle() {
        return $(this.titleSelector).scrollIntoView();
    }

    public get title() {
        return $(this.titleSelector).getText();
    }

    public get stockNumber() {
        return $(this.stockNumberSelector).getText();
    }

    public get price() {
        return $(`${this.priceAndCurrencySelector}(1)`).getText();
    }

    public get currency() {
        return $(`${this.priceAndCurrencySelector}(2)`).getText();
    }

    public get clickBuyNowButton() {
        return $(this.buyNowButtonSelector).click();
    }

    public collectProductData = async (): Promise<Product> => {
        let product = new Product();

        let title = await this.title;
        let stockNumber = await this.stockNumber;
        let price = await this.price;
        let currency = await this.currency;

        if (title && stockNumber && price) {
            product.title = Helper.removeSpace(title).toLowerCase();
            product.stockNumber = stockNumber.toLowerCase();
            product.price = price.toLowerCase() + currency.toLowerCase();
        } else {
            product = null;
        }

        return product;
    }

    public compareCollectProductWithStore = async (): Promise<boolean> => {
        let isMatched: boolean = false;

        let collectedProduct: Product = await this.collectProductData();
        let response: Response = await this.productService.sharedGet(this.productService.productDataKey);

        if (collectedProduct !== null && response.code === ResponseCode.OK && collectedProduct.isEqual(response.product)) {
            isMatched = true;
        }

        return isMatched;
    }
}
