export default class CookieComponent {

    cookieAllowButtonSelector: string

    constructor() {
        this.cookieAllowButtonSelector = "#btn-allow-all";
    }

    public get cookieAllowButton() {
        return $(this.cookieAllowButtonSelector);
    }
}