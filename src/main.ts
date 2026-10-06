import { AppComponent } from './app.component';

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
