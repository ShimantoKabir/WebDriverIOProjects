import 'reflect-metadata';
import AppConstant from '../utilities/app.constant';
import ProductListingPage from '../pageobjects/productlisting.page';
import HomePage from '../pageobjects/home.page';
import BoughtTogetherPage from '../pageobjects/boughttogether.page';
// @ts-ignore
import { container } from 'tsyringe';
import { DeviceBreakpoint } from '../enums/device.breakpoint';

let productListingPage: ProductListingPage = container.resolve(ProductListingPage);
let homePage: HomePage = container.resolve(HomePage);
let boughtTogetherPage: BoughtTogetherPage = container.resolve(BoughtTogetherPage);

export default class CommonTest {

    public static shouldDeleteCookie = async (): Promise<void> =>  {
        it("should delete all cookies", async () => {
            await browser.deleteCookies();
            await browser.pause(5000);
            let cookies = await browser.getCookies();
            console.log("total cookies = ", cookies);
            let isCookieAlmostCleared = cookies.length <= AppConstant.maximumCookieAfterClear ? true : false;
            // @ts-ignore
            await chaiExpect(isCookieAlmostCleared).to.equal(true);
        });
    }

    public static shouldBeInPLPPage = async (): Promise<void> => {
        it('should be on the search page', async () => {
            await expect(browser).toHaveUrlContaining(productListingPage.urlMustContain);
        });
    }

    public static shouldHaveProductsInPLP = async(): Promise<void> => {
        it('should have products in PLP', async () => {
            await expect(productListingPage.productItems).toHaveChildren({ gte: 1 })
        });
    }

    public static shouldCollectAndStoreNthProduct = async (deviceBreakpoint: DeviceBreakpoint): Promise<void> => {
        it('should collect and store the nth product data', async () => {
            let isProductAvailable = await productListingPage.productItems.length > 1 ? true : false;
            if (!isProductAvailable) {
                // @ts-ignore
                await chaiExpect(isProductAvailable).to.equal(false);
            } else {
                let isProductDateCollectedAndSaved = await productListingPage
                    .collectAndSaveNthProduct(productListingPage.nthItemToBeTest,deviceBreakpoint);
                // @ts-ignore
                await chaiExpect(isProductDateCollectedAndSaved).to.equal(true);
            }
        });
    }

    public static shouldHaveProductOnStore = async (): Promise<void> => {
        it('should have the product data on the shared store', async () => {
            let isProductOnStore = await productListingPage.checkProductOnStorage();
            // @ts-ignore
            await chaiExpect(isProductOnStore).to.equal(true);
        });
    }

    public static redirectCookerHoodSparesMenu = async (): Promise<void> => {
        it('should redirect to "Cooker Hood Spares" menu', async () => {
            let isFound = await homePage.sidenavComponent.checkCookerHoodSparesMenu();
            // @ts-ignore
            await chaiExpect(isFound).to.equal(true);
            await browser.pause(5000);
        });
    }

    public static redirectButtonAndSwitchesAndClick = async (): Promise<void> => {
        it('should redirect "Buttons & Switches" and clicked', async () => {
            await homePage.sidenavComponent.checkPopularPartTypesMenu();
        });
    }

    public static shouldScrollDownToNthProduct = async (): Promise<void> => {
        it('should scroll down to nth product', async () => {
            await productListingPage.scrollDownToNthProduct(productListingPage.nthItemToBeTest);
        });
    }

    public static shouldHaveDataInCmdLineArgs = async (argv): Promise<void> => {
        it('should have data in cmd line args', async () => {
            let isSaved = await homePage.checkDataInCmdLineArgs(argv);
            // @ts-ignore
            await chaiExpect(isSaved).to.equal(true);
        });
    }

    public static shouldMatchJustAddedProductWithStored = async (): Promise<void> => {
        it('should match the just added product with stored', async () => {
            let isMatched = await boughtTogetherPage.compareJustAddedProductWithStoredProduct();
            // @ts-ignore
            await chaiExpect(isMatched).to.equal(true);
        });
    }
}