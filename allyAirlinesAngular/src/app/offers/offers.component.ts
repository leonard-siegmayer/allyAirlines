import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Campaign } from '../campaign';
import { Router, ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../user-management.service';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { SpecialOffer } from '../special-offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
/**
 * Component for the 'Offers'-View: Displays multiple special offers grouped by campaign name.
 * Offers can be filtered by the url parameter 'campaign'.
 */
export class OffersComponent implements OnInit, OnDestroy {

  allCampaigns: Campaign[];
  campaigns: Campaign[];
  minDate = new Date();

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Ally Airlines - Angebote');
  }

  ngOnInit() {
    // init campaigns
    this.allCampaigns = this.dataService.getCampaings();
    this.campaigns = this.allCampaigns;
    // filters the displayed offers depending on the search parameters.
    this.route.params.subscribe(params => {
      const selectedCampaign: string = params.campaign;
      if (selectedCampaign) { this.campaigns = this.allCampaigns.filter(c => c.name.toLowerCase() === selectedCampaign.toLowerCase()); }
    });
  }

  /**
   * Returns all offers of a given campaign.
   */
  getOffersByCampaign(campaign: Campaign): SpecialOffer[] {
    return this.dataService.getOffersByCampaign(campaign.id);
  }

  /**
   * Calculates the target id of a skip link. Either the next campaign section, or the footer.
   * @param index the index of the currently focused campaign
   */
  getSkipLinkTarget(index: number) {
    return this.campaigns[index + 1] ? 'campaign' + (index + 1).toString() : 'footer';
  }

  /**
   * Redirects the user to the checkout depending on the selected flight.
   * @param id The id of the flight
   * @param dateString The date of the flight
   */
  checkout(id: number, dateString: string) {
    if (this.userManagementService.isLoggedIn()) {
      const splittedDate = dateString.split('.');
      const date = new Date(+splittedDate[2], +splittedDate[1], +splittedDate[0]).toString();
      this.router.navigate(['checkout'], { queryParams: { id, date } });
    } else {
      this.userManagementService.openSnackbar();
    }
  }

  /**
   * Generates a label for an offer card. Used to make them easier to comprehend without context when using assistive technologies.
   * @param i the index of the campaign
   * @param j the index of the offer within the campaign
   */
  getLabel(i: string, j: string): string {
    const headerText = document.getElementById(`offerTitle${i}${j}`).innerHTML;
    return `Angebot buchen: ${headerText}`;
  }

  ngOnDestroy() {
    this.userManagementService.dismissSnackbar();
  }
}
