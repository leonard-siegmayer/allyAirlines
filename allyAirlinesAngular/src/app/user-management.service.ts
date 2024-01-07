import { Injectable } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

/**
 * A service for the user management. Provides functions for the login and the currently logged in user.
 * Dummy implementation: Every password and username works. Information are stored in the sessionStorage of the browser.
 */
export class UserManagementService {

  loggedIn = false;

  constructor(private liveAnnouncer: LiveAnnouncer, private snackBar: MatSnackBar) {
    this.loggedIn = sessionStorage.getItem('user') != null;
  }

  /**
   * @returns whether a user is currently logged in or not.
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Function to access the currently logged in user
   * @returns the name of the user or null, if no user is currently logged in.
   */
  getLoggedIn(): string {
    return sessionStorage.getItem('user');
  }

  /**
   * Login function, which requrires only the username and will always succeed.
   * @returns a boolean value indicating the success
   */
  login(username: string): boolean {
    sessionStorage.setItem('user', username);
    this.loggedIn = true;
    this.liveAnnouncer.announce('Sie sind jetzt angemeldet.');
    this.dismissSnackbar();
    return this.isLoggedIn();
  }

  /**
   * Logout function.
   * @returns a boolean value indicating the success
   */
  logout(): boolean {
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    this.liveAnnouncer.announce('Sie sind jetzt abgemeldet.');
    return this.isLoggedIn();
  }

  /**
   * Opens a snackbar with the information, that the user needs to log in in order to make a booking.
   */
  openSnackbar() {
    this.snackBar.open('Sie müssen angemeldet sein, um einen Flug buchen zu können.', 'Schließen',
      { politeness: 'assertive' });
  }

  /**
   * Closes the snackbar, which displays the information, that the user needs to log in in order to make a booking.
   */
  dismissSnackbar() {
    this.snackBar.dismiss();
  }
}
