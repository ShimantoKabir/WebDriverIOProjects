import 'reflect-metadata';
import HomePage from '../../pageobjects/home.page';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { DeviceBreakpoint } from '../../enums/device.breakpoint';
import AppConstant from '../../utilities/app.constant';
import CommonTest from '../common.test.e2e';
import ProductListingPage from '../../pageobjects/productlisting.page';
import BoughtTogetherPage from '../../pageobjects/boughttogether.page';
import BasketPage from '../../pageobjects/basket.page';
import CheckoutLoginPage from '../../pageobjects/checkout.login.page';
import DeliveryPostCodeLookupPage from '../../pageobjects/deliverypostcodelookup.page';
import DeliveryAddressPage from '../../pageobjects/deliveryaddress.page';
import CheckoutPaymentPage from '../../pageobjects/checkout.payment.page';
import CheckoutCompletePage from '../../pageobjects/checkout.complete.page';

// @ts-ignore
import { container } from 'tsyringe';

const argv = yargs(hideBin(process.argv)).argv;

let homePage: HomePage = container.resolve(HomePage);
let plp: ProductListingPage = container.resolve(ProductListingPage);
let boughtTogetherPage: BoughtTogetherPage = container.resolve(BoughtTogetherPage);
let basketPage: BasketPage = container.resolve(BasketPage);
let checkoutLoginPage: CheckoutLoginPage = container.resolve(CheckoutLoginPage);
let deliveryPostCodeLookupPage: DeliveryPostCodeLookupPage = container.resolve(DeliveryPostCodeLookupPage);
let deliveryAddressPage: DeliveryAddressPage = container.resolve(DeliveryAddressPage);
let checkoutPaymentPage: CheckoutPaymentPage = container.resolve(CheckoutPaymentPage);
let checkoutCompletePage : CheckoutCompletePage = container.resolve(CheckoutCompletePage);

