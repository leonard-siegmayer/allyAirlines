import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LegalComponent } from './legal/legal.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessfulComponent } from './checkout-successful/checkout-successful.component';
import { OffersComponent } from './offers/offers.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'flights', component: BookingComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/success', component: CheckoutSuccessfulComponent },
  { path: 'myBookings', component: ManageBookingsComponent },
  { path: 'offers/:campaign', component: OffersComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
