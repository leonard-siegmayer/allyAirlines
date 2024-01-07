import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsEntryComponent } from './recommendations-entry.component';

describe('RecommendationsEntryComponent', () => {
  let component: RecommendationsEntryComponent;
  let fixture: ComponentFixture<RecommendationsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsEntryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
