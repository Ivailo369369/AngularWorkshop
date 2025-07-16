import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-item',
  imports: [CommonModule],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeItem {
  @Input() theme!: Theme;
}
