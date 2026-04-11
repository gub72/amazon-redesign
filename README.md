# Amazon Redesign - Interface com Foco em Usabilidade e UX

[![Vercel](https://img.shields.io/badge/demo-Vercel-black?logo=vercel)](https://amazon-redesign-wine.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Status](https://img.shields.io/badge/status-Completed-brightgreen)]()

**Autores:** Eduardo Perin Souza, Gustavo Buratto Neves, Vinicius Spilla  
**Orientador:** Prof. Me. Gilberto Alves Pereira  
**Instituição:** Faculdade Impacta de Tecnologia - 2025

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