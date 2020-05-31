import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMainContainerComponent } from './timeline-main-container.component';

describe('TimelineMainContainerComponent', () => {
  let component: TimelineMainContainerComponent;
  let fixture: ComponentFixture<TimelineMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
