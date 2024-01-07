import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.scss']
})
/**
 * Component for the popular destinations section in the 'Home'-View.
 */
export class PopularDestinationsComponent implements OnInit {

  /**
   * Defines the popular destinations to be displayed in the view.
   */
  popularDestinations = [{
    departure: 'Nürnberg (NUE)',
    arrival: 'Rio De Janeiro (GIG)',
    imgName: 'rio.jpg',
    label: 'Rio de Janeiro',
    description: 'Von Nürnberg nach Rio de Janeiro',
    price: 'ab 78,20€'
  },
  {
    departure: 'Frankfurt (FRA)',
    arrival: 'Tokio (NRT)',
    imgName: 'tokyo.jpg',
    label: 'Tokio',
    description: 'Von Frankfurt nach Tokio',
    price: 'ab 349,22€'
  },
  {
    departure: 'Frankfurt (FRA)',
    arrival: 'Paris (XPG)',
    imgName: 'paris.jpg',
    label: 'Paris',
    description: 'Von Frankfurt nach Paris',
    price: 'ab 38,46€'
  }];

  constructor() { }

  ngOnInit() { }
}
