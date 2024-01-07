import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
/**
 * Component for the main navigationbar of the application.
 */
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean;
  showCollapseNav: boolean;

  constructor(private userManagementService: UserManagementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.updateLoginStatus();
    this.showCollapseNav = window.innerWidth <= 960;
    window.onresize = (_ => this.showCollapseNav = window.innerWidth <= 960);
  }

  /**
   * Updates the isLoggedIn variable in this component and in the UserManagementService.
   */
  logout() {
    this.isLoggedIn = this.userManagementService.logout();
  }

  /**
   * Opens the dialog, which provides the login form.
   */
  openLoginDialog() {
    const dialog = this.dialog.open(LoginDialogComponent, { ariaLabel: 'Anmeldedialog', role: 'dialog' });
    dialog.afterClosed().subscribe(_ => this.updateLoginStatus());
  }

  /**
   * Update the 'isLoggedIn' variable of the component, depending on the status in the UserManagementService.
   */
  updateLoginStatus() {
    this.isLoggedIn = this.userManagementService.isLoggedIn();
    document.getElementById('mainHeader').focus();
  }

  /**
   * Displays the dropdown menu of the account link. (For keyboard accessibility)
   */
  triggerMyAccountNav(trigger: MatMenuTrigger) {
    trigger.openMenu();
  }
}
