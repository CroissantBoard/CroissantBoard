import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourPickerComponent } from './hour-picker.component';

describe('HourPickerComponent', () => {
  let component: HourPickerComponent;
  let fixture: ComponentFixture<HourPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
