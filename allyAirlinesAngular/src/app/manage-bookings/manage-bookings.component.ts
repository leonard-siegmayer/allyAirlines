import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Booking } from '../booking';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
/**
 * Component for the 'Account'-View: Allows the user to see and cancel bookings.
 */
export class ManageBookingsComponent implements OnInit {

  myBookings: Booking[];
  displayedColumns: string[] = ['date', 'departure', 'arrival', 'price', 'options'];

  bookingForDetailView: Booking;
  cancelled = false;

  constructor(
    private dataService: DataService,
    private liveAnnouncer: LiveAnnouncer,
    private titleService: Title
  ) {
    this.titleService.setTitle('Ally Airlines - Meine Buchungen');
  }

  ngOnInit() {
    this.setBookings();
    // If no bookings are available, send message to screen reader using 'LiveAnnouncer'.
    if (this.myBookings.length === 0) {
      this.liveAnnouncer.announce('Sie haben noch keine Flüge gebucht.', 'polite');
    }
  }

  /**
   * Displays the details of a booking in an overlay.
   * @param booking the booking, which details are requested.
   */
  showBookingDetails(booking: Booking) {
    this.bookingForDetailView = booking;
  }

  /**
   * Hides the currently open overlay with the booking details.
   */
  hideBookingDetails() {
    this.bookingForDetailView = null;
    this.cancelled = false;
  }

  /**
   * Cancels a flight, by deleting it.
   * @param id the id of the flight.
   */
  deleteFlight(id: number) {
    this.dataService.deleteBooking(id);
    this.liveAnnouncer.announce('Die Buchung wurde erfolgreich storniert.', 'assertive');
    this.setBookings();
    this.cancelled = true;
  }

  /**
   * Restores a cancelled booking.
   * @param booking the booking to be restored
   */
  undoCancelBooking(booking: Booking) {
    this.dataService.saveBooking(booking); this.setBookings();
    this.liveAnnouncer.announce('Die Stornierung wurde erfolgreich rückgängig gemacht.', 'assertive');
    this.cancelled = false;
  }

  /**
   * Updates the 'myBooking' variable with all available bookings.
   */
  private setBookings() {
    this.myBookings = this.dataService.getBookings();
  }
}
