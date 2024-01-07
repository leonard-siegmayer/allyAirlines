import { Component, AfterContentInit, ContentChildren, QueryList, HostListener, HostBinding } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { RecommendationsEntryComponent } from '../recommendations-entry/recommendations-entry.component';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
/**
 * Component for the recommendation section in the 'Home'-View. Shows a list of entries, which can be navigated using tab or the arrow-keys.
 */
export class RecommendationsComponent implements AfterContentInit {
  @HostBinding('attr.tabindex') tabindex = -1;

  @ContentChildren(RecommendationsEntryComponent) entries: QueryList<RecommendationsEntryComponent>;
  private keyManager: FocusKeyManager<RecommendationsEntryComponent>;

  /**
   * Changes the selected list entry if using tab, shift + tab, arrow-up or arrow-down
   * @param event the event including the information of the pressed button(s)
   */
  @HostListener('keydown', ['$event'])
  manage(event: KeyboardEvent) {
    // the index of the recommendations-entry which was previously focused
    const previousItemIndex = +(event.target as HTMLElement).id.substring(5);
    // synchronizes the active item
    this.keyManager.updateActiveItem(previousItemIndex);
    // changes the next item, depending on the input
    if (event.code === 'Tab') {
      // updates the index of the active item, if the user navigates using tab
      event.shiftKey ? this.keyManager.updateActiveItem((previousItemIndex - 1) % 4) :
        this.keyManager.updateActiveItem((previousItemIndex + 1) % 4);
    } else {
      // uses the default handler of the keyManager (navigation with the arrow-keys)
      this.keyManager.onKeydown(event);
    }
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.entries);
  }
}
