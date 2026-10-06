import { InjectionToken } from '@angular/core';
import { RegisterableHotkey } from '@tanstack/angular-hotkeys';

export type ShortcutInfo = {
  keys: RegisterableHotkey; // e.g., 'Alt+H', 'Shift+/'
  name: string; // e.g., 'Home'
  description: string; // e.g., 'Navigate to Home'
  route?: string; // Optional angular route path
};

export const GLOBAL_SHORTCUTS = new InjectionToken<ShortcutInfo[]>('GLOBAL_SHORTCUTS', {
  factory: () => [],
});

export const DEFAULT_GLOBAL_SHORTCUTS: ShortcutInfo[] = [
  { keys: 'Alt+H', name: 'Home', description: 'Navigate Domov' },
  { keys: 'Alt+S', name: 'Statistics', description: 'Navigate Statistike' },
  { keys: 'Alt+T', name: 'Status', description: 'Navigate Telefonija status' },
  { keys: 'Shift+/', name: 'Help', description: 'Odpri okno za pomoč za tipkovnične bližnjice' },
];
