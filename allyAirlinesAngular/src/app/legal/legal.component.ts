import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
/**
 * Component for the 'Legal'-View.
 */
export class LegalComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Ally Airlines - Impressum');
  }

}
