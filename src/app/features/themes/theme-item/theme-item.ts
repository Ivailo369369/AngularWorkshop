import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeItem {
  @Input() theme!: Theme;

  private authService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUserId(): string | null {
    return this.authService.getCurrentUserId();
  }

  isSubscribed(themeId: string): boolean {
    // For now, return false. In a real app, you'd check against user's subscriptions
    return false;
  }

  toggleSubscribe(themeId: string): void {
    // For now, just log the action. In a real app, you'd make an API call
    console.log(`Toggling subscription for theme: ${themeId}`);
  }
}
