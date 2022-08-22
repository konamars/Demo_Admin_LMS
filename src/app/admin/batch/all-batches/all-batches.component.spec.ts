import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBatchesComponent } from './all-batches.component';

describe('AllBatchesComponent', () => {
  let component: AllBatchesComponent;
  let fixture: ComponentFixture<AllBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
