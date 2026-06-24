import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-secret-letter',
  standalone: true,
  imports: [],
  templateUrl: './secret-letter.component.html',
  styleUrl: './secret-letter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecretLetterComponent {
  /** Emitido quando o usuário fecha a carta (botão ou backdrop). */
  @Output() closed = new EventEmitter<void>();

  /** Fecha ao pressionar Escape. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    // Fecha apenas se o clique foi no backdrop (não no card).
    if ((event.target as HTMLElement).classList.contains('letter-backdrop')) {
      this.closed.emit();
    }
  }
}
