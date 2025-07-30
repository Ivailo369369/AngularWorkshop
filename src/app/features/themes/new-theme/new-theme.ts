import { Component, inject } from '@angular/core';
import { AuthService, ThemesService } from '../../../core/services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-theme',
  imports: [FormsModule],
  templateUrl: './new-theme.html',
  styleUrl: './new-theme.css'
})
export class NewTheme {
 private authService = inject(AuthService);
  private themesService = inject(ThemesService);
  private router = inject(Router);

  themeName = '';
  postText = '';
  titleError = false;
  contentError = false;
  titleErrorMessage = '';
  contentErrorMessage = '';

  validateTitle(): void {
    if (!this.themeName) {
      this.titleError = true;
      this.titleErrorMessage = 'Theme name is required.';
    } else if (this.themeName.length < 5) {
      this.titleError = true;
      this.titleErrorMessage = 'Theme name must be at least 5 characters long.';
    } else {
      this.titleError = false;
      this.titleErrorMessage = '';
    }
  }

  validateContent(): void {
    if (!this.postText) {
      this.contentError = true;
      this.contentErrorMessage = 'The field with your post is required.';
    } else if (this.postText.length < 10) {
      this.contentError = true;
      this.contentErrorMessage = 'Post must be at least 10 characters long.';
    } else {
      this.contentError = false;
      this.contentErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return Boolean(this.themeName) && Boolean(this.postText) && 
           !this.titleError && !this.contentError;
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.validateTitle();
    this.validateContent();

    if (this.isFormValid()) {
      this.themesService.createTheme(
        this.themeName, 
        this.postText)
        .subscribe({
          next: () => {
            this.router.navigate(['/themes'])
          },
          error: (err) => {
            console.log('New theme failed', err);
          }
        });
    }
  }
}
