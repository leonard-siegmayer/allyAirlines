import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Flight } from '../flight';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PageEvent } from '@angular/material';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
/**
 * Component for the search results of the 'Flights'-View.
 */
export class SearchResultsComponent implements OnChanges, OnDestroy {
  @Input() searchResults: Flight[];
  displayedResults: Flight[];
  date: Date;

  displayedColumns: string[] = ['departure', 'arrival', 'price'];
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageIndex = 0;

  constructor(
    private router: Router,
    private liveAnnouncer: LiveAnnouncer,
    private userManagementService: UserManagementService) { }

  ngOnChanges() {
    this.date = new Date(new URLSearchParams(window.location.search).get('date'));
    if (this.searchResults === null) { return; }

    // Announce search result length to screen reader using 'LiveAnnouncer'.
    if (this.searchResults.length === 0) {
      this.liveAnnouncer.announce('Keine Ergebnisse für diese Suche gefunden.', 'polite');
    } else if (this.searchResults.length === 1) {
      this.liveAnnouncer.announce('Ein Ergebnis gefunden.', 'polite');
    } else {
      this.liveAnnouncer.announce(this.searchResults.length + ' Ergebnisse gefunden.', 'polite');
    }

    // Update pagination
    this.displayedResults = this.searchResults.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  /**
   * Redirects to the checkout view of a given flight.
   * @param id The id of the flight.
   */
  checkout(id: number) {
    if (this.userManagementService.isLoggedIn()) {
      this.router.navigate(['checkout'], { queryParams: { id, date: this.date.toISOString() } });
    } else {
      this.userManagementService.openSnackbar();
    }
  }

  /**
   * Updates the displayed results depending on the pagination parameters.
   */
  changeTablePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.displayedResults = this.searchResults.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  ngOnDestroy() {
    this.userManagementService.dismissSnackbar();
  }
}