describe('Guest checkout workflow test for [Mobile]', () => {

    it('should open the home page', async () => {
        await browser.url("/");
        await browser.setWindowSize(AppConstant.mobileMinWidth,AppConstant.mobileMinHeight);
        expect(browser).toHaveUrl(homePage.homePageUrl);
        await browser.pause(5000);
    });

    CommonTest.shouldHaveDataInCmdLineArgs(argv);

    CommonTest.shouldDeleteCookie();

    it('should open the mobile sidebar menu', async () => {
        await homePage.openOrCloseMobileSideMenu();
        await browser.pause(2000);
        let isNavInViewport = await homePage.sidenavComponent.checkTargetMenuTitle();
        
        // @ts-ignore
        await chaiExpect(isNavInViewport).to.equal(true);
    });

    CommonTest.redirectCookerHoodSparesMenu();

    CommonTest.redirectButtonAndSwitchesAndClick();

    CommonTest.shouldBeInPLPPage();

    CommonTest.shouldHaveProductsInPLP();

    it('should collect and store the nth product data', async () => {
        let isProductAvailable = await plp.productItems.length > 1 ? true : false;
        if (!isProductAvailable) {
            // @ts-ignore
            await chaiExpect(isProductAvailable).to.equal(false);
        } else {
            await plp.scrollIntoNthRefineDropDown();

            let isProductDateCollectedAndSaved = await plp.collectAndSaveNthProduct(plp.nthItemToBeTest, DeviceBreakpoint.MOBILE);
            //@ts-ignore
            await chaiExpect(isProductDateCollectedAndSaved).to.equal(true);
        }
    });

    CommonTest.shouldHaveProductOnStore();

    it('should redirect to bought together page', async () => {
        await plp.mobileRedirectBoughtTogetherFromNthChild(plp.nthItemToBeTest);
        await browser.pause(5000);
    });

    it('should be on the bought together page', async () => {
        expect(browser).toHaveUrlContaining(boughtTogetherPage.urlMustContain);
    });

    it('should redirect to basket page', async () => {
        await boughtTogetherPage.clickMobileViewBasketBtn();
        await browser.pause(5000);
    });

    it('should be on the basket page', async () => {
        expect(browser).toHaveUrlContaining(basketPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should allow the cookie and scroll into countdown', async () => {
        basketPage.allowCookie();
        await browser.pause(5000);
        await basketPage.scrollIntoMobileBasketCountdown();
        await browser.pause(5000);
    });

    it('should have products in the basket', async () => {
        await expect(basketPage.items).toHaveChildren({ gte: 1 });
    });

    it('should match the basket product with stored', async () => {
        await basketPage.headerMobileButtonComponent.clickMobileBasketButton();
        let isMatched = await basketPage.compareMobileBasketNthProductWithStoredProduct();
        // @ts-ignore
        await chaiExpect(isMatched).to.equal(true);
    });

    it('should redirect to checkout login page', async () => {
        await basketPage.basketComponent.clickCheckoutSecurelyBtn();
        expect(browser).toHaveUrlContaining(checkoutLoginPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should choose checkout as guest', async () => {
        await checkoutLoginPage.clickCheckoutAsGuestBtn();
        await browser.pause(5000);
    });

    it('should fetch email from db and set it to email input', async () => {
        let isSet = await checkoutLoginPage.setEmailToInput(argv);
        // @ts-ignore
        await chaiExpect(isSet).to.equal(true);
        await browser.pause(5000);
    });

    it('should redirect to the checkout delivery post code lookup page', async () => {
        await checkoutLoginPage.redirectToDeliveryPostCodeLookup(DeviceBreakpoint.MOBILE);
        expect(browser).toHaveUrlContaining(deliveryPostCodeLookupPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should fill up delivery post code lookup form and submit', async () => {
        await deliveryPostCodeLookupPage.scrollIntoTitle();
        await browser.pause(5000);
        let isFilledUp = await deliveryPostCodeLookupPage.fillUpDeliveryPostCodeLookupFormAndSubmit(argv);
        // @ts-ignore
        await chaiExpect(isFilledUp).to.equal(true);
    });

    it('should submit the delivery post code lookup form', async () => {
        await deliveryPostCodeLookupPage.scrollToFindYourAddressBtn();
        deliveryPostCodeLookupPage.submitDeliveryPostCodeLookupForm(DeviceBreakpoint.MOBILE);
        await browser.pause(5000);
    });

    it('should in the delivery address page', async () => {
        expect(browser).toHaveUrlContaining(deliveryAddressPage.urlMustContain);
        await browser.pause(3000);
    });

    it('should data yet be available in the form', async () => {
        await deliveryAddressPage.scrollIntoStateFromInput();
        await browser.pause(3000);
        let isAvailable = await deliveryAddressPage.checkFormDataAvailability(argv);
        // @ts-ignore
        await chaiExpect(isAvailable).to.equal(true);
    });

    it('should click delivery address button', async () => {
        await deliveryAddressPage.clickDeliverToAddressButton();
        await browser.pause(3000);
    });

    it('should in the checkout payment page', async () => {
        expect(browser).toHaveUrlContaining(checkoutPaymentPage.urlMustContain);
        await browser.pause(3000);
    });

    it('should complete the payment successfully', async () => {
        await checkoutPaymentPage.scrollIntoDropInContainer();
        await checkoutPaymentPage.fillPaymentFromData(argv);
        await browser.pause(10000);
    });

    it('should in the checkout complete page', async () => {
        expect(browser).toHaveUrlContaining(checkoutCompletePage.urlMustContain);
        await browser.pause(3000);
    });

    it('should extract order number and save the details', async () => {
        let isOpDone = await checkoutCompletePage.extractOrderNumberAndSaveDetails(argv, DeviceBreakpoint.MOBILE);
        // @ts-ignore
        await chaiExpect(isOpDone).to.equal(true);
    });

});
