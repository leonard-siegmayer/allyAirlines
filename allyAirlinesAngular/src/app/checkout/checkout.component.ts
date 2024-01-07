import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Flight } from '../flight';
import { DataService } from '../data.service';
import { Booking } from '../booking';
import { Passenger } from '../passenger';
import { PaymentInformation } from '../payment-information';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
/**
 * Component for the 'Checkout'-View: Collects the necessary information from the user to make a booking of a flight.
 */
export class CheckoutComponent implements OnInit {

  passengerFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  flight: Flight;
  date: Date;
  today: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Ally Airlines - Buchungsabwicklung');
  }

  ngOnInit() {
    // Parameters of the selected flight
    const flightId = new URLSearchParams(window.location.search).get('id');
    this.flight = this.dataService.getFlightById(+flightId);
    this.date = new Date(new URLSearchParams(window.location.search).get('date'));

    // Tnitializes the forms
    this.passengerFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      streetAndNumber: ['', Validators.required],
      dayOfBirth: ['', Validators.required]
    });
    this.paymentFormGroup = this.formBuilder.group({
      creditCardOwner: ['', Validators.required],
      creditCardNumber: ['', Validators.required],
      securityCode: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
  }

  /**
   * Validates the form and if successful, saves the booking and navigates to the 'CheckoutSuccessful'-View.
   */
  submitBooking() {
    if (!this.paymentFormGroup.valid || !this.passengerFormGroup.valid) {
      return;
    }

    const passengerValues = this.passengerFormGroup.value;
    const passenger = new Passenger(passengerValues.firstName, passengerValues.lastName, passengerValues.value, passengerValues.city,
      passengerValues.streetAndNumber, passengerValues.dayOfBirth);

    const paymentValues = this.paymentFormGroup.value;
    const payment = new PaymentInformation(paymentValues.creditCardOwner, paymentValues.creditCardNumber, paymentValues.securityCode,
      paymentValues.expirationDate);

    const booking = new Booking(this.flight, this.date, passenger, payment);

    this.dataService.saveBooking(booking);

    this.router.navigate(['checkout/success']);
  }
}
