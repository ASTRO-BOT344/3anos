import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EntranceComponent } from './components/entrance/entrance.component';
import { HomeComponent }     from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EntranceComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** true → mostra a capa; false → mostra o site. */
  readonly showEntrance = signal(true);

  onEntranceClosed(): void {
    // Pequeno delay para a animação de saída da capa terminar antes
    // de renderizar o HomeComponent (evita flash).
    setTimeout(() => this.showEntrance.set(false), 100);
  }
}
