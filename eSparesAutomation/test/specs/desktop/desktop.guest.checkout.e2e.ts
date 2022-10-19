import 'reflect-metadata';
import HomePage from '../../pageobjects/home.page';
import ProductListingPage from '../../pageobjects/productlisting.page';
import BoughtTogetherPage from '../../pageobjects/boughttogether.page';
import BasketPage from '../../pageobjects/basket.page';
import CheckoutLoginPage from '../../pageobjects/checkout.login.page';
import AppConstant from '../../utilities/app.constant';
import DeliveryPostCodeLookupPage from '../../pageobjects/deliverypostcodelookup.page';
import DeliveryAddressPage from '../../pageobjects/deliveryaddress.page';
import CheckoutPaymentPage from '../../pageobjects/checkout.payment.page';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import CommonTest from "./../common.test.e2e";
// @ts-ignore
import { container } from 'tsyringe';
import CheckoutCompletePage from '../../pageobjects/checkout.complete.page';
import { DeviceBreakpoint } from '../../enums/device.breakpoint';

const argv = yargs(hideBin(process.argv)).argv;

let homePage: HomePage = container.resolve(HomePage);
let productListingPage: ProductListingPage = container.resolve(ProductListingPage);
let boughtTogetherPage: BoughtTogetherPage = container.resolve(BoughtTogetherPage);
let basketPage: BasketPage = container.resolve(BasketPage);
let checkoutLoginPage: CheckoutLoginPage = container.resolve(CheckoutLoginPage);
let deliveryPostCodeLookupPage: DeliveryPostCodeLookupPage = container.resolve(DeliveryPostCodeLookupPage);
let deliveryAddressPage: DeliveryAddressPage = container.resolve(DeliveryAddressPage);
let checkoutPaymentPage: CheckoutPaymentPage = container.resolve(CheckoutPaymentPage);
let checkoutCompletePage : CheckoutCompletePage = container.resolve(CheckoutCompletePage);

describe('Guest checkout workflow test', () => {

    it('should open the home page', async () => {
        await browser.url("/");
        await browser.setWindowSize(AppConstant.desktopWidth, AppConstant.desktopHeight);
        await expect(browser).toHaveUrl(homePage.homePageUrl);
    });

    CommonTest.shouldHaveDataInCmdLineArgs(argv);

    CommonTest.shouldDeleteCookie();

    it('should hover to kitchen and appliance', async () => {
        await homePage.hoverKitchenAndApplianceMegaMenu();
        await browser.pause(5000);
    });

    it('should click on the button & switch', async () => {
        await homePage.clickButtonAndSwitchItemOnMegaMenu();
        await browser.pause(5000);
    });

    CommonTest.shouldBeInPLPPage();

    CommonTest.shouldHaveProductsInPLP();

    CommonTest.shouldCollectAndStoreNthProduct(DeviceBreakpoint.DESKTOP);

    CommonTest.shouldHaveProductOnStore();

    CommonTest.shouldScrollDownToNthProduct();

    it('should redirect to bought together page', async () => {
        await productListingPage.redirectBoughtTogetherFromNthChild(productListingPage.nthItemToBeTest);
        await browser.pause(5000);
        // @ts-ignore
        let url = await browser.getUrl() ;

        if (url.includes(boughtTogetherPage.urlMustContain)) {

            describe('Guest checkout via bought together', function () {

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
                    await expect(browser).toHaveUrlContaining(checkoutLoginPage.urlMustContain);
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

                it('should be selected as a guest', async () => {
                    await expect(checkoutLoginPage.guestRadioDiv).toHaveElementClass(checkoutLoginPage.checkedRadioClassName);
                });

                it('should email available on the input and match with the db mock data', async () => {
                    let isAvailableMatched = await checkoutLoginPage.checkEmailAvailabilityAndCompareWithTheMockData(argv);
                    // @ts-ignore
                    await chaiExpect(isAvailableMatched).to.equal(true);
                });

                it('should redirect to the checkout delivery post code lookup page', async () => {
                    await checkoutLoginPage.redirectToDeliveryPostCodeLookup(DeviceBreakpoint.DESKTOP);
                    expect(browser).toHaveUrlContaining(deliveryPostCodeLookupPage.urlMustContain);
                    await browser.pause(5000);
                });

                it('should be in the checkout second step', async () => {
                    await expect(deliveryPostCodeLookupPage.checkoutProgressIndicator.checkoutSecondStep)
                        .toHaveElementClass(deliveryPostCodeLookupPage.checkoutProgressIndicator.checkoutCurrentStepClassName);
                });

                it('should fill up delivery post code lookup form and submit', async () => {
                    let isFilledUp = await deliveryPostCodeLookupPage.fillUpDeliveryPostCodeLookupFormAndSubmit(argv);
                    // @ts-ignore
                    await chaiExpect(isFilledUp).to.equal(true);
                });

                it('should submit the delivery post code lookup form', async () => {
                    await deliveryPostCodeLookupPage.submitDeliveryPostCodeLookupForm(DeviceBreakpoint.DESKTOP);
                });

                it('should in the delivery address page', async () => {
                    await expect(browser).toHaveUrlContaining(deliveryAddressPage.urlMustContain);
                    await browser.pause(3000);
                });

                it('should data yet be available in the form', async () => {
                    let isAvailable = await deliveryAddressPage.checkFormDataAvailability(argv);
                    // @ts-ignore
                    await chaiExpect(isAvailable).to.equal(true);
                });

                it('should allow the cookie', async () => {
                    await deliveryAddressPage.allowCookie();
                    await browser.pause(3000);
                });

                it('should click delivery address button', async () => {
                    await deliveryAddressPage.clickDeliverToAddressButton();
                    await browser.pause(3000);
                });

                it('should in the checkout payment page', async () => {
                    await expect(browser).toHaveUrlContaining(checkoutPaymentPage.urlMustContain);
                    await browser.pause(3000);
                });

                it('should be in the checkout third step', async () => {
                    await expect(checkoutPaymentPage.checkoutProgressIndicator.checkoutThirdStep)
                        .toHaveElementClass(checkoutPaymentPage.checkoutProgressIndicator.checkoutCurrentStepClassName);
                });

                it('should complete the payment successfully', async () => {
                    await checkoutPaymentPage.fillPaymentFromData(argv);
                    await browser.pause(10000);
                });

                it('should in the checkout complete page', async () => {
                    await expect(browser).toHaveUrlContaining(checkoutCompletePage.urlMustContain);
                    await browser.pause(3000);
                });

                it('should extract order number and save the details', async () => {
                    let isOpDone = await checkoutCompletePage.extractOrderNumberAndSaveDetails(argv, DeviceBreakpoint.DESKTOP);
                    // @ts-ignore
                    await chaiExpect(isOpDone).to.equal(true);
                });

            });
        } else {
            // @ts-ignore
            await browser.back();
            // go back to PLP and then redirect to PDP
        }
    });
});