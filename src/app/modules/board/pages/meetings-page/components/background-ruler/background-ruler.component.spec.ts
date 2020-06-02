import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundRulerComponent } from './background-ruler.component';

describe('BackgroundRulerComponent', () => {
  let component: BackgroundRulerComponent;
  let fixture: ComponentFixture<BackgroundRulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundRulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundRulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
