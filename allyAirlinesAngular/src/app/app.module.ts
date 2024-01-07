import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatMenuModule, MatDividerModule, MatButtonModule, MatExpansionModule,
  MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatRippleModule, MatInputModule,
  MatIconModule, MatCardModule, MatDialogModule, MatTabsModule, MatStepperModule,
  MatProgressSpinnerModule, MatBadgeModule, MatTableModule, MatSortModule, MatSnackBarModule,
  MatAutocompleteModule, MatSidenavModule, MatBottomSheetModule, MatListModule, MatPaginatorModule, MatGridListModule, MatSlideToggleModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessfulComponent } from './checkout-successful/checkout-successful.component';
import { AboutComponent } from './about/about.component';
import { LegalComponent } from './legal/legal.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { SelectedOffersComponent } from './selected-offers/selected-offers.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { SkipLinkComponent } from './skip-link/skip-link.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutFaqComponent } from './about-faq/about-faq.component';
import { AboutVisionComponent } from './about-vision/about-vision.component';

import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/de-at';
import { RecommendationsEntryComponent } from './recommendations-entry/recommendations-entry.component';
import { A11yModule } from '@angular/cdk/a11y';
import { RelativedatePipe } from './relativedate.pipe';
import { TimePipe } from './time.pipe';

registerLocaleData(localeDeAt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OffersComponent,
    BookingComponent,
    CheckoutComponent,
    CheckoutSuccessfulComponent,
    AboutComponent,
    LegalComponent,
    ContactComponent,
    SearchComponent,
    RecommendationsComponent,
    ReviewsComponent,
    PopularDestinationsComponent,
    SelectedOffersComponent,
    LoginDialogComponent,
    SearchResultsComponent,
    ManageBookingsComponent,
    SkipLinkComponent,
    NavigationComponent,
    AboutFaqComponent,
    AboutVisionComponent,
    RecommendationsEntryComponent,
    RelativedatePipe,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    A11yModule,
    MatGridListModule,
    MatSlideToggleModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-at' }],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
