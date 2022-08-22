import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchComponent } from './add-batch.component';

describe('AddBatchComponent', () => {
  let component: AddBatchComponent;
  let fixture: ComponentFixture<AddBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
