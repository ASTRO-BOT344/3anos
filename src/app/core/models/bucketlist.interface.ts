/**
 * Representa um lugar que o casal ainda quer visitar juntos.
 * Propositalmente separado de `Momento` para que os dados da timeline
 * e os dados do bucket-list nunca se misturem no mesmo serviço.
 */
export interface BucketListItem {
  /** Identificador único (usado no trackBy do *ngFor). */
  id: string;

  /** Nome do lugar ou experiência desejada. */
  destino: string;

  /** Descrição livre do sonho/plano. */
  descricao: string;

  /** Coordenadas geográficas para exibir no mapa. */
  coordenadas: { lat: number; lng: number };

  /** Emoji opcional que personaliza o marcador. */
  icone?: string;

  /** Se `true`, esse sonho já foi realizado. */
  realizado?: boolean;
}