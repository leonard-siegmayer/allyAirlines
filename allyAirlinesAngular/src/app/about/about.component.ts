import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
/**
 * Component for the 'About'-View: Displays information about the airlines vision and answers questions in a faq section.
 */
export class AboutComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Ally Airlines - Über uns');
  }

}
