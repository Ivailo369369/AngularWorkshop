import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Theme } from '../../../models';

@Component({
  selector: 'app-theme-item',
  imports: [],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeItem {
  @Input() theme!: Theme;
}
