import AppConstant from "../utilities/app.constant";
import CheckoutProgressIndicator from "../pageobjects/componentobjects/checkout.progress.indicator";
import CustomerService from "../services/customer.service";
import Customer from "../models/customer";
import Response from "../models/response";
import { DeviceBreakpoint } from "../enums/device.breakpoint";
// @ts-ignore
import { autoInjectable } from 'tsyringe';
import CookieComponent from "./componentobjects/cookie.component";

@autoInjectable()
export default class CheckoutLoginPage {

    urlMustContain: string = "checkout";
    checkedRadioClassName: string = "checked";
    guestRadioLabelSelector: string = "div.login-option-guest>label"
    guestRadioDivSelector: string = `${this.guestRadioLabelSelector}>div`;
    emailInputSelector: string = "#EmailAddress";
    desktopContinueBtnSelector: string = "button.desktop-continue";
    tabletContinueBtnSelector: string = "button.non-desktop-continue";
    checkoutAsGuestSelector: string = "div.guest";
    checkoutProgressIndicator: CheckoutProgressIndicator;
    customerService : CustomerService;
    cookieComponent: CookieComponent;

    constructor(checkoutProgressIndicator: CheckoutProgressIndicator, cookieComponent: CookieComponent, customerService : CustomerService) {
        this.checkoutProgressIndicator = checkoutProgressIndicator;
        this.customerService = customerService;
        this.cookieComponent = cookieComponent;
    }

    public get checkoutAsGuestBtn(){
        return $(this.checkoutAsGuestSelector);
    }

    public clickCheckoutAsGuestBtn(){
        return this.checkoutAsGuestBtn.click();
    }

    public allowCookie() {
        this.cookieComponent.cookieAllowButton.click();
    }

    public get guestRadioDiv() {
        return $(this.guestRadioDivSelector);
    }

    public get guestRadioLabel() {
        return $(this.guestRadioLabelSelector);
    }

    public clickGuestRadioButton(){
        return this.guestRadioLabel.click();
    }

    public getEmailFromInput() {
        return $(this.emailInputSelector).getValue();
    }

    public setEmailToInput = async (argv): Promise<boolean> => {

        let isSet = false;

        let email = AppConstant.correctEmails[0];

        if(argv.customerId){
            let customerRes: Response = await this.customerService.readById(argv.customerId, Customer.name);
            console.log("customerRes=",customerRes);
            email = customerRes.customer.email;
            console.log("customerRes=",email);
            isSet = true;
        }

        await $(this.emailInputSelector).setValue(email);

        return isSet;
    }

    public redirectToDeliveryPostCodeLookup(deviceBreakpoint: DeviceBreakpoint) {
        if(deviceBreakpoint === DeviceBreakpoint.DESKTOP || deviceBreakpoint === DeviceBreakpoint.MOBILE){
            return $(this.desktopContinueBtnSelector).click();
        }else if(deviceBreakpoint === DeviceBreakpoint.TABLET){
            return $(this.tabletContinueBtnSelector).click();
        }
    }

    public checkEmailAvailabilityAndCompareWithTheMockData = async (argv): Promise<boolean> => {
        // @ts-ignore
        let isAvailableMatched = false;

        let email = await this.getEmailFromInput();

        if(email && argv.customerId){
            let customerRes: Response = await this.customerService.readById(argv.customerId, Customer.name);
            if(email = customerRes.customer.email){
                isAvailableMatched = true;
            }
        }

        return isAvailableMatched;
    }
}