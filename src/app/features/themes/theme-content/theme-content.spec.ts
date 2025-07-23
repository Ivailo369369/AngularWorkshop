import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeContent } from './theme-content';

describe('ThemeContent', () => {
  let component: ThemeContent;
  let fixture: ComponentFixture<ThemeContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
