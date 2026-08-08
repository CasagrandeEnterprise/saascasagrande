# Casagrande SaaS — monorepo (Portal + Sistema de Confeitaria + Sistema de Joias)

Unifica dois sistemas sob **Login → Hub → sistema isolado**, sem fundir lógica de negócio.

## Estrutura

```
apps/
  portal/     # Login único + Hub (porta 3000)
  dona-lu/    # Sistema de Confeitaria (basePath /dona-lu, porta 3001)
  allativa/   # Sistema de Joias (basePath /allativa, porta 3002)
packages/
  auth/       # Auth.js compartilhado (JWT + cookie SSO)
```

## Fluxo

1. `http://localhost:3000/login` — autenticação central
2. `http://localhost:3000/hub` — escolha do sistema (2 cards)
3. Card A → `/dona-lu/admin` | Card B → `/allativa/admin`

## Pré-requisitos

- Node.js 18.18+ (recomendado 20 LTS)
- PostgreSQL para cada sistema (DBs separados)

## Setup

```bash
npm install
```

Configure env em cada app (mesmo `AUTH_SECRET` e mesmas credenciais de admin):

- `apps/portal/.env.local` — copie de `apps/portal/.env.example`
- `apps/dona-lu/.env` — copie de `apps/dona-lu/.env.example`
- `apps/allativa/.env` — copie de `apps/allativa/.env.example`

Nos sistemas filhos, defina também:

```env
NEXT_PUBLIC_PORTAL_URL="http://localhost:3000"
AUTH_SECRET="<igual ao portal>"
ADMIN_EMAIL="<igual ao portal>"
ADMIN_PASSWORD="<igual ao portal>"
```

## Desenvolvimento

Sobe os três apps de uma vez:

```bash
npm run dev
```

- Portal: http://localhost:3000
- Sistema de Confeitaria (direto): http://localhost:3001/dona-lu
- Sistema de Joias (direto): http://localhost:3002/allativa

O portal faz rewrite de `/dona-lu/*` e `/allativa/*` para os apps filhos.

## Isolamento

- Cada app mantém seu Prisma, CSS, componentes e Server Actions
- Rotas não colidem graças ao `basePath`
- Sessão única via cookie Auth.js (`path: /` + mesmo `AUTH_SECRET`)
