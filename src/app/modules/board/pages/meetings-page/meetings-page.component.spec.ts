import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsPageComponent } from './meetings-page.component';

describe('MeetingsPageComponent', () => {
  let component: MeetingsPageComponent;
  let fixture: ComponentFixture<MeetingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
