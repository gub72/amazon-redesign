# Amazon Redesign - Interface com Foco em Usabilidade e UX

[![Vercel](https://img.shields.io/badge/demo-Vercel-black?logo=vercel)](https://amazon-redesign-wine.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Status](https://img.shields.io/badge/status-Completed-brightgreen)]()

**Autores:** Eduardo Perin Souza, Gustavo Buratto Neves, Vinicius Spilla  
**Orientador:** Prof. Me. Gilberto Alves Pereira  
**Instituição:** Faculdade Impacta de Tecnologia - 2025

---

## 🌐 Acesso ao Projeto (Deploy)

Você pode acessar e testar o protótipo funcional online através do link:  
👉 **[https://amazon-redesign-wine.vercel.app/](https://amazon-redesign-wine.vercel.app/)**

---

## 📖 Sobre o Projeto

Este projeto é o resultado prático do Trabalho de Conclusão de Curso (TCC) intitulado **"Usabilidade e Design da Interface para Marketplaces"**. O objetivo central é propor uma reformulação do layout da Amazon.com para mitigar problemas de **sobrecarga cognitiva**, **poluição visual** e **fragmentação da navegação**, aplicando princípios consolidados de **UX Design** e **Usabilidade**.

A aplicação consiste em um protótipo funcional de um **Marketplace (E-commerce)** , redesenhado especificamente nas três telas de maior impacto na jornada do usuário:
1. **Página Inicial:** Estrutura linear e progressiva, eliminando ruídos visuais.
2. **Resultados de Busca:** Filtros intuitivos, feedback visual claro e distinção de conteúdo.
3. **Página de Produto:** Layout em três colunas otimizado para decisão de compra (Galeria | Detalhes | Buy Box).

### 🧠 Fundamentação Teórica Aplicada
O desenvolvimento foi guiado pelos estudos de:
- **Jakob Nielsen** (Heurísticas de Usabilidade e Redução de Carga Cognitiva)
- **Don Norman** (Design Emocional e Invisibilidade da Tecnologia)
- **Jesse James Garrett** (Os 5 Planos da Experiência do Usuário)
- **Steve Krug** ("Não me faça pensar")

---

## ✨ Principais Melhorias Implementadas

| Aspecto | Interface Original da Amazon | Nosso Redesign |
| :--- | :--- | :--- |
| **Carga Visual** | Alta densidade de banners e blocos simultâneos | Fluxo linear com um banner principal e seções bem definidas |
| **Navegação** | Menu extenso com opções inacessíveis para visitantes | **Divulgação Progressiva**: Links úteis aparecem apenas após login |
| **Filtros** | Muitas opções, pouco intuitivos | Sidebar com chips visuais removíveis e contagem dinâmica |
| **Microinterações** | Mínimas ou inexistentes | Animações com **Motion**, notificações **Toast** e **Skeleton Loading** |
| **Acessibilidade** | Estrutura semântica complexa | Conformidade com **WCAG 2.1 AA**: Skip Links, Aria-Live, `prefers-reduced-motion` |

---

## 🛠️ Stack Tecnológica

- **Core:** [React 18](https://react.dev/) (Single Page Application)
- **Gerenciamento de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Roteamento:** [React Router v6](https://reactrouter.com/)
- **Estilização:** CSS Modules (com variáveis para Tema Claro/Escuro)
- **Animações & UX:**
    - [Motion](https://motion.dev/) (animações de entrada/saída e hover)
    - [React Hot Toast](https://react-hot-toast.com/) (feedbacks de ação)
    - [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton) (estados de carregamento)
- **Backend/Auth:** [Firebase](https://firebase.google.com/) (Autenticação)
- **Hospedagem:** [Vercel](https://vercel.com/)

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar o protótipo em sua máquina local.

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn

### 🔧 Instalação e Execução

1. Clone o repositório (ou faça o download dos arquivos):
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd amazon-redesign
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou caso utilize yarn
   yarn install
   ```

4. Variáveis de Ambiente (Firebase):
   - Crie um arquivo `.env.local` na raiz do projeto contendo as credenciais do Firebase (necessárias para o sistema de Login/Cadastro):
     ```env
     REACT_APP_FIREBASE_API_KEY=sua_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
     REACT_APP_FIREBASE_APP_ID=seu_app_id
     ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou caso utilize yarn
   yarn start
   ```

O protótipo estará disponível no seu navegador em `http://localhost:3000`.

---

## 📁 Estrutura do Projeto

A arquitetura foi pensada de maneira modular, facilitando a manutenção e compreensão do código:

```text
src/
├── assets/          # Imagens, vídeos e logos (ex: bannerMain)
├── components/      # Componentes UI reutilizáveis (Header, Checkout, Banner, Slider, etc.)
├── features/        # (Opcional) Lógica modularizada de features e Slices do Redux
├── pages/           # Componentes que representam as telas finais
├── styles/          # Arquivos e módulos CSS organizados
├── store/           # Configuração da store do Redux (ex: basket, user)
├── utils/           # Funções auxiliares consolidadas (ex: utils.js, currencyFormatter)
└── firebase.js      # Configuração e inicialização do Firebase e autenticação
```

---

## 🎨 Tema Claro / Escuro (Dark Mode)

A experiência do usuário foi ampliada com o suporte dinâmico a temas. Gerenciado globalmente por meio de variáveis no CSS e alternado via menu no Header, o tema não apenas obedece aos critérios de preferências visuais e acessibilidade, como ajuda a reduzir o esforço ocular em ambientes de baixa luminosidade.

---

## 📝 Licença e Avisos Legais

Este projeto foi desenvolvido com finalidade estritamente **acadêmica**, sendo parte integrante do Trabalho de Conclusão de Curso (TCC) da Faculdade Impacta de Tecnologia. 

> **Aviso:**
> Este sistema não possui fins comerciais ou lucrativos. Todas as imagens de produtos, marcas (como o logo da Amazon) e demais conteúdos ilustrativos utilizados neste protótipo são propriedade de seus respectivos criadores e detentores de direitos autorais. O redesign proposto caracteriza-se como um Exercício de Design (Study Case).