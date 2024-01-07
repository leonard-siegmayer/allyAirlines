export class PaymentInformation {
    creditCardOwner: string;
    creditCardNumber: string;
    controlNumber: string;
    validUntil: string;

    constructor(creditCardOwner: string, creditCardNumber: string, controlNumber: string, validUntil: string) {
        this.creditCardNumber = creditCardNumber;
        this.creditCardOwner = creditCardOwner;
        this.controlNumber = controlNumber;
        this.validUntil = validUntil;
    }
}
