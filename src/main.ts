import {
  ApplicationConfig,
  Component,
  provideBrowserGlobalErrorListeners,
  signal,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @for (user of users(); track user.id) {
      <p>{{ user.firstName }} {{ user.lastName }}</p>
    }
   
  `,
})
export class App {
  users = signal([
    {
      id: 11,
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: 17,
      firstName: 'Jane',
      lastName: 'Doe',
    },
  ]);
}

const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
