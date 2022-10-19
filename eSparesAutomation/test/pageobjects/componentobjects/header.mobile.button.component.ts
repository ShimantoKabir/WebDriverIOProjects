export default class HeaderMobileButtonComponent {

    menuButtonSelector: string;
    basketButtonSelector: string;

    constructor() {
        this.menuButtonSelector = "div.mobile-only>ul>li.mobile-nav-toggle>button";
        this.basketButtonSelector = "#my-basket-holder-mobile";
    }

    public get mobileMenuButton() {
        return $(this.menuButtonSelector);
    }

    public get mobileBasketButton(){
        return $(this.basketButtonSelector);
    }

    public clickMobileBasketButton(){
        return this.mobileBasketButton.click();
    }
}