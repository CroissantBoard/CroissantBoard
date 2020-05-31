import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineGhostContainerComponent } from './timeline-ghost-container.component';

describe('TimelineGhostContainerComponent', () => {
  let component: TimelineGhostContainerComponent;
  let fixture: ComponentFixture<TimelineGhostContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineGhostContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineGhostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
