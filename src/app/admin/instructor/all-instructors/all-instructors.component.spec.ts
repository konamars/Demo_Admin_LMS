import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInstructorsComponent } from './all-instructors.component';

describe('AllInstructorsComponent', () => {
  let component: AllInstructorsComponent;
  let fixture: ComponentFixture<AllInstructorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInstructorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
