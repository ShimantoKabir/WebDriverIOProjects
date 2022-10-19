import Helper from '../utilities/helper';
import Product from "../models/product";
import AppConstant from "../utilities/app.constant";
import ProductService from "../services/product.service";
import { ResponseCode } from "../enums/response.code";
import Response from "../models/response";
// @ts-ignore
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class BoughtTogetherPage {

    urlMustContain = "boughttogether";
    justAddedProductTitleSelector = "div.item-body>a";
    justAddedProductPriceSelector = "div.item-body>p>span";
    checkoutNowSelector = "div.col-basket.not-mobile>div>a";
    mobileViewBasketBtnSelector = "#in-the-bag>a[href='/basket']";
    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public get mobileViewBasketBtn(){
        return $(this.mobileViewBasketBtnSelector);
    }

    public clickMobileViewBasketBtn(){
        return this.mobileViewBasketBtn.click();
    }

    public getJustAddedProductTitle() {
        return $(this.justAddedProductTitleSelector).getText();
    }

    public getJustAddedProductPrice() {
        return $(this.justAddedProductPriceSelector).getText();
    }

    public redirectToBasketPage() {
        return $(this.checkoutNowSelector).click();
    }

    public compareJustAddedProductWithStoredProduct = async (): Promise<boolean> => {
        let isEqual = false;

        let response: Response = await this.productService.sharedGet(this.productService.productDataKey);

        if (response.code === ResponseCode.OK) {

            let product: Product = response.product;
            product.stockNumber = null;

            let justAddedProduct = new Product();

            justAddedProduct.title = await this.getJustAddedProductTitle();
            justAddedProduct.price = await this.getJustAddedProductPrice();
            justAddedProduct.stockNumber = null;

            isEqual = justAddedProduct.cleanTitle(justAddedProduct).isEqual(product);
        }

        return isEqual;
    }

}