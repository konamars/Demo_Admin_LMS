import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUsersTableComponent } from './registered-users-table.component';

describe('RegisteredUsersTableComponent', () => {
  let component: RegisteredUsersTableComponent;
  let fixture: ComponentFixture<RegisteredUsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredUsersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
