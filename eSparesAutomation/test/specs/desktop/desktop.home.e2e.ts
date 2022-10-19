import 'reflect-metadata';
import HomePage from '../../pageobjects/home.page';
import AppConstant from '../../utilities/app.constant';
// @ts-ignore
import { container } from 'tsyringe';

let homePage: HomePage  = container.resolve(HomePage);

describe('Home Page', () => {
    it('should open the home page', async () => {
        await browser.url("/");
        await browser.setWindowSize(AppConstant.desktopWidth, AppConstant.desktopHeight);
        await browser.pause(5000);
    });

    it('should allow the cookie', async () => {
        await homePage.allowCookie();
    });

    it('should open the suggestion list bellow the header search box', async () => {
        await homePage.searchOnDesktopView("bag");
        await browser.pause(5000);
    });

    it('should clear the search text', async () => {
        await browser.keys("Backspace");
        await browser.keys("Backspace");
        await browser.keys("Backspace");
        await browser.pause(5000);
    });

    it('should open the currency and destination selection box', async () => {
        await homePage.openOrCloseCurrencyAndDestinationSelectionBox();
        await browser.pause(3000);
        await homePage.openOrCloseCurrencyAndDestinationSelectionBox();
        await browser.pause(2000);
        await expect(homePage.headerCurrencyAndDestinationComponent.component).not.toBeDisplayed();
    });
});
