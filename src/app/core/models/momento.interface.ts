/**
 * Representa um único momento/marco da história do casal.
 * Usado pelo StoriesService como fonte única de dados e consumido
 * pelos componentes de timeline e mapa.
 */
export interface Momento {
  /** Identificador único e estável (usado como trackBy no *ngFor) */
  id: string;

  /** Data em que o momento aconteceu */
  data: Date;

  /** Título curto do momento, ex: "Nosso primeiro encontro" */
  titulo: string;

  /** Descrição livre, pode ter algumas frases */
  descricao: string;

  /** Caminho/URL da imagem que ilustra o momento */
  imagem: string;

  /** Nome do local (mostrado no popup do mapa e no card da timeline) */
  local: string;

  /** Coordenadas geográficas do local, usadas pelo MapViewComponent */
  coordenadas: {
    lat: number;
    lng: number;
  };

  /** Emoji/ícone opcional para dar personalidade ao card */
  icone?: string;
}
