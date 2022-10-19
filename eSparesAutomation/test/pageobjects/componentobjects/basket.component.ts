export default class BasketComponent {

    itemTitleSelector: string = "div.bor-item-details-container>a";
    itemPriceSelector: string = "div.bor-item-details-container>span";
    checkoutSecurelyBtnSelector: string = "div.bor-checkout-buttons>form>button";

    public get itemTitle(){
        return $(this.itemTitleSelector);
    }

    public getItemTitle(){
        return this.itemTitle.getText();
    }

    public get itemPrice(){
        return $(this.itemPriceSelector);
    }

    public getItemPrice(){
        return this.itemPrice.getText();
    }

    public get checkoutSecurelyBtn(){
        return $(this.checkoutSecurelyBtnSelector);
    }

    public clickCheckoutSecurelyBtn(){
        return this.checkoutSecurelyBtn.click();
    }

}