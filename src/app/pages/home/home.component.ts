import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent }    from '../../components/timeline/timeline.component';
import { TimerComponent }       from '../../components/timer/timer.component';
import { BucketListComponent }  from '../../components/bucket-list/bucket-list.component';
import { SecretLetterComponent } from '../../components/secret-letter/secret-letter.component';

export type TabId = 'historia' | 'futuro' | 'tempo';

const EASTER_CLICKS  = 3;
const EASTER_WINDOW  = 1200; // ms

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
    TimerComponent,
    BucketListComponent,
    SecretLetterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  /* ── abas ────────────────────────────────────────────────────────────── */
  readonly tabs = [
    { id: 'historia' as TabId, label: 'História',    emoji: '📖' },
    { id: 'futuro'   as TabId, label: 'Futuro',      emoji: '🌟' },
    { id: 'tempo'    as TabId, label: 'Nosso Tempo', emoji: '⏱️' },
  ] as const;

  readonly abaAtiva = signal<TabId>('historia');
  mudarAba(id: TabId): void { this.abaAtiva.set(id); }

  /* ── easter egg (clique triplo no rodapé) ────────────────────────────── */
  readonly mostrarCarta = signal(false);
  private eggClicks: number[] = [];

  onFooterClick(): void {
    const now = Date.now();
    this.eggClicks = this.eggClicks.filter(t => now - t < EASTER_WINDOW);
    this.eggClicks.push(now);
    if (this.eggClicks.length >= EASTER_CLICKS) {
      this.eggClicks = [];
      this.mostrarCarta.set(true);
    }
  }

  fecharCarta(): void { this.mostrarCarta.set(false); }
}
