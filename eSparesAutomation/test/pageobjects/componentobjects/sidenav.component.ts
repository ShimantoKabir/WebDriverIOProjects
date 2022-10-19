import Helper from "../../utilities/helper";

export default class SidenavComponent {

    sideNavNthMenuSelector: string = "nav.megamenus>div>ul>li:nth-child"
    menuTitleSelector: string = "li.menusection.open>div>span";
    menuItemTitleSelector: string = "section.menuitem-section.open>div>span";
    targetMenuTitleText = "CookerHoods";
    navSelector: string = "nav.megamenus";
    nthItemToBeTest = 3;
    nthMenuItemSectionSelector: string = "li.menusection.open > div.menusection-row > section:nth-child";
    nthMenuItemSelector: string = "div > ul > li:nth-child";

    public getNthNavMenu(nthMenu: number) {
        return $(`${this.sideNavNthMenuSelector}(${nthMenu})`);
    }

    public clickNthNavMenu(nthMenu: number) {
        return this.getNthNavMenu(nthMenu).click();
    }

    public get menuTitle() {
        return $(this.menuTitleSelector);
    }

    public get nav() {
        return $(this.navSelector);
    }

    public checkTargetMenuTitle = async (): Promise<boolean> => {
        return await this.nav.isDisplayedInViewport();
    }

    public clickNthMenuSection(itemSectionNumber: number) {
        return $(`${this.nthMenuItemSectionSelector}(${itemSectionNumber})>h4`).click();
    }

    public clickNthMenuItem(itemSectionNumber: number, itemNumber: number) {
        return $(`${this.nthMenuItemSectionSelector}(${itemSectionNumber})>${this.nthMenuItemSelector}(${itemNumber})>a`).click();
    }

    public checkCookerHoodSparesMenu = async (): Promise<boolean> => {
        let isFound = false;

        while (!isFound) {
            await this.clickNthNavMenu(this.nthItemToBeTest);
            await browser.pause(2000);

            let isInViewPort = await this.menuTitle.isDisplayedInViewport()
            
            if (isInViewPort) {
                let title = await this.menuTitle.getText();
                if (Helper.removeSpace(title).toLowerCase() === this.targetMenuTitleText.toLowerCase()) {
                    isFound = true;
                }
            }
        }

        return isFound;
    }

    public checkPopularPartTypesMenu = async (): Promise<void> => {
        await this.clickNthMenuSection(this.nthItemToBeTest - 1);
        await browser.pause(2000);
        await this.clickNthMenuItem(this.nthItemToBeTest - 1, this.nthItemToBeTest - 2);
        await browser.pause(2000);
    }
}