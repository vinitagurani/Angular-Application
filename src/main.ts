import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component'; // Ensure the correct path to your AppComponent

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Correct usage of provideHttpClient
  ]
});

