import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommonModule } from '@angular/common';
import { BucketListItem } from '../../core/models/bucket-list-item.interface';
import { BucketListService } from '../../core/services/bucket-list.service';

/** Cores diferentes das usadas no MapViewComponent (#e8b83d = dourado). */
const COR_PENDENTE = '#a78bfa';  // lilás/roxo
const COR_REALIZADO = '#34d399'; // verde esmeralda

function criarMarcadorBucket(item: BucketListItem): L.DivIcon {
  const cor = item.realizado ? COR_REALIZADO : COR_PENDENTE;
  const emoji = item.icone ?? '📍';

  return L.divIcon({
    className: 'bucket-marker',
    html: `
      <span class="bucket-marker__pin" style="background:${cor}">
        <span class="bucket-marker__emoji">${emoji}</span>
      </span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [LeafletModule, CommonModule],
  templateUrl: './bucket-list.component.html',
  styleUrl: './bucket-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BucketListComponent {
  private readonly service = inject(BucketListService);

  readonly itens = signal<BucketListItem[]>(this.service.getItens());
  readonly pendentes = computed(() => this.itens().filter((i) => !i.realizado));
  readonly realizados = computed(() => this.itens().filter((i) => i.realizado));

  readonly opcoesMapa = computed<L.MapOptions>(() => ({
    layers: [
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ),
    ],
    zoom: 4,
    center: L.latLng(-15.77, -47.93), // centro do Brasil
  }));

  readonly marcadores = computed<L.Layer[]>(() =>
    this.itens().map((item) => {
      const marker = L.marker(
        [item.coordenadas.lat, item.coordenadas.lng],
        { icon: criarMarcadorBucket(item) }
      );

      const status = item.realizado ? '✅ Visitado!' : '🌟 Na lista dos sonhos';
      marker.bindPopup(
        `<strong>${item.icone ?? ''} ${item.destino}</strong><br/>
         <em>${item.descricao}</em><br/>
         <span>${status}</span>`
      );

      return marker;
    })
  );

  trackById(_: number, item: BucketListItem): string {
    return item.id;
  }
}