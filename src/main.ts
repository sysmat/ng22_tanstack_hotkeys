import { AppComponent } from './app.component';

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DEFAULT_GLOBAL_SHORTCUTS, GLOBAL_SHORTCUTS } from './const';

const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), { provide: GLOBAL_SHORTCUTS, useValue: DEFAULT_GLOBAL_SHORTCUTS }],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
