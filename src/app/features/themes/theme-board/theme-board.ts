import { Component } from '@angular/core';
import { ThemesService } from '../../../core/services';
import { Theme } from '../../../models';
import { ThemeItem } from "../theme-item/theme-item";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-board',
  imports: [CommonModule, ThemeItem],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
  themes$: Observable<Theme[]>;

  constructor(private themeService: ThemesService) {
    this.themes$ = this.themeService.getThemes();
  }
}

