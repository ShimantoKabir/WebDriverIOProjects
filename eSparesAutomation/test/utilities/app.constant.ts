import Customer from "../models/customer";
import Card from "../models/card";

class AppConstant {

    stockNumberPrefix: string = "StockNumber";
    basketStockNumberPrefix: string = "StockNumber:";
    maximumCookieAfterClear: number = 3;
    desktopWidth: number = 1440;
    desktopHeight: number = 700;
    tabletMaxWidth: number = 1023;
    tabletMinHeight: number = 672;
    mobileMinWidth: number = 375;
    mobileMinHeight: number = 667;
    orderNumberPrefix: string = "Yourordernumberis";

    brands : string[] = [
        "Hygena"
    ];

    correctEmails: string[] = [
        "kabir3483@gmail.com"
    ];

    customers: Customer[] = [
        new Customer("Mr", "Shahariar", "Kabir", "01751117995", "UnitedKingdom", "MK19 6HT", "16A","kabir3483@gmail.com")
    ]

    cards: Card[] = [
        new Card("4917610000000000", "03/30", "737","password")
    ]

}

export default new AppConstant();