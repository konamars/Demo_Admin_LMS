import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedbackComponent } from './all-feedback.component';

describe('AllFeedbackComponent', () => {
  let component: AllFeedbackComponent;
  let fixture: ComponentFixture<AllFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
