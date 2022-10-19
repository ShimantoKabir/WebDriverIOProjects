import Helper from "../utilities/helper";
import AppConstant from "../utilities/app.constant";
import Product from "../models/product";
import DeliveryPostCodeLookupPage from "./deliverypostcodelookup.page";
import Customer from '../models/customer';
import FooterComponent from "../pageobjects/componentobjects/footer.component";
import CookieComponent from "../pageobjects/componentobjects/cookie.component";

// @ts-ignore
import { autoInjectable } from 'tsyringe';
import CustomerService from "../services/customer.service";
import { ResponseCode } from "../enums/response.code";

@autoInjectable()
export default class DeliveryAddressPage {

    urlMustContain: string = "deliveryaddress";
    deliverToAddressBtnSelector: string = "button.btn-large";
    cityInputSelector: string = "#City";
    stateInputSelector: string = "#State";
    addressLineOneSelector: string = "#AddressLine1";
    addressLineTwoSelector: string = "#AddressLine2";
    deliveryPostCodeLookupPage: DeliveryPostCodeLookupPage;
    footerComponent: FooterComponent;
    cookieComponent: CookieComponent;
    customerService: CustomerService;

    constructor(
        deliveryPostCodeLookupPage: DeliveryPostCodeLookupPage,
        footerComponent: FooterComponent,
        cookieComponent: CookieComponent,
        customerService: CustomerService
    ) {
        this.deliveryPostCodeLookupPage = deliveryPostCodeLookupPage;
        this.footerComponent = footerComponent;
        this.cookieComponent = cookieComponent;
        this.customerService = customerService;
    }

    public allowCookie() {
        this.cookieComponent.cookieAllowButton.click();
    }

    public clickDeliverToAddressButton() {
        return $(this.deliverToAddressBtnSelector).click();
    }

    public getCityFromInput() {
        return $(this.cityInputSelector).getValue();
    }

    public getStateFromInput() {
        return $(this.stateInputSelector).getValue();
    }

    public scrollIntoStateFromInput() {
        return $(this.stateInputSelector).scrollIntoView();
    }

    public scrollIntoAddressLineOne(){
        return $(this.addressLineOneSelector).scrollIntoView();
    }

    public getAddressLineOneFromInput() {
        return $(this.addressLineOneSelector).getValue();
    }

    public getAddressLineTwoFromInput() {
        return $(this.addressLineTwoSelector).getValue();
    }

    public checkFormDataAvailability = async (argv): Promise<boolean> => {
        let isAvailable: boolean = false;

        let title = await this.deliveryPostCodeLookupPage.getTitleFromDropdown();
        let firstName = await this.deliveryPostCodeLookupPage.getFirstNameFromInput();
        let lastName = await this.deliveryPostCodeLookupPage.getLastNameFromInput();
        let phoneNumber = await this.deliveryPostCodeLookupPage.getPhoneNumberFromInput();
        let country = await this.deliveryPostCodeLookupPage.getCountryFromDropdown();
        let postCode = await this.deliveryPostCodeLookupPage.getPostCodeFromInput();
        let city = await this.getCityFromInput();
        let state = await this.getStateFromInput();
        let addressOne = await this.getAddressLineOneFromInput();
        let addressTwo = await this.getAddressLineTwoFromInput();

        if (title && firstName && lastName && phoneNumber && country && postCode && addressOne && addressTwo) {

            let customer: Customer;

            let customerDBRes = await this.customerService.readById(argv.customerId,Customer.name);

            if(customerDBRes.code = ResponseCode.OK){
                customer = customerDBRes.customer;
                customer.city = city;
                customer.state = state;
                customer.addressOne = addressOne;
                customer.addressTwo = addressTwo;
                await this.customerService.update(customer);
            }
            
            await this.customerService.sharedSet(customer);
            console.log("DeliveryAddressPageCustomer=",customer);

            isAvailable = true;
        }

        return isAvailable;
    };

}