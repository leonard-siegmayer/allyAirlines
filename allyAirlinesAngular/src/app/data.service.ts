import { Injectable } from '@angular/core';
import { SpecialOffer } from './special-offer';
import { Flight } from './flight';
import { Airport } from './airport';
import { Campaign } from './campaign';
import { Booking } from './booking';
import { SearchRequest } from './search-request';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

/**
 * A service providing the necessary data (airports, flights, campaigns, offers and bookings).
 * Everything, except for the bookings, is hard-coded.
 */
export class DataService {

  airports: Airport[] = [];
  flights: Flight[] = [];
  campaigns: Campaign[] = [];
  offers: SpecialOffer[] = [];

  constructor() { }

  /**
   * Returns all offers of a given campaign.
   * @param id The id of the campaign.
   */
  getOffersByCampaign(id: number): SpecialOffer[] {
    if (this.offers.length === 0) {
      this.createOffers();
    }
    return this.offers.filter(o => o.campaign.id === id);
  }

  /**
   * Evaluates a search request and returns all appropriate flights.
   * @param searchRequest The search results as an array of flights.
   */
  getFlightsByRequest(searchRequest: SearchRequest): Flight[] {
    if (this.flights.length === 0) {
      this.createFlights();
    }
    return this.flights.filter(f =>
      f.departureAirport.name.toLowerCase().includes(searchRequest.departureAirport.toLowerCase())
      && f.arrivalAirport.name.toLowerCase().includes(searchRequest.arrivalAirport.toLowerCase())
    );
  }

  /**
   * Takes a booking and stores it in the localStorage.
   */
  saveBooking(booking: Booking): void {
    // find the next available id
    let newId = 0;
    while (localStorage.getItem('booking' + newId.toString())) {
      newId++;
    }
    booking.id = newId;
    // store the booking in the localStorage
    localStorage.setItem('booking' + booking.id.toString(), JSON.stringify(booking));
  }

  getBookings(): Booking[] {
    const result: Booking[] = [];

    let id = 0;
    let booking = localStorage.getItem('booking' + id.toString());
    while (booking) {
      const parsedBooking = JSON.parse(booking);
      parsedBooking.id = id;
      result.push(parsedBooking);
      id++;
      booking = localStorage.getItem('booking' + id.toString());
    }

    return result;
  }

  getOffers(): SpecialOffer[] {
    if (this.offers.length === 0) {
      this.createOffers();
    }
    return this.offers;
  }

  getCampaings(): Campaign[] {
    if (this.campaigns.length === 0) {
      this.createCampaigns();
    }
    return this.campaigns;
  }

  getAirports(): Airport[] {
    if (this.airports.length === 0) {
      this.createAirports();
    }
    return this.airports;
  }

  getBookingById(id: number): Booking {
    return JSON.parse(localStorage.getItem('booking' + id.toString()));
  }

  getFlightById(id: number): Flight {
    if (this.flights.length === 0) {
      this.createFlights();
    }
    return this.flights.find(flight => flight.id === id);
  }

  private getAirportById(id: number): Airport {
    if (this.airports.length === 0) {
      this.createAirports();
    }
    return this.airports.find(airport => airport.id === id);
  }

  private getCampaignById(id: number): Campaign {
    if (this.campaigns.length === 0) {
      this.createCampaigns();
    }
    return this.campaigns.find(campaign => campaign.id === id);
  }

  /**
   * Deletes the booking of a given id.
   * @param id The id of the booking.
   */
  deleteBooking(id: number) {
    localStorage.removeItem('booking' + id.toString());
    // reduce the id of every other entry with a greater id than the given one
    if (localStorage.getItem('booking' + (id + 1).toString())) {
      localStorage.setItem('booking' + id.toString(), localStorage.getItem('booking' + (id + 1).toString()));
      this.deleteBooking(id + 1);
    }
  }

  /**
   * Returns every country together with its airports combined in an object.
   */
  getAirportsGroupedByCountries() {
    const result = [];
    for (const airport of this.getAirports()) {
      const country = result.find(elem => elem.country === airport.country);
      country ? country.airports.push(airport.name) : result.push({ country: airport.country, airports: [airport.name] });
    }

    return result;
  }

