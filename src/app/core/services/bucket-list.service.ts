import { Injectable } from '@angular/core';
import { BucketListItem } from '../models/bucket-list-item.interface';

/**
 * BucketListService
 * ------------------
 * Serviço separado do StoriesService propositalmente:
 * manter os dados de "sonhos futuros" desacoplados dos "memórias passadas"
 * facilita manutenção e evita que os dois cresçam juntos no mesmo arquivo.
 */
@Injectable({
  providedIn: 'root',
})
export class BucketListService {
  private readonly lugares: BucketListItem[] = [
    {
      id: 'gramado',
      destino: 'Gramado, RS',
      descricao: 'Ver o Natal Luz e sentar no mesmo banco com cacau quente.',
      coordenadas: { lat: -29.3792, lng: -50.8757 },
      icone: '🎄',
      realizado: false,
    },
    {
      id: 'fernando-de-noronha',
      destino: 'Fernando de Noronha, PE',
      descricao:
        'Mergulhar no mar mais claro do Brasil — e provar que somos bons de snorkel.',
      coordenadas: { lat: -3.8547, lng: -32.4239 },
      icone: '🐠',
      realizado: false,
    },
    {
      id: 'chapada-diamantina',
      destino: 'Chapada Diamantina, BA',
      descricao: 'Ver a Cachoeira da Fumaça e dormir sob o céu estrelado.',
      coordenadas: { lat: -12.4705, lng: -41.3317 },
      icone: '🌊',
      realizado: false,
    },
    {
      id: 'lencois-maranhenses',
      destino: 'Lençóis Maranhenses, MA',
      descricao: 'Caminhar entre as dunas e nadar nas lagoas azuis.',
      coordenadas: { lat: -2.5148, lng: -43.1235 },
      icone: '🏜️',
      realizado: false,
    },
    {
      id: 'iguazu',
      destino: 'Cataratas do Iguaçu, PR',
      descricao:
        'Sentir a força da água e ver o arco-íris no meio da névoa.',
      coordenadas: { lat: -25.6953, lng: -54.4367 },
      icone: '🌈',
      realizado: false,
    },
    {
      id: 'pantanal',
      destino: 'Pantanal, MT',
      descricao: 'Ver uma onça pintada de perto — de dentro do barco.',
      coordenadas: { lat: -17.7239, lng: -57.5119 },
      icone: '🐆',
      realizado: false,
    },
    {
      id: 'paraty-realizado',
      destino: 'Paraty, RJ',
      descricao:
        'Já fomos! A cidade colonial e o mar verde valeram cada quilômetro.',
      coordenadas: { lat: -23.2178, lng: -44.7131 },
      icone: '✅',
      realizado: false,
    },
  ];

  /** Devolve todos os itens, separando pendentes de realizados. */
  getItens(): BucketListItem[] {
    return [...this.lugares];
  }

  /** Apenas os ainda não realizados. */
  getItensPendentes(): BucketListItem[] {
    return this.lugares.filter((l) => !l.realizado);
  }

  /** Apenas os já realizados. */
  getItensRealizados(): BucketListItem[] {
    return this.lugares.filter((l) => l.realizado);
  }
}
