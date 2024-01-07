import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-successful',
  templateUrl: './checkout-successful.component.html',
  styleUrls: ['./checkout-successful.component.scss']
})
/**
 * Component for the 'CheckoutSuccessful'-View: Simulates a loading process and displays a success message to the user.
 */
export class CheckoutSuccessfulComponent implements OnInit {

  loading = true;
  heading = 'Vielen Dank für Ihre Buchung!';
  spinnerProgress = 10;
  spinnerMode = 'indeterminate';

  constructor() { }

  ngOnInit() {
    const animationCookie = document.cookie.split(';').filter(c => c.includes('animationsDisabled'))[0];
    if (animationCookie) {
      animationCookie.includes('true') ? this.spinnerMode = 'determinate' : this.spinnerMode = 'indeterminate';
    }
    this.startSpinner();
  }

  startSpinner() {
    if (this.spinnerProgress !== 130) {
      setTimeout(_ => { this.spinnerProgress += 30; this.startSpinner(); }, 1200);
    } else {
      this.loading = false;
    }
  }

}