  /**
   * Generates the airports and stores them in the airports variable.
   */
  private createAirports() {
    const result = [];
    result.push(new Airport('Berlin (TXT)', 'Deutschland', 0));
    result.push(new Airport('Nürnberg (NUE)', 'Deutschland', 1));
    result.push(new Airport('Frankfurt (FRA)', 'Deutschland', 2));
    result.push(new Airport('Brisbane (BNE)', 'Australien', 3));
    result.push(new Airport('Sydney (SYD)', 'Australien', 4));
    result.push(new Airport('Perth (PER)', 'Australien', 5));
    result.push(new Airport('Birmingham (BHX)', 'England', 6));
    result.push(new Airport('Manchester (MAN)', 'England', 7));
    result.push(new Airport('London (STN)', 'England', 8));
    result.push(new Airport('Lyon (LYS)', 'Frankreich', 9));
    result.push(new Airport('Marseille (MRS)', 'Frankreich', 10));
    result.push(new Airport('Nizza (NCE)', 'Frankreich', 11));
    result.push(new Airport('Paris (XPG)', 'Frankreich', 12));
    result.push(new Airport('Kairo (CAI)', 'Ägypten', 13));
    result.push(new Airport('Sharm el Sheikh (SSH)', 'Ägypten', 14));
    result.push(new Airport('Hurghada (HRG)', 'Ägypten', 15));
    result.push(new Airport('Kimberley (KIM)', 'Südafrika', 16));
    result.push(new Airport('Ngala (NGL)', 'Südafrika', 17));
    result.push(new Airport('Bisho (BIY)', 'Südafrika', 18));
    result.push(new Airport('Johannesburg (JNB)', 'Südafrika', 19));
    result.push(new Airport('Kapstadt CPT)', 'Südafrika', 20));
    result.push(new Airport('Imphal (IMF)', 'Indien', 21));
    result.push(new Airport('Delhi (DEL)', 'Indien', 22));
    result.push(new Airport('Daegu (TAE)', 'Südkorea', 23));
    result.push(new Airport('Pohang (KPO)', 'Südkorea', 24));
    result.push(new Airport('Seoul (ICN)', 'Südkorea', 25));
    result.push(new Airport('Chengdu (CTU)', 'China', 26));
    result.push(new Airport('Peking (PKX)', 'China', 27));
    result.push(new Airport('Shanghai (PVG)', 'China', 28));
    result.push(new Airport('Kagoshima (KOJ)', 'Japan', 29));
    result.push(new Airport('Kobe (UKB)', 'Japan', 30));
    result.push(new Airport('Osaka (KIX)', 'Japan', 31));
    result.push(new Airport('Tokio (NRT)', 'Japan', 32));
    result.push(new Airport('San Juan (UAQ)', 'Peru', 33));
    result.push(new Airport('Rioja (RIJ)', 'Peru', 34));
    result.push(new Airport('Lima (LIM)', 'Peru', 35));
    result.push(new Airport('Rom (FCO)', 'Italien', 36));
    result.push(new Airport('Mailand (MXP)', 'Italien', 37));
    result.push(new Airport('Venedig (VCE)', 'Italien', 38));
    result.push(new Airport('Eldorado (ELO)', 'Argentinien', 39));
    result.push(new Airport('Catamarca (CTC)', 'Argentinien', 40));
    result.push(new Airport('Buenos Aires (AEP)', 'Argentinien', 41));
    result.push(new Airport('Alexandroupolis (AXD)', 'Griechenland', 42));
    result.push(new Airport('Athen (ATH)', 'Griechenland', 43));
    result.push(new Airport('Brasilia (BSB)', 'Brasilien', 44));
    result.push(new Airport('Rio De Janeiro (GIG)', 'Brasilien', 45));
    result.push(new Airport('Sao Paulo (GRU)', 'Brasilien', 46));
    result.push(new Airport('Cancun (CUN)', 'Mexico', 47));
    result.push(new Airport('Mexico City (MEX)', 'Mexico', 48));
    result.push(new Airport('Acapulco (ACA)', 'Mexico', 49));
    result.push(new Airport('Montreal-Trudeau (YUL)', 'Kanada', 50));
    result.push(new Airport('Toronto (YYZ)', 'Kanada', 51));
    result.push(new Airport('Vancouver (YVR)', 'Kanada', 52));
    result.push(new Airport('San Francisco (SFO)', 'USA', 53));
    result.push(new Airport('Las Vegas (LAS)', 'USA', 54));
    result.push(new Airport('Los Angeles (LAX)', 'USA', 55));
    result.push(new Airport('New York (JFK)', 'USA', 56));
    result.push(new Airport('Manlaga (AGP)', 'Spanien', 57));
    result.push(new Airport('Palma de Mallorca (PMI)', 'Spanien', 58));
    result.push(new Airport('Barcelona (BCN)', 'Spanien', 59));
    result.push(new Airport('Graz (GRZ)', 'Österreich', 60));
    result.push(new Airport('Salzburg (SZG)', 'Österreich', 61));
    result.push(new Airport('Wien (VIE)', 'Österreich', 62));
    result.push(new Airport('Madeira (FNC)', 'Portugal', 63));
    result.push(new Airport('Porto (OPO)', 'Portugal', 64));
    result.push(new Airport('Lissabon (LIS)', 'Portugal', 65));
    result.push(new Airport('Faro (FAO)', 'Portugal', 66));

    this.airports = result;
  }

