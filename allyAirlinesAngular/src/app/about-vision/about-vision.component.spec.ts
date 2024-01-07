import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVisionComponent } from './about-vision.component';

describe('AboutVisionComponent', () => {
  let component: AboutVisionComponent;
  let fixture: ComponentFixture<AboutVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutVisionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
