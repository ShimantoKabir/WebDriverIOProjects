import 'reflect-metadata';
import HomePage from '../../pageobjects/home.page';
import ProductListingPage from '../../pageobjects/productlisting.page';
import ProductDetailPage from '../../pageobjects/product.detail.page';
import AppConstant from '../../utilities/app.constant';
import CommonTest from "../common.test.e2e";
import Product from "../../models/product";
import BoughtTogetherPage from '../../pageobjects/boughttogether.page';
import BasketPage from '../../pageobjects/basket.page';
import CheckoutLoginPage from '../../pageobjects/checkout.login.page';
import DeliveryAddressPage from '../../pageobjects/deliveryaddress.page';
import DeliveryPostCodeLookupPage from '../../pageobjects/deliverypostcodelookup.page';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// @ts-ignore
import { container } from 'tsyringe';
import { DeviceBreakpoint } from '../../enums/device.breakpoint';
import CheckoutPaymentPage from '../../pageobjects/checkout.payment.page';
import CheckoutCompletePage from '../../pageobjects/checkout.complete.page';

const argv = yargs(hideBin(process.argv)).argv;

let homePage: HomePage = container.resolve(HomePage);
let plp: ProductListingPage = container.resolve(ProductListingPage);
let pdp: ProductDetailPage = container.resolve(ProductDetailPage);
let boughtTogetherPage: BoughtTogetherPage = container.resolve(BoughtTogetherPage);
let basketPage: BasketPage = container.resolve(BasketPage);
let checkoutLoginPage: CheckoutLoginPage = container.resolve(CheckoutLoginPage);
let deliveryAddressPage: DeliveryAddressPage = container.resolve(DeliveryAddressPage);
let deliveryPostCodeLookupPage: DeliveryPostCodeLookupPage = container.resolve(DeliveryPostCodeLookupPage);
let checkoutPaymentPage: CheckoutPaymentPage = container.resolve(CheckoutPaymentPage);
let checkoutCompletePage : CheckoutCompletePage = container.resolve(CheckoutCompletePage);

