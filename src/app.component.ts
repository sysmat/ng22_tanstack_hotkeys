import { NavigationHotkeysService } from './navigation-hotkeys.service';
import { Component, inject, signal } from '@angular/core'
import {
  formatForDisplay,
  injectHotkeyRegistrations,
  injectHotkeys,
} from '@tanstack/angular-hotkeys'
import type { Hotkey, InjectHotkeyDefinition } from '@tanstack/angular-hotkeys'


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <div class="app">
  <header>
    <h1>injectHotkeys</h1>
    <p>
      Register multiple hotkeys in a single call. Supports dynamic arrays for
      variable-length shortcut lists.
    </p>
  </header>

  <!-- Basic Multi-Hotkey -->
  <div class="demo-section">
    <h2>Basic Multi-Hotkey Registration</h2>
    <p>
      All three hotkeys are registered in a single
      <code>injectHotkeys()</code> call with <code>meta</code> for name and
      description.
    </p>
    
 
  <!-- Registrations Viewer -->
  <div class="demo-section">
    <h2>Live Registrations (injectHotkeyRegistrations)</h2>
    <p>
      This table is rendered from
      <code>injectHotkeyRegistrations()</code> — a reactive view of all
      registered hotkeys. It updates automatically as hotkeys are added,
      removed, enabled/disabled, or triggered.
    </p>
    <table class="registrations-table">
      <thead>
        <tr>
          <th>Hotkey</th>
          <th>Name</th>
          <th>Description</th>
          <th>Enabled</th>
          <th>Triggers</th>
        </tr>
      </thead>
      <tbody>
        @for (reg of registrations.hotkeys(); track reg.id) {
          <tr>
            <td>
              <kbd>{{ fd(reg.hotkey) }}</kbd>
            </td>
            <td>{{ reg.options.meta?.name ?? '—' }}</td>
            <td class="description-cell">
              {{ reg.options.meta?.description ?? '—' }}
            </td>
            <td>
              <span
                [class.status-on]="reg.options.enabled !== false"
                [class.status-off]="reg.options.enabled === false"
              >
                {{ reg.options.enabled !== false ? 'yes' : 'no' }}
              </span>
            </td>
            <td class="trigger-count">{{ reg.triggerCount }}</td>
          </tr>
        }
        @if (registrations.hotkeys().length === 0) {
          <tr>
            <td colspan="5" class="hint">No hotkeys registered</td>
          </tr>
        }
      </tbody>
    </table>
    @if (registrations.sequences().length > 0) {
      <h3 style="margin-top: 16px">Sequences</h3>
      <table class="registrations-table">
        <thead>
          <tr>
            <th>Sequence</th>
            <th>Name</th>
            <th>Description</th>
            <th>Triggers</th>
          </tr>
        </thead>
        <tbody>
          @for (reg of registrations.sequences(); track reg.id) {
            <tr>
              <td>
                <kbd>{{ formatSeq(reg.sequence) }}</kbd>
              </td>
              <td>{{ reg.options.meta?.name ?? '—' }}</td>
              <td class="description-cell">
                {{ reg.options.meta?.description ?? '—' }}
              </td>
              <td class="trigger-count">{{ reg.triggerCount }}</td>
            </tr>
          }
        </tbody>
      </table>
    }
    <pre class="code-block">
const registrations = injectHotkeyRegistrations()

// Render a live table of all registrations
registrations.hotkeys().map((reg) => ...)
// reg.hotkey, reg.options.meta?.name, reg.triggerCount</pre>
  </div>
</div>

  `,
})
export class AppComponent {

    readonly #navHotkeys = inject(NavigationHotkeysService);
  fd = (h: string) => formatForDisplay(h as Hotkey)  

  // Registrations viewer
  readonly registrations = injectHotkeyRegistrations()

  formatSeq(seq: Array<string>): string {
    return seq.map((h) => formatForDisplay(h as Hotkey)).join(' ')
  }
}
