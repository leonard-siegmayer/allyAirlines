import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
/**
 * Component for the 'Contact'-View: Show multiple possibilities to contact the airline (mail, e-mail, phone, contact form).
 */
export class ContactComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private titleService: Title) {
    this.titleService.setTitle('Ally Airlines - Kontakt');
  }

  ngOnInit() {
    // initilizes the contact form
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  /**
   * Opens a snackbar to communicate the success of the contact form.
   */
  openSnackBar() {
    this.snackBar.open('Ihre Nachricht wurde versendet!', 'Schließen', {});
    this.contactForm.reset();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }
}
