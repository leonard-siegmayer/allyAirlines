import { Flight } from './flight';
import { Passenger } from './passenger';
import { PaymentInformation } from './payment-information';

export class Booking {
    flight: Flight;
    date: Date;
    passenger: Passenger;
    payment: PaymentInformation;
    id: number;

    constructor(flight: Flight, date: Date, passenger: Passenger, payment: PaymentInformation) {
        this.flight = flight;
        this.date = date;
        this.passenger = passenger;
        this.payment = payment;
    }
}
