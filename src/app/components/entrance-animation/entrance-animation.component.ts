import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeartParticle {
  id: number;
  x: number;   // posição horizontal em vw (relativa ao centro)
  y: number;   // posição vertical em vh (relativa ao centro)
  size: number; // tamanho em px
  duration: number; // duração da animação em ms
  delay: number;    // delay inicial em ms
  opacity: number;  // opacidade final
  rotate: number;   // rotação inicial em graus
}

const TOTAL_HEARTS = 24;

@Component({
  selector: 'app-entrance-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrance-animation.component.html',
  styleUrl: './entrance-animation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceAnimationComponent {
  /**
   * Emitido quando a animação termina e o site deve aparecer.
   * O AppComponent escuta este evento e destrói este componente.
   */
  @Output() closed = new EventEmitter<void>();

  /** Controla se a explosão de corações está ativa. */
  readonly bursting = signal(false);

  /** Lista de partículas geradas aleatoriamente ao clicar. */
  readonly particles = signal<HeartParticle[]>([]);

  onHeartClick(): void {
    if (this.bursting()) return; // evita double-click
    this.bursting.set(true);
    this.particles.set(this.generateParticles());

    // Após 2.2 s (animação + pequeno buffer), sinaliza que terminou.
    setTimeout(() => this.closed.emit(), 2200);
  }

  private generateParticles(): HeartParticle[] {
    return Array.from({ length: TOTAL_HEARTS }, (_, i) => {
      const angle = (i / TOTAL_HEARTS) * 360;
      const radius = 20 + Math.random() * 35; // vw/vh
      const rad = (angle * Math.PI) / 180;

      return {
        id: i,
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        size: 14 + Math.random() * 22,
        duration: 1400 + Math.random() * 600,
        delay: Math.random() * 300,
        opacity: 0.5 + Math.random() * 0.5,
        rotate: -20 + Math.random() * 40,
      };
    });
  }

  trackById(_: number, p: HeartParticle): number {
    return p.id;
  }
}
