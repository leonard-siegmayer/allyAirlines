import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOffersComponent } from './selected-offers.component';

describe('SelectedOffersComponent', () => {
  let component: SelectedOffersComponent;
  let fixture: ComponentFixture<SelectedOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedOffersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
