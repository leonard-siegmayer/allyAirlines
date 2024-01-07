import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Component({
  selector: 'app-skip-link',
  templateUrl: './skip-link.component.html',
  styleUrls: ['./skip-link.component.scss']
})
/**
 * Component for Skip-Links. Can be configured by providing a description, the target element and a tabindex value for the target.
 */
export class SkipLinkComponent implements OnInit {

  @Input() description = 'Zum nächsten Abschnitt springen';
  @Input() targetElement: string;
  @Input() targetTabIndex: number;
  href: string;
  classes: string[] = ['cdk-visually-hidden'];

  constructor(private router: Router, private interactivityChecker: InteractivityChecker) { }

  ngOnInit() {
    this.updateHref();
    // changes the link destination after every navigation
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updateHref();
    });
  }

  /**
   * Changes the target of the skip link. Required to be called after each navigation.
   */
  updateHref() {
    let pathname = location.pathname;
    if (pathname.charAt(pathname.length - 1) === '/') {
      pathname = pathname.substring(0, pathname.length - 1);
    }
    this.href = `${pathname}${location.search}#${this.targetElement}`;
    this.updateTargetTabindex();
  }

  /**
   * Changes the tabindex of the target element depeding on the situation:
   * - Tabindex was provided as input: The given value will be used as new tabindex
   * - No tabindex was provided and the target is already focusable: The tabindex will not be changed.
   * - No tabinex was provided and the target is not yet focusable: The new tabindex is -1.
   */
  updateTargetTabindex() {
    const target = document.getElementById(this.targetElement);
    if (!target) { return; }
    // set targetTabIndex to -1, if no index was provided and the target is not focusable by default
    if (!this.targetTabIndex && !this.interactivityChecker.isFocusable(target)) {
      this.targetTabIndex = -1;
    }
    target.tabIndex = this.targetTabIndex;
  }

  /**
   * Hides the link after losing focus.
   */
  removeVisuallyHiddenClass() {
    this.classes = [];
  }

  /**
   * Displays the link after receiving focus.
   */
  addVisuallyHiddenClass() {
    this.classes = ['cdk-visually-hidden'];
  }
}
