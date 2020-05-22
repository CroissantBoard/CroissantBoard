import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToStartComponent } from './how-to-start.component';

describe('HowToStartComponent', () => {
  let component: HowToStartComponent;
  let fixture: ComponentFixture<HowToStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
