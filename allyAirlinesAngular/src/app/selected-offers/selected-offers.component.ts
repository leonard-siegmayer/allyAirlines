import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-offers',
  templateUrl: './selected-offers.component.html',
  styleUrls: ['./selected-offers.component.scss']
})
/**
 * Component for selected offers section in the 'Home'-View. Each offer redirects the user to the 'Offer'-View with a filter in the url.
 */
export class SelectedOffersComponent implements OnInit {

  /**
   * The offers to be displayed in the view.
   */
  selectedOffers = [
    { title: 'Europa', campaign: 'Europa Angebote' },
    { title: 'Amerika', campaign: 'Amerika Angebote' },
    { title: 'Asien', campaign: 'Asien Angebote' },
    { title: 'Afrika', campaign: 'Afrika Angebote' },
    { title: 'Ozeanien', campaign: 'Ozeanien Angebote' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
