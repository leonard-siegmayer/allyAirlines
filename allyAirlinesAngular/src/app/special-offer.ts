import { Flight } from './flight';
import { Campaign } from './campaign';

export class SpecialOffer {
    flight: Flight;
    campaign: Campaign;
    discount: number;

    constructor(flight: Flight, campaign: Campaign, discount: number) {
        this.flight = flight;
        this.campaign = campaign;
        this.discount = discount;
    }
}
