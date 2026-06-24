import { Injectable } from '@angular/core';
import { Momento } from '../models/momento.interface';
import { BucketListItem } from '../models/bucket-list-item.interface';

/**
 * Data fixa de início do relacionamento.
 * Altere para a data real do casal — é a partir dela que o
 * TimerComponent calcula dias/horas/minutos/segundos.
 */
export const DATA_INICIO_RELACIONAMENTO = new Date('2023-06-25T13:00:00');

/**
 * StoriesService
 * ----------------
 * Centraliza todos os dados estáticos do site: os momentos da história
 * do casal (timeline + mapa). Hoje os dados são um array tipado em
 * memória; se um dia o conteúdo crescer, basta trocar o array por uma
 * chamada HttpClient para um momentos.json sem alterar quem consome
 * o serviço (TimelineComponent e MapViewComponent).
 */
@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private readonly momentos: Momento[] = [
    {
      id: 'primeira-conversa',
      data: new Date('2022-11-19'),
      titulo: 'Nossa primeira conversa',
      descricao:
        'Você me desejando feliz aniversário e eu rindo demais "feliz aniversário caio bolsonarista" seguido de uma fig do ursihno POO.',
      imagem: '/assets/images/21_06_2026 20_07_07.png.png',
      local: 'Resende, RJ',
      coordenadas: { lat: -23.2178, lng: -44.7131 },
      icone: '📱',
    },
    {
      id: 'primeiro-encontro',
      data: new Date('2023-06-10'),
      titulo: 'O primeiro encontro',
      descricao:
        'Fomos no carrinho da Tia Malu(vulgo mãe do anão) para comer pastel.',
      imagem: '/assets/images/IMG-20230611-WA0022.jpg',
      local: 'Resende, RJ',
      coordenadas: { lat: -22.4706, lng: -44.4474 },
      icone: '🥟',
    },
    {
      id: 'primeira-vez-exapicor',
      data: new Date('2023-08-14'),
      titulo: 'A primeira vez indo na exapicor"',
      descricao:
        'A nossa primeira vez indo na exapicor juntos, fomos na roda gigante e no kamikaze, lembro que quase meu óculos e meu guarda-chuva .',
      imagem: '/assets/images/IMG-20241014-WA0012.jpg',
      local: 'Parque de exposições, Resende, RJ',
      coordenadas: { lat: -22.4631, lng: -44.4519 },
      icone: '🎫',
    },
    
    {
      id: 'um-ano',
      data: new Date('2024-06-26'),
      titulo: '1 ano de namoro',
      descricao:
        'Fomos comemorar o aniversário de 1 ano juntos, e eu te dei um buquê de rosas que você amou muito e ficou muito feliz e de tabela eu também fiquei e achei muito fofo você chorando, e eu lembro que eu ficava repetindo o vídeo várias vezes pq eu fiquei feliz que você gostou.',
      imagem: '/assets/images/primeiroAno.jpg',
      local: 'Minha casa, Resende, RJ',
      coordenadas: { lat: -22.4747, lng: -44.4408 },
      icone: '💐',
    },
    {
      id: 'primeiro-natal',
      data: new Date('2023-12-26'),
      titulo: 'Nosso primeiro natal juntos',
      descricao:
        'Passamos nosso primeiro natal juntos e foi íncrivel.',
      imagem: 'assets/images/Brave21_06_2026 20_07_07222.png',
      local: 'Resende, RJ',
      coordenadas: { lat: -22.4689, lng: -44.4452 },
      icone: '🎄',
    },
    {
      id: 'tres-anos',
      data: new Date('2026-06-26'),
      titulo: '3 anos e contando',
      descricao:
        'Três anos não foram suficientes para enjoar de você. Que venham muitos outros.',
      imagem: '/assets/images/Gemini_Generated_Image_ikrw24ikrw24ikrw.png',
      local: 'Resende, RJ',
      coordenadas: { lat: -22.4706, lng: -44.4474 },
      icone: '💛',
    },
  ];

  /** Retorna todos os momentos ordenados cronologicamente. */
  getMomentos(): Momento[] {
    return [...this.momentos].sort(
      (a, b) => a.data.getTime() - b.data.getTime()
    );
  }

  /** Retorna um único momento pelo id, útil para uma futura tela de detalhe. */
  getMomentoPorId(id: string): Momento | undefined {
    return this.momentos.find((momento) => momento.id === id);
  }

  /* ── Bucket List (sonhos futuros do casal) ──────────────────────────── */
  private readonly bucketList: BucketListItem[] = [
    { id: 'gramado',              destino: 'Gramado, RS',             descricao: 'Ver o Natal Luz e tomar cacau quente no mesmo banco.',              coordenadas: { lat: -29.3792, lng: -50.8757 }, icone: '🎄', realizado: false },
    { id: 'fernando-de-noronha',  destino: 'Fernando de Noronha, PE', descricao: 'Mergulhar no mar mais claro do Brasil.',                           coordenadas: { lat:  -3.8547, lng: -32.4239 }, icone: '🐠', realizado: false },
    { id: 'chapada-diamantina',   destino: 'Chapada Diamantina, BA',  descricao: 'Ver a Cachoeira da Fumaça e dormir sob o céu estrelado.',           coordenadas: { lat: -12.4705, lng: -41.3317 }, icone: '🌊', realizado: false },
    { id: 'lencois-maranhenses',  destino: 'Lençóis Maranhenses, MA', descricao: 'Caminhar entre as dunas e nadar nas lagoas azuis.',                 coordenadas: { lat:  -2.5148, lng: -43.1235 }, icone: '🏜️', realizado: false },
    { id: 'iguazu',               destino: 'Cataratas do Iguaçu, PR', descricao: 'Sentir a força da água e ver o arco-íris na névoa.',                coordenadas: { lat: -25.6953, lng: -54.4367 }, icone: '🌈', realizado: false },
    { id: 'pantanal',             destino: 'Pantanal, MT',            descricao: 'Ver uma onça pintada de perto de dentro do barco.',               coordenadas: { lat: -17.7239, lng: -57.5119 }, icone: '🐆', realizado: false },
    { id: 'paraty-realizado',     destino: 'Paraty, RJ',              descricao: 'Já fomos! A cidade colonial e o mar verde valeram cada quilômetro.', coordenadas: { lat: -23.2178, lng: -44.7131 }, icone: '✅', realizado: false },
  ];

  getBucketList(): BucketListItem[] {
    return [...this.bucketList];
  }
}
