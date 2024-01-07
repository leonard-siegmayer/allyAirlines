import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * Component for the 'Home'-View: Shows a search form, popular destinations, recommendations, offers and user reviews.
 */
export class HomeComponent {

  /**
   * The options of the recommendations section.
   */
  recommendations: string[] = [
    'Kairo, Ägypten',
    'Venedig, Italien',
    'Alexandroupolis, Griechenland',
    'Hurghada, Ägypten',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Ally Airlines - Startseite');
  }
}
