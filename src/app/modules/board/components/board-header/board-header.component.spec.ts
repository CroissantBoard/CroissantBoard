import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderComponent } from './board-header.component';

describe('BoardHeaderComponent', () => {
  let component: BoardHeaderComponent;
  let fixture: ComponentFixture<BoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
