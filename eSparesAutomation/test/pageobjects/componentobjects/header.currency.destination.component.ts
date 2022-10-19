export default class HeaderCurrencyAndDestinationComponent {

    currencyDropdownSelector: string
    destinationDropdownSelector: string
    updateButtonSelector: string
    componentSelector: string

    constructor() {
        this.currencyDropdownSelector = "#SelectedCurrency";
        this.destinationDropdownSelector = "#SelectedDestination"
        this.updateButtonSelector = "#international-selector>form>button";
        this.componentSelector = "#international-selector";
    }

    public get currencyDropdown() {
        return $(this.currencyDropdownSelector);
    }

    public get destinationDropdown() {
        return $(this.destinationDropdownSelector);
    }

    public get updateButton() {
        return $(this.updateButtonSelector);
    }

    public get component() {
        return $(this.componentSelector);
    }
}