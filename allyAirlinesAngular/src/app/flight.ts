import { Airport } from './airport';
import { Time } from '@angular/common';

export class Flight {
    departureAirport: Airport;
    arrivalAirport: Airport;
    price: number;
    departureTime: Time;
    arrivalTime: Time;
    public id: number;

    constructor(departureAirport: Airport, arrivalAirport: Airport, price: number, departureTime: Time, arrivalTime: Time, id: number) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.price = price;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.id = id;
    }
}
