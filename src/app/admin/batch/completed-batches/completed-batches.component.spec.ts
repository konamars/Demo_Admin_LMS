import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedBatchesComponent } from './completed-batches.component';

describe('CompletedBatchesComponent', () => {
  let component: CompletedBatchesComponent;
  let fixture: ComponentFixture<CompletedBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
