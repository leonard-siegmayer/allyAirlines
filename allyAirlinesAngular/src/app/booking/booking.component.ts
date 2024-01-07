import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { SearchRequest } from '../search-request';
import { DataService } from '../data.service';
import { Flight } from '../flight';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
/**
 * Component for the 'Flights'-View: Provides a form to search for flights and displays the results.
 */
export class BookingComponent implements AfterViewChecked {

  /**
   * The flights to be displayed within the search results section.
   */
  searchResults: Flight[] = null;

  constructor(private dataService: DataService, private titleService: Title, private cdRef: ChangeDetectorRef) {
    this.titleService.setTitle('Ally Airlines - Flug suchen');
  }

  /**
   * Evaluates the search form and updates the 'searchResults' variable accordingly.
   * @param searchRequest A SearchRequest including the search parameters.
   */
  search(searchRequest: SearchRequest) {
    this.searchResults = this.dataService.getFlightsByRequest(searchRequest);
    (document.getElementById(`searchResults`) as HTMLElement).focus();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
