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
  tx: string;   // translate X final (vw)
  ty: string;   // translate Y final (vh)
  size: string; // font-size (px)
  dur: string;  // duração (ms)
  delay: string;// delay (ms)
  opacity: number;
  rot: string;  // rotação final (deg)
}

const TOTAL_HEARTS = 28;

@Component({
  selector: 'app-entrance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrance.component.html',
  styleUrl: './entrance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceComponent {
  /** AppComponent ouve este evento para remover a capa e exibir HomeComponent. */
  @Output() closed = new EventEmitter<void>();

  readonly exploding  = signal(false);
  readonly particles  = signal<HeartParticle[]>([]);

  onHeartClick(): void {
    if (this.exploding()) return;
    this.exploding.set(true);
    this.particles.set(this.buildParticles());
    // Após 2.4 s (2 s animação + 0.4 s fade-out overlay) notifica o pai
    setTimeout(() => this.closed.emit(), 2400);
  }

  private buildParticles(): HeartParticle[] {
    return Array.from({ length: TOTAL_HEARTS }, (_, i) => {
      const angle  = (i / TOTAL_HEARTS) * 360;
      const radius = 18 + Math.random() * 38;
      const rad    = (angle * Math.PI) / 180;
      return {
        id:      i,
        tx:      `${(Math.cos(rad) * radius).toFixed(1)}vw`,
        ty:      `${(Math.sin(rad) * radius).toFixed(1)}vh`,
        size:    `${(14 + Math.random() * 24).toFixed(0)}px`,
        dur:     `${(1300 + Math.random() * 700).toFixed(0)}ms`,
        delay:   `${(Math.random() * 250).toFixed(0)}ms`,
        opacity: +(0.45 + Math.random() * 0.55).toFixed(2),
        rot:     `${(-30 + Math.random() * 60).toFixed(0)}deg`,
      };
    });
  }

  trackById(_: number, p: HeartParticle): number { return p.id; }
}
