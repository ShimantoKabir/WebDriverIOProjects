import Product from "../models/product";
import ProductService from "../services/product.service";
import { ResponseCode } from "../enums/response.code";
import Response from "../models/response";
import CookieComponent from "./componentobjects/cookie.component";
import HeaderMobileButtonComponent from "./componentobjects/header.mobile.button.component";
import BasketComponent from "./componentobjects/basket.component";
// @ts-ignore
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class BasketPage {

    urlMustContain: string = "basket";
    itemsSelector: string = "section.basket-items>article";
    itemNthSelector: string = "section.basket-items>article:nth-child";
    itemTitleSelector: string = "div.group-1>div.description>div>div.item-body>h2>a";
    itemStockNumberSelector: string = "div.group-1>div.description>div>div.item-body>p";
    itemPriceSelector: string = "div.group-1>div.price";
    checkoutBtnSelector: string = "div.checkout-top>form>button";
    mobileBasketCountdownSelector : string = "div.full-basket>div.basket-countdown-wrapper";
    nthItemToBeTest: number = 2;
    productService: ProductService;
    cookieComponent: CookieComponent;
    headerMobileButtonComponent : HeaderMobileButtonComponent;
    basketComponent: BasketComponent;

    constructor(productService: ProductService, 
        cookieComponent: CookieComponent, 
        headerMobileButtonComponent : HeaderMobileButtonComponent,
        basketComponent: BasketComponent) {
        this.productService = productService;
        this.cookieComponent = cookieComponent;
        this.headerMobileButtonComponent = headerMobileButtonComponent;
        this.basketComponent = basketComponent;
    }

    public get mobileBasketCountdown(){
        return $(this.mobileBasketCountdownSelector);
    }

    public scrollIntoMobileBasketCountdown(){
        return this.mobileBasketCountdown.scrollIntoView();
    }

    public get items() {
        return $(this.itemsSelector);
    }

    public getItemTitleByChild(childNumber: number) {
        return $(`${this.itemNthSelector}(${childNumber})>${this.itemTitleSelector}`).getText();
    }

    public getItemStockNumberByChild(childNumber: number) {
        return $(`${this.itemNthSelector}(${childNumber})>${this.itemStockNumberSelector}`).getText();
    }

    public getItemPriceByChild(childNumber: number) {
        return $(`${this.itemNthSelector}(${childNumber})>${this.itemPriceSelector}`).getText();
    }

    public get redirectToCheckoutLogin() {
        return $(this.checkoutBtnSelector).click();
    }

    public compareBasketNthProductWithStoredProduct = async (childNumber: number): Promise<boolean> => {

        let isEqual = false;
        let response: Response = await this.productService.sharedGet(this.productService.productDataKey);
        console.log("compareBasketNthProductWithStoredProduct=",response.product);

        if (response.code === ResponseCode.OK) {

            let product: Product = response.product;

            let basketProduct = new Product();

            basketProduct.title = await this.getItemTitleByChild(childNumber);
            basketProduct.price = await this.getItemPriceByChild(childNumber);
            basketProduct.stockNumber = await this.getItemStockNumberByChild(childNumber);

            isEqual = basketProduct.cleanBasketProduct(basketProduct).isEqual(product);
        }
        
        return isEqual;
    }

    public allowCookie() : void {
        this.cookieComponent.cookieAllowButton.click();
    }

    public compareMobileBasketNthProductWithStoredProduct = async (): Promise<boolean> => {

        let isEqual = false;
        let response: Response = await this.productService.sharedGet(this.productService.productDataKey);
        console.log("storedProduct=",response.product);
        await browser.pause(5000);

        if (response.code === ResponseCode.OK) {

            let product: Product = response.product;
            product.stockNumber = null;

            let basketProduct = new Product();

            basketProduct.title = await this.basketComponent.getItemTitle();
            basketProduct.price = await this.basketComponent.getItemPrice();
            basketProduct.stockNumber = null;

            let cleanProduct: Product = basketProduct.cleanTitle(basketProduct);
            console.log("cleanProduct=",cleanProduct);
            isEqual = cleanProduct.isEqual(product);
        }
        
        return isEqual;
    }
}