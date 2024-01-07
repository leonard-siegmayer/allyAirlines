export class Passenger {
    firstName: string;
    lastName: string;
    postalCode: string;
    city: string;
    streetAndNumber: string;
    dayOfBirth: string;

    constructor(firstName: string, lastName: string, postalCode: string, city: string, streetAndNumber: string, dayOfBirth: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.postalCode = postalCode;
        this.city = city;
        this.streetAndNumber = streetAndNumber;
        this.dayOfBirth = dayOfBirth;
    }
}
