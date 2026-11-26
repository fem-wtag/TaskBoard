import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { DatePipe } from '@angular/common';
import { PriorityLabelPipe } from './priority-label-pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    DatePipe,
    PriorityLabelPipe,
    provideRouter(routes),
  ],
};
