import Product from "../models/product";
import Helper from "../utilities/helper";
import AppConstant from "../utilities/app.constant";
import ProductService from "../services/product.service";
import Response from "../models/response";
import { ResponseCode } from "../enums/response.code";
// @ts-ignore
import { autoInjectable } from 'tsyringe';
import { DeviceBreakpoint } from "../enums/device.breakpoint";

@autoInjectable()
export default class ProductListingPage{

    urlMustContain: string = "search";
    productItemsSelector: string = "ul.product-listing>li";
    productItemNthSelector: string = "ul.product-listing>li:nth-child";
    productItemTitleSelector: string = "div.product-desktop>div.details>h2>a";
    mobileProductItemTitleSelector: string = "div.product-mobile>div.product-wrapper>div.details>h2";
    productItemStockNumberSelector: string = "div.product-desktop>div.buy>span";
    mobileProductItemStockNumberSelector: string = "div.product-mobile>div.product-wrapper>div.buy>span";
    productItemPriceSelector: string = "div.product-desktop>div.buy>div>span";
    mobileProductItemPriceSelector: string = "div.product-mobile>div.product-wrapper>div.buy>div>span";
    productItemBuyNowBtnSelector: string = "div.product-desktop>div.buy>div>form>button";
    mobileProductItemBuyNowBtnSelector: string = "div.product-mobile>div.buy-now>form>button";
    productMoreInfoSelector: string = "div.product-desktop>div.details>p:nth-child(3)>a";
    refineDropDownSelector: string = "div.refine>button";
    nthItemToBeTest: number = 1;

    productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public get productItems() {
        return $$(this.productItemsSelector);
    }

    public scrollIntoNthRefineDropDown(){
        return $(this.refineDropDownSelector).scrollIntoView();
    }

    public getProductItemTitleByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.productItemTitleSelector}`).getText();
    }

    public getMobileProductItemTitleByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.mobileProductItemTitleSelector}`).getText();
    }

    public getProductItemStockNumberByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.productItemStockNumberSelector}`).getText();
    }

    public getMobileProductItemStockNumberByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.mobileProductItemStockNumberSelector}`).getText();
    }

    public getProductItemPriceByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.productItemPriceSelector}`).getText();
    }

    public getMobileProductItemPriceByChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.mobileProductItemPriceSelector}`).getText();
    }

    public redirectBoughtTogetherFromNthChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.productItemBuyNowBtnSelector}`).click();
    }

    public mobileRedirectBoughtTogetherFromNthChild(childNumber: number) {
        return $(`${this.productItemNthSelector}(${childNumber})>${this.mobileProductItemBuyNowBtnSelector}`).click();
    }

    public collectAndSaveNthProduct = async (childNumber: number, deviceBreakpoint: DeviceBreakpoint): Promise<boolean> => {
        let isDataCollectedAndStored = false;

        let title = await this.getProductItemTitleByChild(childNumber);
        let stockNumber = await this.getProductItemStockNumberByChild(childNumber);
        let price = await this.getProductItemPriceByChild(childNumber);

        if(deviceBreakpoint === DeviceBreakpoint.MOBILE){
            title = await this.getMobileProductItemTitleByChild(childNumber);
            stockNumber = await this.getMobileProductItemStockNumberByChild(childNumber);
            price = await this.getMobileProductItemPriceByChild(childNumber);
        }

        console.log("title="+title+", stockNumber="+stockNumber+", price="+price);

        let product = new Product();
        product.title = Helper.removeWord(AppConstant.brands[0], Helper.removeSpace(title)).toLowerCase();
        product.stockNumber = Helper.removeWord(AppConstant.stockNumberPrefix, Helper.removeSpace(stockNumber)).toLowerCase();
        product.price = price;

        let response: Response = await this.productService.sharedSet(product);

        if (title && stockNumber && price && response.code === ResponseCode.OK) {
            isDataCollectedAndStored = true;
        }

        return isDataCollectedAndStored;
    }

    public checkProductOnStorage = async (): Promise<boolean> => {
        let isProductOnStore = false;

        // @ts-ignore
        let response: Response = await this.productService.sharedGet(this.productService.productDataKey);
        if (response.code = ResponseCode.OK) {
            if (response.product.title && response.product.stockNumber && response.product.price) {
                isProductOnStore = true;
            }
        }

        return isProductOnStore;
    }

    public scrollDownToNthProduct(nthProduct: number) {
        return $(`${this.productItemNthSelector}(${nthProduct})`).scrollIntoView();
    }

    public clickProductNthMoreInfoLink(nthProduct: number) {
        return $(`${this.productItemNthSelector}(${nthProduct})>${this.productMoreInfoSelector}`).click();
    }
}