describe('Guest checkout workflow test for [Tablet]', () => {
    it('should open the home page', async () => {
        await browser.url("/");
        await browser.setWindowSize(AppConstant.tabletMaxWidth, AppConstant.tabletMinHeight);
        await expect(browser).toHaveUrl(homePage.homePageUrl);
    });

    CommonTest.shouldDeleteCookie();

    it('should open the tablet sidebar menu', async () => {
        await homePage.openOrCloseSideMenu();
        await browser.pause(2000);
        let isNavInViewport = await homePage.sidenavComponent.checkTargetMenuTitle();
        
        // @ts-ignore
        await chaiExpect(isNavInViewport).to.equal(true);
    });

    CommonTest.redirectCookerHoodSparesMenu();

    CommonTest.redirectButtonAndSwitchesAndClick();

    CommonTest.shouldBeInPLPPage();

    CommonTest.shouldHaveProductsInPLP();

    CommonTest.shouldCollectAndStoreNthProduct(DeviceBreakpoint.TABLET);

    CommonTest.shouldHaveProductOnStore();

    CommonTest.shouldScrollDownToNthProduct();

    it('should click the nth product more info link', async () => {
        await browser.pause(3000);
        await plp.clickProductNthMoreInfoLink(plp.nthItemToBeTest);
    });

    it('should be on the product details page', async () => {
        await expect(browser).toHaveUrlContaining(pdp.urlMustContain);
    });

    it('should scroll to the title', async () => {
        await pdp.scrollToTitle;
        await browser.pause(5000);
    });

    it('should collect product data', async () => {
        let isCollected: boolean = false;
        let product: Product = await pdp.collectProductData();

        if (product !== null) {
            isCollected = true;
        }

        // @ts-ignore
        await chaiExpect(isCollected).to.equal(true);
        await browser.pause(5000);
    });

    it('should match the collected product with the stored product', async () => {
        let isMatched = await pdp.compareCollectProductWithStore();
        // @ts-ignore
        await chaiExpect(isMatched).to.equal(true);
        await browser.pause(5000);
    });

    it('should click the buy now button', async () => {
        await pdp.clickBuyNowButton;
        await browser.pause(5000);
    });

    it('should be on the bought together page', async () => {
        await expect(browser).toHaveUrlContaining(boughtTogetherPage.urlMustContain);
    });

    CommonTest.shouldMatchJustAddedProductWithStored();

    it('should redirect to the basket page', async () => {
        await boughtTogetherPage.redirectToBasketPage();
        expect(browser).toHaveUrlContaining(basketPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should have products in the basket', async () => {
        await expect(basketPage.items).toHaveChildren({ gte: 1 });
    });

    it('should match the basket product with stored', async () => {
        let isMatched = await basketPage.compareBasketNthProductWithStoredProduct(basketPage.nthItemToBeTest);
        // @ts-ignore
        await chaiExpect(isMatched).to.equal(true);
    });

    it('should redirect to the checkout login page', async () => {
        await basketPage.redirectToCheckoutLogin;
        expect(browser).toHaveUrlContaining(checkoutLoginPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should be in the checkout first step', async () => {
        await expect(checkoutLoginPage.checkoutProgressIndicator.checkoutFirstStep)
            .toHaveElementClass(checkoutLoginPage.checkoutProgressIndicator.checkoutCurrentStepClassName);
    });

    it('should fetch email from db and set it to email input', async () => {
        let isSet = await checkoutLoginPage.setEmailToInput(argv);
        // @ts-ignore
        await chaiExpect(isSet).to.equal(true);
        await browser.pause(5000);
    });

    it('should allow the cookie', async () => {
        checkoutLoginPage.allowCookie();
        await browser.pause(5000);
    });

    it('should click the guest radio button', async () => {
        await checkoutLoginPage.clickGuestRadioButton();
        await browser.pause(5000);
    });

    it('should be selected as a guest', async () => {
        await expect(checkoutLoginPage.guestRadioDiv).toHaveElementClass(checkoutLoginPage.checkedRadioClassName);
    });

    it('should email available on the input and match with the db mock data', async () => {
        let isAvailableMatched = await checkoutLoginPage.checkEmailAvailabilityAndCompareWithTheMockData(argv);
        // @ts-ignore
        await chaiExpect(isAvailableMatched).to.equal(true);
    });

    it('should redirect to the checkout delivery post code lookup page', async () => {
        await checkoutLoginPage.redirectToDeliveryPostCodeLookup(DeviceBreakpoint.TABLET);
        expect(browser).toHaveUrlContaining(deliveryPostCodeLookupPage.urlMustContain);
        await browser.pause(5000);
    });

    it('should be in the checkout second step', async () => {
        await expect(deliveryPostCodeLookupPage.checkoutProgressIndicator.checkoutSecondStep)
            .toHaveElementClass(deliveryPostCodeLookupPage.checkoutProgressIndicator.checkoutCurrentStepClassName);
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
        deliveryPostCodeLookupPage.submitDeliveryPostCodeLookupForm(DeviceBreakpoint.TABLET);
    });

    it('should in the delivery address page', async () => {
        expect(browser).toHaveUrlContaining(deliveryAddressPage.urlMustContain);
        await browser.pause(3000);
    });

    it('should data yet be available in the form', async () => {
        await deliveryAddressPage.scrollIntoAddressLineOne();
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

    it('should be in the checkout third step', async () => {
        await expect(checkoutPaymentPage.checkoutProgressIndicator.checkoutThirdStep)
            .toHaveElementClass(checkoutPaymentPage.checkoutProgressIndicator.checkoutCurrentStepClassName);
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
        let isOpDone = await checkoutCompletePage.extractOrderNumberAndSaveDetails(argv, DeviceBreakpoint.TABLET);
        // @ts-ignore
        await chaiExpect(isOpDone).to.equal(true);
    });

});