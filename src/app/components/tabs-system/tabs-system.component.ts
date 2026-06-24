import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from '../timeline/timeline.component';
import { TimerComponent }    from '../timer/timer.component';
import { BucketListComponent } from '../bucket-list/bucket-list.component';
import { SecretLetterComponent } from '../secret-letter/secret-letter.component';

export type TabId = 'historia' | 'futuro' | 'tempo';

interface Tab {
  id: TabId;
  label: string;
  emoji: string;
}

/** Quantos cliques consecutivos no rodapé ativam o easter egg. */
const EASTER_EGG_CLICKS = 3;

/** Janela de tempo (ms) dentro da qual os cliques devem ocorrer. */
const EASTER_EGG_WINDOW = 1200;

@Component({
  selector: 'app-tabs-system',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
    TimerComponent,
    BucketListComponent,
    SecretLetterComponent,
  ],
  templateUrl: './tabs-system.component.html',
  styleUrl: './tabs-system.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsSystemComponent {

  /* ── Abas ──────────────────────────────────────────────────────────────── */

  readonly tabs: Tab[] = [
    { id: 'historia', label: 'História',    emoji: '📖' },
    { id: 'futuro',   label: 'Futuro',      emoji: '🌟' },
    { id: 'tempo',    label: 'Nosso Tempo', emoji: '⏱️' },
  ];

  readonly abaAtiva = signal<TabId>('historia');

  mudarAba(id: TabId): void {
    this.abaAtiva.set(id);
  }

  /* ── Easter Egg ─────────────────────────────────────────────────────────── */

  readonly mostrarCarta = signal(false);

  private clickTimes: number[] = [];

  onFooterClick(): void {
    const agora = Date.now();

    // Remove cliques fora da janela de tempo
    this.clickTimes = this.clickTimes.filter(
      (t) => agora - t < EASTER_EGG_WINDOW
    );
    this.clickTimes.push(agora);

    if (this.clickTimes.length >= EASTER_EGG_CLICKS) {
      this.clickTimes = [];
      this.mostrarCarta.set(true);
    }
  }

  fecharCarta(): void {
    this.mostrarCarta.set(false);
  }
}
