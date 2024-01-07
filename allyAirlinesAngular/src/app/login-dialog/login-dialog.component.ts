import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
/**
 * Component for the login dialog: Every username and password will succeed.
 */
export class LoginDialogComponent implements OnInit {

  username: string;
  password: string;

  loginForm: FormGroup;

  constructor(
    private formatBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
  ) { }

  ngOnInit() {
    // initilizes the login form
    this.loginForm = this.formatBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Dummy login functionality. Always succeeds.
   */
  login() {
    this.userManagementService.login(this.loginForm.value.username);
    this.dialogRef.close();
  }
}
