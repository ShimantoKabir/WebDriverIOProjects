import HeaderSearchComponent from "../pageobjects/componentobjects/header.search.component";
import HeaderTabletButtonComponent from "../pageobjects/componentobjects/header.tablet.button.component";
import HeaderMobileButtonComponent from "./componentobjects/header.mobile.button.component";
import MegaMenuComponent from "../pageobjects/componentobjects/megamenu.component";
import CookieComponent from "../pageobjects/componentobjects/cookie.component";
import SidenavComponent from "../pageobjects/componentobjects/sidenav.component";
import HeaderCurrencyAndDestinationComponent from "../pageobjects/componentobjects/header.currency.destination.component";
import CustomerService from "../services/customer.service";
import CardService from "../services/card.service";
import Customer from "../models/customer";
import Card from "../models/card";
import { ResponseCode } from "../enums/response.code";
import Order from "../models/order";
import OrderService from "../services/order.service";
// @ts-ignore
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class HomePage {

    sidenavComponent: SidenavComponent;
    headerSearchComponent: HeaderSearchComponent;
    cookieComponent: CookieComponent;
    headerTabletButtonComponent: HeaderTabletButtonComponent;
    megaMenuComponent: MegaMenuComponent;
    headerCurrencyAndDestinationComponent: HeaderCurrencyAndDestinationComponent;
    headerMobileButtonComponent : HeaderMobileButtonComponent;
    orderService : OrderService;

    constructor(
        sidenavComponent: SidenavComponent,
        headerSearchComponent: HeaderSearchComponent,
        cookieComponent: CookieComponent,
        headerTabletButtonComponent: HeaderTabletButtonComponent,
        megaMenuComponent: MegaMenuComponent,
        headerCurrencyAndDestinationComponent: HeaderCurrencyAndDestinationComponent,
        headerMobileButtonComponent : HeaderMobileButtonComponent,
        orderService : OrderService
    ) {
        this.sidenavComponent = sidenavComponent;
        this.headerSearchComponent = headerSearchComponent;
        this.cookieComponent = cookieComponent;
        this.headerTabletButtonComponent = headerTabletButtonComponent;
        this.megaMenuComponent = megaMenuComponent;
        this.headerCurrencyAndDestinationComponent = headerCurrencyAndDestinationComponent;
        this.headerMobileButtonComponent = headerMobileButtonComponent;
        this.orderService = orderService;
    }

    homePageUrl = "https://www.tron.espares.co.uk/";

    public searchOnDesktopView(searchText: string) {
        this.headerSearchComponent.desktopInputSearch.setValue(searchText);
    }

    public allowCookie() {
        this.cookieComponent.cookieAllowButton.click();
    }

    public openOrCloseSideMenu() {
        return this.headerTabletButtonComponent.tabletMenuButton.click();
    }

    public openOrCloseMobileSideMenu() {
        return this.headerMobileButtonComponent.mobileMenuButton.click();
    }

    public closeTabletSearchBox() {
        this.headerTabletButtonComponent.tabletSearchButton.click();
    }

    public openOrCloseCurrencyAndDestinationSelectionBox() {
        this.headerTabletButtonComponent.currencyButton.click();
    }

    public hoverKitchenAndApplianceMegaMenu() {

        this.megaMenuComponent.getMegaMenuHearerLinkByChild(this.megaMenuComponent.kitchenAndApplianceChildNumber).moveTo();
    }

    public clickButtonAndSwitchItemOnMegaMenu() {
        this.megaMenuComponent.getMegaMenuPanelItemByHierarchy(
            this.megaMenuComponent.kitchenAndApplianceChildNumber,
            this.megaMenuComponent.cookerHoodSparesPanelNumber,
            this.megaMenuComponent.buttonAndSwitchItemNumber
        ).click();
    }

    public checkDataInCmdLineArgs = async (argv): Promise<boolean> => {
        let isSaved: boolean = false;

        if(argv.customerId && argv.cardId){
            isSaved = true;
        }

        return isSaved;
    }

}
