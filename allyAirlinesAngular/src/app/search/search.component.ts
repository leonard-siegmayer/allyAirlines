import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchRequest } from '../search-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CountryWithAirports {
  country: string;
  airports: string[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
/**
 * Component for the form, which can be used to search for flights.
 */
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<SearchRequest>();
  minDate = new Date();
  searchForm: FormGroup;

  airportsGroupedByCountry: CountryWithAirports[];
  arrivalAirportOptions: Observable<CountryWithAirports[]>;
  departureAirportOptions: Observable<CountryWithAirports[]>;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // get search Params
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('date');
    const departureAirport = urlParams.get('departureAirport');
    const arrivalAirport = urlParams.get('arrivalAirport');

    // initilize form
    this.searchForm = this.formBuilder.group({
      date: [date ? new Date(date) : '', Validators.required],
      departureAirport: [departureAirport, Validators.required],
      arrivalAirport: [arrivalAirport, Validators.required]
    });

    // emitSearch if all information are given. Otherwise, if only some information are given, focus empty form field
    if (date && departureAirport && arrivalAirport) {
      this.emitSearch();
    } else if (date || departureAirport || arrivalAirport) {
      if (!date) {
        (document.querySelector(`[formControlName='date'`) as HTMLElement).focus();
      } else if (!departureAirport) {
        (document.querySelector(`[formControlName='departureAirport'`) as HTMLElement).focus();
      } else if (!arrivalAirport) {
        (document.querySelector(`[formControlName='arrivalAirport'`) as HTMLElement).focus();
      }
    }

    // get flights for the autocomplete feature
    this.airportsGroupedByCountry = this.dataService.getAirportsGroupedByCountries();
    this.arrivalAirportOptions = this.searchForm.get('arrivalAirport').valueChanges.pipe(
      map(value => this._filterGroup(value))
    );
    this.departureAirportOptions = this.searchForm.get('departureAirport').valueChanges.pipe(
      map(value => this._filterGroup(value))
    );
  }

  /**
   * Sends a search request to the parent component and navigates to the 'Flights'-View.
   */
  emitSearch() {
    if (!this.searchForm.valid) { return; }
    const date = new Date(this.searchForm.value.date);
    const departureAirport = this.searchForm.value.departureAirport;
    const arrivalAirport = this.searchForm.value.arrivalAirport;
    this.router.navigate(['flights'],
      { queryParams: { date: date.toDateString(), departureAirport, arrivalAirport } });

    this.search.emit(new SearchRequest(date, departureAirport, arrivalAirport));
  }

  /**
   * Filter for the autocomplete functionality.
   * @returns the results grouped by the country name.
   */
  private _filterGroup(value: string): CountryWithAirports[] {
    if (value) {
      return this.airportsGroupedByCountry
        .map(group => group.country.toLowerCase().includes(value.toLowerCase()) ?
          group : ({ country: group.country, airports: group.airports.filter(a => a.toLowerCase().includes(value.toLowerCase())) }))
        .filter(group => group.airports.length > 0);
    }

    return this.airportsGroupedByCountry;
  }
}
