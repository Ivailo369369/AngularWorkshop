import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTheme } from './new-theme';

describe('NewTheme', () => {
  let component: NewTheme;
  let fixture: ComponentFixture<NewTheme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTheme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTheme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
