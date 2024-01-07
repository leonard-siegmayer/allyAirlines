import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
/**
 * Component for the review section in the 'Home'-View.
 */
export class ReviewsComponent implements OnInit {

  /**
   * Defines the reviews to be displayed in the view.
   */
  reviews = [
    {
      message: `"Meine Familie und ich waren sehr zufrieden mit unserer Buchung bei 'Ally Airlines'!"`,
      user: 'Emma',
      number: '1'
    },
    {
      message: `"Ally Airlines bietet außergewöhnlich guten Service zum kleinen Preis."`,
      user: 'Tom',
      number: '2'
    },
    {
      message: `"Ich würde jeder Zeit wieder mit Ally Airlines fliegen."`,
      user: 'Klaus',
      number: '3'
    },
    {
      message: `"Ich habe hier bereits mehrere Flüge gebucht und werde das in Zukunft noch öfter machen."`,
      user: 'Claudia',
      number: '4'
    },
    {
      message: `"Einfach nur fantastisch!"`,
      user: 'Louise',
      number: '5'
    }
  ];

  constructor() { }

  ngOnInit() { }

}
