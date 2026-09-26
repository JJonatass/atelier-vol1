# Soluções Digitais para um Futuro Sustentável

Ferramenta interativa (React + Babel, sem build) baseada no **Livro Vol. 1** de Jonatas Silva — cobre os Capítulos 0 e 1 da metodologia de design de soluções digitais, ligada aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.

Cada seção do livro vira um wizard guiado, com o texto do livro antes de cada campo e um resumo exportável ao final:

**Capítulo 0 — Tecnologia com Propósito: os ODS da ONU**
- 0.1–0.2 Os 17 ODS e os 4 Eixos (Pessoas, Planeta, Prosperidade, Paz e Parcerias) — com os exemplos de projeto do Apêndice A
- 0.3–0.8 Tecnologia com Propósito — escolha do ODS do projeto, pesquisa de dados reais, estudo de caso e autoavaliação de Sustentabilidade/Escalabilidade/Viabilidade

**Capítulo 1 — Problematização no Design de Soluções Digitais**
- 1.1 Investigar o Problema (contexto, atores, causas, impactos, indicadores, enunciado)
- 1.2 Riscos de Criar Sem Entender (Tecnossolução, Viés de confirmação, Feature creep, Escopo nebuloso, Baixa aderência, Métricas irrelevantes)
- 1.3 Levantamento Ágil do Problema (Design Thinking, Lean Inception, User Story Mapping, JTBD)
- 1.4 Referências de Pesquisa
- 1.5 Análise de Concorrentes
- 1.6 Mapa de Empatia
- 1.7 Personas
- 1.8 Requisitos e Regras de Negócio

## Como rodar

É um app estático — não precisa de build. Basta abrir `index.html` num navegador, ou servir a pasta com qualquer servidor estático (ex.: `npx serve .`, ou GitHub Pages).

## Estrutura

- `index.html` — shell da página, carrega React/ReactDOM/Babel via CDN e os 4 arquivos abaixo.
- `part1.jsx` — utilitários, dados dos 17 ODS e componentes de UI compartilhados.
- `part2.jsx` a `part4.jsx` — os 10 artefatos (componentes React, JSX transpilado no navegador pelo Babel standalone).

Os dados preenchidos ficam salvos no `localStorage` do navegador. A tela inicial tem um painel de backup para exportar/importar/reiniciar os dados.
