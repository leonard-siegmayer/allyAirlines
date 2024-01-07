export class SearchRequest {
    date: Date;
    departureAirport: string;
    arrivalAirport: string;

    constructor(date: Date, departureAirport: string, arrivalAirport: string) {
        this.date = date;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
    }
}
