import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';

/**
 * HomeComponent
 * --------------
 * Container principal da página: une o contador, a linha do tempo e o
 * mapa. Não tem lógica própria — só orquestra os componentes filhos,
 * cada um responsável pelos seus próprios dados via StoriesService.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent, TimelineComponent, MapViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
