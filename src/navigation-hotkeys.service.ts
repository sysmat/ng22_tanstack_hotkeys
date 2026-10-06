import { GLOBAL_SHORTCUTS } from './const';
import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';

import { injectHotkeys } from '@tanstack/angular-hotkeys';



@Service()
export class NavigationHotkeysService {

  readonly #globalShortcuts = inject(GLOBAL_SHORTCUTS, { optional: false });
  
  constructor() {
    injectHotkeys(
      this.#globalShortcuts.map(shortcut => ({
        hotkey: shortcut.keys,
        description: shortcut.description,
        callback: () => {
          if (shortcut.route) {
            console.log(`Navigating to ${shortcut.route}`);
          }

          if (shortcut.keys === 'Shift+/') {
            console.log('Help shortcut triggered');
          }
        },
        options: {
          preventDefault: true,
          meta: {
            name: shortcut.name,
            description: shortcut.description,
            group: 'Navigacija',
          },
        },
      })))
  }
  
}
