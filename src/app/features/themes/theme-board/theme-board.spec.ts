import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBoard } from './theme-board';

describe('ThemeBoard', () => {
  let component: ThemeBoard;
  let fixture: ComponentFixture<ThemeBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
