import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Momento } from '../../core/models/momento.interface';
import { StoriesService } from '../../core/services/stories.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  private readonly storiesService = inject(StoriesService);

  /** Lista de momentos já ordenada cronologicamente pelo service. */
  readonly momentos = signal<Momento[]>(this.storiesService.getMomentos());

  trackByMomentoId(_index: number, momento: Momento): string {
    return momento.id;
  }
}
