import AppConstant from "../utilities/app.constant";
import CheckoutProgressIndicator from "../pageobjects/componentobjects/checkout.progress.indicator";
import CardService from "../services/card.service";
import Card from '../models/card';
// @ts-ignore
import { autoInjectable } from 'tsyringe';
import Response from "../models/response";

@autoInjectable()
export default class CheckoutPaymentPage {

    urlMustContain: string = "payment";
    numberIframeIndex: number = 0;
    numberInputSelector: string = "#encryptedCardNumber";
    expiryDateIframeIndex: number = 1;
    expiryDateInputSelector: string = "#encryptedExpiryDate";
    securityCodeIframeIndex: number = 2;
    securityCodeInputSelector: string = "#encryptedSecurityCode";
    placeOrderButtonSelector: string = "button.adyen-checkout__button--pay";
    passwordIframeIndex: number = 0;
    passwordInputSelector: string = "input[name='answer']";
    okButtonSelector: string = "#buttonSubmit";
    dropInContainerSelector: string = "#dropin-container";
    card: Card = AppConstant.cards[0];
    cardService: CardService;

    checkoutProgressIndicator: CheckoutProgressIndicator;

    constructor(checkoutProgressIndicator: CheckoutProgressIndicator, cardService: CardService) {
        this.checkoutProgressIndicator = checkoutProgressIndicator;
        this.cardService = cardService;
    }

    public setCardNumber(number: string) {
        return $(this.numberInputSelector).setValue(number);
    }

    public setExpiryDate(expiryDate: string) {
        return $(this.expiryDateInputSelector).setValue(expiryDate);
    }

    public setSecurityCode(securityCode: string) {
        return $(this.securityCodeInputSelector).setValue(securityCode);
    }

    public clickPlaceOrderButton() {
        return $(this.placeOrderButtonSelector).click();
    }

    public setPassword(password: string) {
        return $(this.passwordInputSelector).setValue(password);
    }

    public clickOkButton() {
        return $(this.okButtonSelector).click();
    }

    public scrollIntoPlaceOrderButton() {
        return $(this.placeOrderButtonSelector).scrollIntoView();
    }

    public fillPaymentFromData = async (argv): Promise<void> => {

        if(argv.cardId){
            let cardRes: Response = await this.cardService.readById(argv.cardId,Card.name);
            this.card = cardRes.card;
            console.log("card=",this.card);
        }

        // @ts-ignore
        await browser.switchToFrame(this.numberIframeIndex);
        await browser.pause(2000);
        await this.setCardNumber(this.card.number);
        await browser.pause(2000);
        // @ts-ignore
        await browser.switchToParentFrame();
        // @ts-ignore
        await browser.switchToFrame(this.expiryDateIframeIndex);
        await browser.pause(2000);
        await this.setExpiryDate(this.card.expiryDate);
        await browser.pause(2000);
        // @ts-ignore
        await browser.switchToParentFrame();
        // @ts-ignore
        await browser.switchToFrame(this.securityCodeIframeIndex);
        await browser.pause(2000);
        await this.setSecurityCode(this.card.securityCode);
        await browser.pause(2000);
        // @ts-ignore
        await browser.switchToParentFrame();

        await browser.pause(2000);
        await this.scrollIntoPlaceOrderButton();
        await browser.pause(2000);
        await this.clickPlaceOrderButton();
        await browser.pause(3000);

        // @ts-ignore
        await browser.pause(2000);
        await browser.switchToFrame(this.passwordIframeIndex);
        await browser.pause(2000);
        await this.setPassword(this.card.password);
        await this.clickOkButton();
        // @ts-ignore
        await browser.switchToParentFrame();
    };


    public scrollIntoDropInContainer(){
        return $(this.dropInContainerSelector).scrollIntoView();
    }

}