import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSuccessfulComponent } from './checkout-successful.component';

describe('CheckoutSuccessfulComponent', () => {
  let component: CheckoutSuccessfulComponent;
  let fixture: ComponentFixture<CheckoutSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutSuccessfulComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
