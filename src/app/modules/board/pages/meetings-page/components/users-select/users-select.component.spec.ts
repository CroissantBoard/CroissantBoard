import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSelectComponent } from './users-select.component';

describe('UsersSelectComponent', () => {
  let component: UsersSelectComponent;
  let fixture: ComponentFixture<UsersSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
