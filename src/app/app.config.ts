import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationInterceptor, ErrorInterceptor } from './core/interceptors';
import { provideStore } from '@ngrx/store';
import { reducers } from './core/store';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './core/store/posts/post.effects';
import { ThemeEffects } from './core/store/themes/theme.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthenticationInterceptor, ErrorInterceptor])
    ),
    provideStore(reducers),
    provideEffects([ThemeEffects, PostEffects]),
    provideStoreDevtools()
  ]
};
