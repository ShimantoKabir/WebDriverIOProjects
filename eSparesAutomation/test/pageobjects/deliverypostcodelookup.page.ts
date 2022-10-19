import AppConstant from "../utilities/app.constant";
import CheckoutProgressIndicator from "../pageobjects/componentobjects/checkout.progress.indicator";
import CustomerService from "../services/customer.service";
// @ts-ignore
import { autoInjectable } from 'tsyringe';
import Customer from "../models/customer";
import Response from "../models/response";
import { DeviceBreakpoint } from "../enums/device.breakpoint";

@autoInjectable()
export default class DeliveryPostCodeLookupPage {

    urlMustContain: string = "deliverypostcodelookup";
    titleDropdownSelector: string = "#Honorific_Predefined";
    firstNameInputSelector: string = "#FirstName";
    lastNameInputSelector: string = "#LastName";
    phoneNumberInputSelector: string = "#PhoneNumber";
    countryDropdownSelector: string = "#Country";
    houseNumberSelector: string = "#HouseNumber";
    postCodeSelector: string = "#Postcode";
    findYourAddressBtnSelector: string = "input.desktop-postcode-submit";
    tabletFindYourAddressBtnSelector: string = "div.form-group.submit>div>input";
    deliveryTitleMobileSelector: string = "h2.delivery-title-mobile";

    customerService: CustomerService;
    checkoutProgressIndicator: CheckoutProgressIndicator;   

    constructor(customerService: CustomerService, checkoutProgressIndicator: CheckoutProgressIndicator) {
        this.customerService = customerService;
        this.checkoutProgressIndicator = checkoutProgressIndicator;
    }

    public get deliveryTitleMobile(){
        return $(this.deliveryTitleMobileSelector);
    }

    public scrollIntoDeliveryTitleMobile(){
        return this.deliveryTitleMobile.scrollIntoView();
    }

    public selectTitle(title: string) {
        $(this.titleDropdownSelector).selectByAttribute('value', title);
    }

    public getTitleFromDropdown() {
        return $(this.titleDropdownSelector).getValue();
    }

    public setFirstNameToInput(firstName: string) {
        $(this.firstNameInputSelector).setValue(firstName);
    }

    public getFirstNameFromInput() {
        return $(this.firstNameInputSelector).getValue();
    }

    public setLastNameToInput(lastName: string) {
        $(this.lastNameInputSelector).setValue(lastName);
    }

    public getLastNameFromInput() {
        return $(this.lastNameInputSelector).getValue();
    }

    public setPhoneNumberToInput(phoneNumber: string) {
        $(this.phoneNumberInputSelector).setValue(phoneNumber);
    }

    public getPhoneNumberFromInput() {
        return $(this.phoneNumberInputSelector).getValue();
    }

    public scrollIntoTitle(){
        return $(this.titleDropdownSelector).scrollIntoView();
    }

    public selectCountry(country: string) {
        $(this.countryDropdownSelector).selectByAttribute('value', country);
    }

    public getCountryFromDropdown() {
        return $(this.countryDropdownSelector).getValue();
    }

    public setHouseNumberToInput(houseNumber: string) {
        $(this.houseNumberSelector).setValue(houseNumber);
    }

    public getHouseNumberFromInput() {
        return $(this.houseNumberSelector).getValue();
    }

    public setPostCodeToInput(postCode: string) {
        $(this.postCodeSelector).setValue(postCode);
    }

    public getPostCodeFromInput() {
        return $(this.postCodeSelector).getValue();
    }

    public submitDeliveryPostCodeLookupForm(deviceBreakpoint: DeviceBreakpoint) {
        if(deviceBreakpoint === DeviceBreakpoint.DESKTOP || deviceBreakpoint === DeviceBreakpoint.MOBILE){
            $(this.findYourAddressBtnSelector).click();
        }else if(deviceBreakpoint === DeviceBreakpoint.TABLET){
            $(this.tabletFindYourAddressBtnSelector).click();
        }
    }

    public scrollToFindYourAddressBtn(){
        return $(this.postCodeSelector).scrollIntoView();
    }
        
    public fillUpDeliveryPostCodeLookupFormAndSubmit = async (argv): Promise<boolean> => {

        let isFilledUp : boolean = false;

        try {
         
            let customer: Customer = AppConstant.customers[0];

            if(argv.customerId){
                let customerRes: Response = await this.customerService.readById(argv.customerId, Customer.name);
                customer = customerRes.customer;
                
                this.selectTitle(customer.title);
                this.setFirstNameToInput(customer.firstName);
                this.setLastNameToInput(customer.lastName);
                this.setPhoneNumberToInput(customer.phoneNumber);
                this.selectCountry(customer.country);
                this.setPostCodeToInput(customer.postCode);
                this.setHouseNumberToInput(customer.houseNumber);
                console.log("DeliveryPostCodeLookupPageCustomer=",customer.postCode);
                isFilledUp = true;
            }

            await browser.pause(5000);
            
        } catch (e) {
            console.log("DeliveryPostCodeLookupPageError=",e);
        }

        return isFilledUp;
    }
}