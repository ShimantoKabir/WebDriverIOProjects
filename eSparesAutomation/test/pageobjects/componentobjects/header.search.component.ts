export default class HeaderSearchComponent {

    desktopInputSearchSelector: string
    tabletInputSearchSelector: string

    constructor() {
        this.desktopInputSearchSelector = "#searchTermDesktop";
        this.tabletInputSearchSelector = "#searchTermTablet";
    }

    public get desktopInputSearch() {
        return $(this.desktopInputSearchSelector);
    }

    public get tabletInputSearch() {
        return $(this.tabletInputSearchSelector);
    }
}