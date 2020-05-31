import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineHandleComponent } from './timeline-handle.component';

describe('TimelineHandleComponent', () => {
  let component: TimelineHandleComponent;
  let fixture: ComponentFixture<TimelineHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
