export default class MegaMenuComponent {

    megaMenuHearerLinkSelector: string
    megaMenuPanelSectionSelector: string
    megaMenuPanelItemSectionSelector: string
    kitchenAndApplianceChildNumber = 3;
    cookerHoodSparesPanelNumber = 1;
    buttonAndSwitchItemNumber = 1;

    constructor() {
        this.megaMenuHearerLinkSelector = "ul.primary-navigation>li:nth-child";
        this.megaMenuPanelSectionSelector = "ul.megamenu-panel>li:nth-child(1)>div.megamenu>ul>li:nth-child";
        this.megaMenuPanelItemSectionSelector = "div.menusection-row.mobile-megamenu-panel>section:nth-child(2)>div>ul>li:nth-child";
    }

    getMegaMenuHearerLinkByChild(childNumber: number) {
        return $(`${this.megaMenuHearerLinkSelector}(${childNumber})`);
    }

    getMegaMenuPanelItemByHierarchy(headerLinkNumber: number, panelNumber: number, itemNumber: number) {
        return $(`${this.megaMenuHearerLinkSelector}(${headerLinkNumber})>${this.megaMenuPanelSectionSelector}(${panelNumber})>${this.megaMenuPanelItemSectionSelector}(${itemNumber})>a`);
    }
}