  /**
   * Generates the flights (not necessarily realistic values) and stores them in the flights variable.
   */
  private createFlights() {
    const result = [];

    let flightId = -1;
    for (let departureId = 0; departureId <= 66; departureId++) {
      for (let arrivalId = 0; arrivalId <= 66; arrivalId++) {
        if (departureId === arrivalId) { continue; }
        result.push(
          new Flight(this.getAirportById(departureId), this.getAirportById(arrivalId), 78.58,
            { hours: 21, minutes: 57 }, { hours: 10, minutes: 43 }, ++flightId),
          new Flight(this.getAirportById(departureId), this.getAirportById(arrivalId), 112.85,
            { hours: 11, minutes: 19 }, { hours: 22, minutes: 15 }, ++flightId),
          new Flight(this.getAirportById(departureId), this.getAirportById(arrivalId), 98.11,
            { hours: 15, minutes: 44 }, { hours: 18, minutes: 21 }, ++flightId),
          new Flight(this.getAirportById(departureId), this.getAirportById(arrivalId), 178.32,
            { hours: 11, minutes: 31 }, { hours: 14, minutes: 35 }, ++flightId));
      }
    }
    this.flights = result;
  }

  /**
   * Generates the campaigns and stores them in the campaigns variable.
   */
  private createCampaigns() {
    const result = [];
    result.push(
      new Campaign('Amerika Angebote', 0),
      new Campaign('Asien Angebote', 1),
      new Campaign('Europa Angebote', 2),
      new Campaign('Afrika Angebote', 3),
      new Campaign('Ozeanien Angebote', 4),
      new Campaign('Winter Angebote', 5));
    this.campaigns = result;
  }

  /**
   * Generates the offers and stores them in the offers variable.
   */
  private createOffers() {
    const result = [];
    result.push(
      // America Offers
      new SpecialOffer(this.getFlightById(199), this.getCampaignById(0), 10),
      new SpecialOffer(this.getFlightById(720), this.getCampaignById(0), 10),
      new SpecialOffer(this.getFlightById(474), this.getCampaignById(0), 10),

      // Asia Offers
      new SpecialOffer(this.getFlightById(651), this.getCampaignById(1), 15),
      new SpecialOffer(this.getFlightById(349), this.getCampaignById(1), 15),
      new SpecialOffer(this.getFlightById(98), this.getCampaignById(1), 15),

      // Europe Offers
      new SpecialOffer(this.getFlightById(257), this.getCampaignById(2), 10),
      new SpecialOffer(this.getFlightById(6), this.getCampaignById(2), 10),
      new SpecialOffer(this.getFlightById(235), this.getCampaignById(2), 20),

      // Africa Offers
      new SpecialOffer(this.getFlightById(584), this.getCampaignById(3), 10),
      new SpecialOffer(this.getFlightById(602), this.getCampaignById(3), 10),
      new SpecialOffer(this.getFlightById(315), this.getCampaignById(3), 10),

      // Oceanina Offers
      new SpecialOffer(this.getFlightById(15), this.getCampaignById(4), 15),
      new SpecialOffer(this.getFlightById(280), this.getCampaignById(4), 10),
      new SpecialOffer(this.getFlightById(537), this.getCampaignById(4), 15),

      // Winter Offers
      new SpecialOffer(this.getFlightById(168), this.getCampaignById(5), 10),
      new SpecialOffer(this.getFlightById(470), this.getCampaignById(5), 20),
      new SpecialOffer(this.getFlightById(613), this.getCampaignById(5), 10),
      new SpecialOffer(this.getFlightById(231), this.getCampaignById(5), 10));
    this.offers = result;
  }
}
