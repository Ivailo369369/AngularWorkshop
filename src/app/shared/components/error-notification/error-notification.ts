import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services';

@Component({
  selector: 'app-error-notification',
  imports: [],
  templateUrl: './error-notification.html',
  styleUrl: './error-notification.css'
})
export class ErrorNotification {
  private errorService = inject(ErrorService);

  readonly error = this.errorService.error;
}
