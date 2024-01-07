import { Component, OnInit, Input, ElementRef, HostBinding, HostListener } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations-entry',
  templateUrl: './recommendations-entry.component.html',
  styleUrls: ['./recommendations-entry.component.scss']
})
/**
 * Represents an entry in the recommendations section of the 'Home'-View.
 */
export class RecommendationsEntryComponent implements FocusableOption, OnInit {
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('attr.role') role = 'link';
  @HostListener('keydown.enter') keydownEvent = this.activateLink;
  @HostListener('click') clickEvent = this.activateLink;

  @Input() recommendation: string;
  onlyCity: string;

  constructor(private element: ElementRef, private router: Router) {
  }

  ngOnInit() {
    this.onlyCity = this.recommendation.split(',')[0];
  }

  getLabel(): string {
    return this.recommendation;
  }

  focus() {
    this.element.nativeElement.focus();
  }

  activateLink() {
    this.router.navigate(['flights'], { queryParams: { arrivalAirport: this.onlyCity } });
  }
}
