import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Momento } from '../../core/models/momento.interface';
import { StoriesService } from '../../core/services/stories.service';
import { inject } from '@angular/core';

/**
 * Cria um marcador customizado (em vez do ícone padrão do Leaflet, que
 * costuma quebrar em builds do Angular por causa do bundling de assets).
 * O marcador é só uma div estilizada via CSS, então herda a paleta do site.
 */
function criarIconePersonalizado(emoji: string): L.DivIcon {
  return L.divIcon({
    className: 'momento-marker',
    html: `<span class="momento-marker__pin"><span class="momento-marker__emoji">${emoji}</span></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent {
  private readonly storiesService = inject(StoriesService);

  readonly momentos = signal<Momento[]>(this.storiesService.getMomentos());

  /** Tiles em tom escuro (CARTO Dark Matter, gratuito) para combinar com o resto do site. */
  readonly opcoesMapa = computed<L.MapOptions>(() => ({
    layers: [
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ),
    ],
    zoom: this.calcularZoomInicial(),
    center: this.calcularCentro(),
  }));

  /** Um marcador por momento, com popup mostrando título, data e local. */
  readonly camadasMarcadores = computed<L.Layer[]>(() =>
    this.momentos().map((momento) => {
      const marker = L.marker(
        [momento.coordenadas.lat, momento.coordenadas.lng],
        { icon: criarIconePersonalizado(momento.icone || '💛') }
      );

      const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(momento.data);

      marker.bindPopup(
        `<strong>${momento.titulo}</strong><br/>${dataFormatada}<br/><em>${momento.local}</em>`
      );

      return marker;
    })
  );

  private calcularCentro(): L.LatLng {
    const pontos = this.momentos();
    if (pontos.length === 0) {
      return L.latLng(-22.4706, -44.4474); // fallback: Resende, RJ
    }

    const mediaLat =
      pontos.reduce((soma, m) => soma + m.coordenadas.lat, 0) / pontos.length;
    const mediaLng =
      pontos.reduce((soma, m) => soma + m.coordenadas.lng, 0) / pontos.length;

    return L.latLng(mediaLat, mediaLng);
  }

  private calcularZoomInicial(): number {
    // Como os locais deste exemplo ficam próximos, um zoom regional funciona bem.
    // Se os momentos do casal forem espalhados por cidades/países distantes,
    // reduza este valor (ex: 4 ou 5) para enquadrar todos os marcadores.
    return 11;
  }
}
