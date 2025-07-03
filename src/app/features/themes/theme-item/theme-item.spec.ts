import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeItem } from './theme-item';

describe('ThemeItem', () => {
  let component: ThemeItem;
  let fixture: ComponentFixture<ThemeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
