import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';

import { injectHotkeys } from '@tanstack/angular-hotkeys';



@Service()
export class NavigationHotkeysService {
  
  constructor() {
    injectHotkeys([
      {
        hotkey: 'Shift+S',
        callback: (_e, { hotkey }) => {
         console.log(`Hotkey ${hotkey} pressed`);
        },
        options: {
          meta: { name: 'Save', description: 'Save the current document' },
        },
      },
      {
        hotkey: 'Shift+U',
        callback: (_e, { hotkey }) => {
          console.log(`Hotkey ${hotkey} pressed`);
        },
        options: {
          meta: { name: 'Undo', description: 'Undo the last action' },
        },
      },
    ]);
  }
  
}
