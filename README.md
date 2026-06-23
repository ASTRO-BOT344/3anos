# Nossa História 💛

Site de "Nossa História" — uma linha do tempo para celebrar momentos especiais de um casal, com contador em tempo real e mapa dos lugares vividos juntos.

Construído em **Angular 18** (Standalone Components + Signals) e **Tailwind CSS**, com mapa via **Leaflet** (`@asymmetrik/ngx-leaflet`).

## Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18.19+ (ou 20.11+/22+) e npm.

```bash
npm install
npm start
```

Acesse `http://localhost:4200`. O site recarrega automaticamente a cada alteração.

## Como personalizar

### 1. Data de início do relacionamento (o contador)

Edite a constante `DATA_INICIO_RELACIONAMENTO` em:
`src/app/core/services/stories.service.ts`

```ts
export const DATA_INICIO_RELACIONAMENTO = new Date('2023-06-21T20:00:00');
```

### 2. Os momentos da timeline e do mapa

Toda a "história" vem de um único array tipado, no mesmo arquivo
(`stories.service.ts`). Cada item segue a interface `Momento`
(definida em `src/app/core/models/momento.interface.ts`):

```ts
{
  id: 'identificador-unico',
  data: new Date('2024-05-10'),
  titulo: 'Título do momento',
  descricao: 'Um parágrafo curto contando o que aconteceu.',
  imagem: 'caminho/ou/url/da/foto.jpg',
  local: 'Nome do lugar',
  coordenadas: { lat: -22.4706, lng: -44.4474 },
  icone: '💛', // emoji opcional usado no marcador da timeline e do mapa
}
```

Para adicionar, remover ou reordenar momentos, basta editar esse array —
a timeline e o mapa são atualizados automaticamente (o array é ordenado
por data dentro do próprio service).

### 3. Fotos reais

As fotos de exemplo vêm do picsum.photos (placeholders). Para usar fotos
reais, coloque os arquivos em `public/images/` e referencie como
`imagem: 'images/seu-arquivo.jpg'` em cada momento.

### 4. Cores e fontes

A paleta e as fontes ficam centralizadas em `tailwind.config.js`
(cores `ink`, `dusk`, `wine`, `gold`, `rose`, `parchment`, `haze` e as
famílias `display`/`body`/`script`). As fontes (Playfair Display, Outfit
e Caveat) são carregadas via Google Fonts em `src/styles.css`.

## Build de produção

```bash
npm run build
```

Os arquivos finais ficam em `dist/nossa-historia/browser`, prontos para
deploy.

## Deploy

**Vercel:** importe o repositório no [vercel.com](https://vercel.com) —
ele detecta o Angular automaticamente. Se precisar configurar manualmente:
comando de build `npm run build`, diretório de saída
`dist/nossa-historia/browser`.

**Firebase Hosting:**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# diretório público: dist/nossa-historia/browser
firebase deploy
```

## Estrutura do projeto

```
src/app/
├── core/
│   ├── models/
│   │   └── momento.interface.ts   # Tipo Momento
│   └── services/
│       └── stories.service.ts     # Fonte única dos dados (momentos + data de início)
├── components/
│   ├── timeline/                  # Lista de momentos (*ngFor)
│   ├── map-view/                  # Mapa com Leaflet
│   └── timer/                     # Contador em tempo real com Signals
└── pages/
    └── home/                      # Container que une os componentes
```
