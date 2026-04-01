# CHANGELOG — Melhorias Aplicadas ao Projeto Amazon Redesign

## Resumo

Todas as melhorias foram aplicadas com build verificada (0 erros).
Execute `npm install` e depois `npm start` para rodar o projeto.

---

## 1. DARK MODE

**Arquivos alterados:** `index.css`, `Header.css`, `Footer.css`, `ProductCard.css`, `ProductPage.css`, `SearchPage.css`, `ProductShelf.css`, `Home.css`, `Login.css`, `LoginModal.css`, `Checkout.css`, `CheckoutProduct.css`, `Subtotal.css`, `Payment.css`, `Order.css`, `Orders.css`, `BackToTop.css`

**Arquivos criados:** `src/hooks/useDarkMode.js`

**O que foi feito:**
- Criado sistema de design tokens com CSS Custom Properties no `:root`
- 30+ variáveis de cor para light/dark: `--bg-primary`, `--bg-card`, `--text-primary`, `--accent`, etc.
- Hook `useDarkMode()` que detecta `prefers-color-scheme` do OS e persiste em `localStorage`
- Toggle no Header (desktop: botão ao lado do carrinho; mobile: dentro do menu lateral)
- Transição suave entre temas com `transition` no `body`
- Imagens levemente atenuadas no dark mode (`filter: brightness(0.92)`)
- Todos os 17 arquivos CSS atualizados para usar variáveis em vez de cores hardcoded

---

## 2. ACESSIBILIDADE (WCAG 2.1 AA)

**Arquivos criados:** `src/components/common/RouteAnnouncer.js`

**Arquivos alterados:** `App.js`, `Header.js`, `index.css`, `ProductCard.js`, `ProductPage.js`, `SearchPage.js`

**O que foi feito:**
- **Skip link**: Link "Pular para o conteúdo principal" no topo (visível via Tab)
- **Landmarks semânticos**: `<header role="banner">`, `<main id="main-content">`, `<footer>`, `<aside aria-label="Filtros de busca">`
- **Route Announcer**: Componente que anuncia mudanças de rota para screen readers via `aria-live="polite"` — resolve o problema fundamental de SPAs
- **Título dinâmico**: `document.title` atualizado a cada navegação
- **Focus visible**: Outline visível em `:focus-visible` para navegação por teclado
- **Alt text descritivo**: Imagens de produto com alt completo: `"nome — marca, avaliação X de 5, $preço"`
- **aria-label em botões**: Toggle de dark mode, filtros, busca
- **Contraste de cores corrigido**: Cinzas e laranjas ajustados para passar WCAG AA (4.5:1)
- **`prefers-reduced-motion`**: Scroll progress bar oculta; todas as animações desabilitadas

---

## 3. MICRO-INTERAÇÕES (FRAMER MOTION)

**Dependência adicionada:** `motion` (Framer Motion v12+)

**Arquivos alterados:** `App.js`, `ProductCard.js`, `ProductPage.js`, `SearchPage.js`

**O que foi feito:**
- **Transição de rotas**: `AnimatePresence` + `motion.div` com fade de 250ms entre todas as páginas
- **Product Cards**: Fade-in escalonado ao entrar na viewport (`whileInView`), elevação no hover (`y: -4`), scale no tap dos botões (`whileTap: { scale: 0.95 }`)
- **Product Page**: Fade-in ao montar (`initial: { opacity: 0, y: 10 }`)
- **Botões de compra**: `whileTap: { scale: 0.97 }` + `whileHover: { filter: brightness(0.95) }`
- Respeita `prefers-reduced-motion` nativamente

---

## 4. SKELETON LOADING

**Dependência adicionada:** `react-loading-skeleton`

**Arquivo criado:** `src/components/common/Skeletons.js`

**O que foi feito:**
- `ProductCardSkeleton`: Placeholder animado com shimmer para cards de produto
- `ProductPageSkeleton`: Placeholder para página de produto (3 colunas)
- Usado como fallback no `Suspense` durante lazy loading de rotas
- Shimmer adapta cores ao dark mode via CSS variables

---

## 5. TOAST NOTIFICATIONS

**Dependência adicionada:** `react-hot-toast`

**Arquivos alterados:** `App.js`, `ProductCard.js`, `ProductPage.js`, `Home.js`

**O que foi feito:**
- `<Toaster>` global configurado no `App.js` com estilos adaptativos (dark mode)
- "Adicionar ao carrinho" agora dispara `toast.success("Nome adicionado ao carrinho")`
- "Comprar agora" dispara `toast.success("Redirecionando para o pagamento...")`
- Removido o sistema manual de alertas do `Home.js` (useState + setTimeout)
- Acessível por padrão: usa `aria-live` internamente

---

## 6. LAZY LOADING

**Arquivo alterado:** `App.js`

**O que foi feito:**
- Todas as 8 rotas agora usam `React.lazy()` + `import()` dinâmico
- `Suspense` com fallback de skeleton loading
- Imagens de produto com `loading="lazy"` nativo do HTML
- Build gera chunks separados (cada página ~6-8KB gzipped)

---

## 7. SCROLL PROGRESS BAR

**Arquivo alterado:** `index.css`

**O que foi feito:**
- Barra fina (3px) no topo da viewport que indica progresso de scroll
- Implementada com `animation-timeline: scroll()` (CSS puro, zero JS)
- Cor: `var(--accent)` — adapta ao tema
- Oculta quando `prefers-reduced-motion: reduce`

---

## Novas dependências adicionadas

```json
"motion": "^12.x",
"react-hot-toast": "^2.x",
"react-loading-skeleton": "^3.x"
```

## Como rodar

```bash
npm install
npm start
```
