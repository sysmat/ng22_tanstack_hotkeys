import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ShortcutModalComponent } from '../../components/shortcut-modal.component';
import { GLOBAL_SHORTCUTS } from '../../util/const';
import { NavigationHotkeysService } from './navigation-hotkeys.service';

// Capture whatever array injectHotkeys() is called with, so tests can
// invoke individual shortcut callbacks directly without simulating real keypress.
vi.mock('@tanstack/angular-hotkeys', () => ({
  injectHotkeys: vi.fn(),
}));

import { injectHotkeys } from '@tanstack/angular-hotkeys';

describe('NavigationHotkeysService', () => {
  const testShortcuts = [
    { keys: 'Alt+H', description: 'Domov', route: '/queries' },
    { keys: 'Alt+S', description: 'Statistike', route: '/statistics' },
    { keys: 'Shift+/', description: 'Pomoč za tipkovnične bližnjice' },
  ];

  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let modalMock: { hasOpenModals: ReturnType<typeof vi.fn>; open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();

    routerMock = { navigate: vi.fn() };
    modalMock = { hasOpenModals: vi.fn().mockReturnValue(false), open: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NgbModal, useValue: modalMock },
        { provide: GLOBAL_SHORTCUTS, useValue: testShortcuts },
      ],
    });
  });

  function getRegisteredShortcuts() {
    // first call, first argument — the array passed to injectHotkeys(...)
    return vi.mocked(injectHotkeys).mock.calls[0][0] as Array<{
      hotkey: string;
      description: string;
      callback: () => void;
      options: { preventDefault: boolean; meta: { name: string; group: string } };
    }>;
  }

  it('registers one hotkey per configured shortcut', () => {
    TestBed.inject(NavigationHotkeysService);

    expect(injectHotkeys).toHaveBeenCalledTimes(1);
    const registered = getRegisteredShortcuts();
    expect(registered).toHaveLength(testShortcuts.length);
  });

  it('maps keys, description, and group metadata correctly', () => {
    TestBed.inject(NavigationHotkeysService);

    const registered = getRegisteredShortcuts();
    expect(registered[0]).toMatchObject({
      hotkey: 'Alt+H',
      description: 'Domov',
      options: {
        preventDefault: true,
        meta: { name: 'Domov', group: 'Navigacija' },
      },
    });
  });

  it('navigates to the shortcut route when its callback fires', () => {
    TestBed.inject(NavigationHotkeysService);

    const registered = getRegisteredShortcuts();
    const homeShortcut = registered.find(s => s.hotkey === 'Alt+H')!;

    homeShortcut.callback();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/queries']);
  });

  it('does not navigate for a shortcut with no route (Shift+/)', () => {
    TestBed.inject(NavigationHotkeysService);

    const registered = getRegisteredShortcuts();
    const helpShortcut = registered.find(s => s.hotkey === 'Shift+/')!;

    helpShortcut.callback();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('opens the help modal when Shift+/ fires and no modal is open', () => {
    modalMock.hasOpenModals.mockReturnValue(false);
    TestBed.inject(NavigationHotkeysService);

    const registered = getRegisteredShortcuts();
    const helpShortcut = registered.find(s => s.hotkey === 'Shift+/')!;

    helpShortcut.callback();

    expect(modalMock.open).toHaveBeenCalledWith(
      ShortcutModalComponent,
      expect.objectContaining({ centered: true, size: 'md' })
    );
  });

  it('does not open a second help modal if one is already open', () => {
    modalMock.hasOpenModals.mockReturnValue(true);
    TestBed.inject(NavigationHotkeysService);

    const registered = getRegisteredShortcuts();
    const helpShortcut = registered.find(s => s.hotkey === 'Shift+/')!;

    helpShortcut.callback();

    expect(modalMock.open).not.toHaveBeenCalled();
  });

  it('openHelpModal() called directly also respects hasOpenModals()', () => {
    modalMock.hasOpenModals.mockReturnValue(true);
    const service = TestBed.inject(NavigationHotkeysService);

    service.openHelpModal();

    expect(modalMock.open).not.toHaveBeenCalled();
  });
});
