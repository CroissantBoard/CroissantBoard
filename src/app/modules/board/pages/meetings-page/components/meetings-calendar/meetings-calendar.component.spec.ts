import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsCalendarComponent } from './meetings-calendar.component';

describe('MeetingsCalendarComponent', () => {
  let component: MeetingsCalendarComponent;
  let fixture: ComponentFixture<MeetingsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
