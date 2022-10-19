import Helper from "../utilities/helper";
import AppConstant from "../utilities/app.constant";

export default class Product {

    price: string;
    stockNumber: string;
    title: string;

    isEqual(product: Product): boolean
    {
        let isMatched = false;
        if (this.title === product.title
            && this.stockNumber === product.stockNumber
            && this.price === product.price) {
            isMatched = true;
        }
        return isMatched;
    };

    public cleanTitle(product: Product): Product
    {
        product.title = Helper.removeSpace(product.title).toLowerCase();
        return product;
    }

    public cleanBasketProduct(product: Product): Product
    {
        product.title = Helper.removeSpace(product.title).toLowerCase();
        product.stockNumber = Helper.removeWord(AppConstant.basketStockNumberPrefix, Helper.removeSpace(product.stockNumber)).toLowerCase();
        product.price = Helper.removeSpace(product.price).toLowerCase();
        return product;
    }
}