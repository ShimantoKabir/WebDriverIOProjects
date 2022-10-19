export default class Customer {

    id!: number;
    title: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    houseNumber: string;
    postCode: string;
    email: string;
    city!: string;
    state!: string;
    addressOne!: string;
    addressTwo!: string;

    constructor(
        title: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        country: string,
        postCode: string,
        houseNumber: string,
        email: string,
        city?: string,
        state?: string,
        addressOne?: string,
        addressTwo?: string
    ) {
        this.email = email;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.houseNumber = houseNumber;
        this.postCode = postCode;
        this.email = email;
        this.city = city;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.state = state
    }
}