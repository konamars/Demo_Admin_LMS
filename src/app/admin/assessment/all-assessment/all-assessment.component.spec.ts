import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssessmentComponent } from './all-assessment.component';

describe('AllAssessmentComponent', () => {
  let component: AllAssessmentComponent;
  let fixture: ComponentFixture<AllAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
