import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * The root component of the application, including a navigation, footer and the router-outlet for the content.
 */
export class AppComponent implements OnInit {

  @HostBinding('@.disabled')
  public animationsDisabled = false;

  animationToggleText = 'Animationen sind aktiviert';
  header: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // Subscribe to the NavigationEnd-Event: Update and focus the main heading if the route changes.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((ng: NavigationEnd) => {
      this.updateHeading(ng.url);
      // Prevents focusing the header on the booking site and after using a skip-link.
      if (ng.urlAfterRedirects.includes('flights?') || ng.urlAfterRedirects.includes('#')) { return; }
      const mainHeader: HTMLElement = document.querySelector('#mainHeader');
      mainHeader.focus();
    });

    // Initilize animationToggleText and animationsDisabled
    const animationCookie = document.cookie.split(';').filter(c => c.includes('animationsDisabled'))[0];
    if (animationCookie) {
      if (animationCookie.includes('true')) {
        this.animationToggleText = 'Animationen sind deaktiviert';
        this.animationsDisabled = true;
      } else {
        this.animationToggleText = 'Animationen sind aktiviert';
        this.animationsDisabled = false;
      }
    }
  }

  /**
   * Deaktivates/Activates the animations for the application.
   */
  toggleAnimation() {
    if (!this.animationsDisabled) {
      this.animationToggleText = 'Animationen sind deaktiviert';
      this.animationsDisabled = true;
    } else {
      this.animationToggleText = 'Animationen sind aktiviert';
      this.animationsDisabled = false;
    }
    document.cookie = `animationsDisabled=${this.animationsDisabled};`;
  }

  /**
   * Changes the heading of the page depending on the current route.
   * @param route The current route.
   */
  private updateHeading(route: string) {
    if (route.includes('about')) {
      this.header = 'Über uns';
    } else if (route.includes('flights')) {
      this.header = 'Flug suchen';
    } else if (route.includes('offers')) {
      this.header = 'Angebote';
    } else if (route.includes('contact')) {
      this.header = 'Kontakt';
    } else if (route.includes('legal')) {
      this.header = 'Impressum';
    } else if (route.includes('myBookings')) {
      this.header = 'Meine Buchungen';
    } else if (route.includes('checkout')) {
      this.header = 'Buchungsabwicklung';
    } else {
      this.header = 'Startseite';
    }
  }
}
