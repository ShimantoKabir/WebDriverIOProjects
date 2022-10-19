export default class HeaderTabletButtonComponent {

    menuButtonSelector: string
    searchButtonSelector: string
    currencyButtonSelector: string

    constructor() {
        this.menuButtonSelector = "div.tablet-only>ul>li.mobile-nav-toggle>button";
        this.searchButtonSelector = "div.tablet-only>ul>li.mobile-search-toggle>button";
        this.currencyButtonSelector = "#nationality-trigger";
    }

    public get tabletMenuButton() {
        return $(this.menuButtonSelector);
    }

    public get tabletSearchButton() {
        return $(this.searchButtonSelector);
    }

    public get currencyButton() {
        return $(this.currencyButtonSelector);
    }
}