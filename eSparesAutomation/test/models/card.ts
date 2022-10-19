export default class Card {

    id!: number;
    number: string;
    expiryDate: string;
    securityCode: string;
    password: string;

    constructor(number: string, expiryDate: string, securityCode: string, password: string) {
        this.number = number;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
        this.password = password;
    }

}