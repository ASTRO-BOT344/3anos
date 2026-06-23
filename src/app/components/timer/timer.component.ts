import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATA_INICIO_RELACIONAMENTO } from '../../core/services/stories.service';

interface TempoDecorrido {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const UM_SEGUNDO_MS = 1000;

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** Data fixa de início, exposta ao template para o subtítulo. */
  readonly dataInicio = DATA_INICIO_RELACIONAMENTO;

  /**
   * Único signal "fonte da verdade": o instante atual.
   * Atualizado a cada segundo por um setInterval — tudo o mais
   * (dias, horas, minutos, segundos) é derivado dele via `computed`,
   * então o Angular só recalcula e repinta o que realmente mudou.
   */
  private readonly agora = signal(new Date());

  readonly tempoDecorrido = computed<TempoDecorrido>(() => {
    const diffMs = this.agora().getTime() - this.dataInicio.getTime();
    const totalSegundos = Math.max(0, Math.floor(diffMs / UM_SEGUNDO_MS));

    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return { dias, horas, minutos, segundos };
  });

  constructor() {
    const intervalId = setInterval(() => {
      this.agora.set(new Date());
    }, UM_SEGUNDO_MS);

    // Garante que o interval é limpo quando o componente é destruído,
    // evitando vazamento de memória/timers fantasmas.
    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  /** Ajuda o template a manter dois dígitos (ex: "07" em vez de "7"). */
  paraDoisDigitos(valor: number): string {
    return valor.toString().padStart(2, '0');
  }
}
