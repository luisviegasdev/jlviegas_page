# SPECS — Luis Viegas Portfólio

It`s a portfolio page that introduces me and show a little bit of me and my work. Its going to be in english and portuguese, so i need a switch button for that. English first.

---

## 1. Project Overview

| Field               | Value                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Project name**    | Lumo Digital Architecture & Development Hub                                                                      |
| **Client / brand**  | Lumo Soluções / Personal Brand Portfolio                                                                         |
| **Website type**    | Portfolio                                                                                                        |
| **Primary goal**    | Establish elite authority in full-stack development and bespoke web architecture, prompting high-tier inquiries. |
| **Secondary goal**  | Articulate a clear four-stage operational workflow that builds immediate strategic trust with remote clients.    |
| **Target audience** | Corporate clients, luxury brands, real estate management firms, and tech founders looking for premium code.      |
| **Tone of voice**   | Professional and warm                                                                                            |
| **Launch deadline** | TBD                                                                                                              |

---

## 2. Brand Guidelines

### Colors

Define every color as a CSS custom property. Claude will wire these directly into `tailwind.config.ts`.

| Token name           | Hex       | Role      | Usage                               |
| -------------------- | --------- | --------- | ----------------------------------- |
| `--color-primary`    | `#F0EFEB` | Primary   | Main CTAs, key highlights           |
| `--color-secondary`  | `#000000` | Secondary | Supporting elements                 |
| `--color-accent`     | `#E62815` | Accent    | Hover states, subtle highlights     |
| `--color-text-card`  | `#FFFFFF` | Card      | Card / panel background             |
| `--color-text-muted` | `#575757` | Muted     | Subtle backgrounds, disabled states |
| `--color-border`     | `#D8D6D0` | Border    | Dividers, input outlines            |

> Token names follow shadcn/ui convention exactly — do not rename them.
> Add project-specific tokens below the line if needed.

**Dark mode:** No

---

### Typography

| Role               | Font Family            | Weights  | Variable name    | Notes                 |
| ------------------ | ---------------------- | -------- | ---------------- | --------------------- |
| Display / Headings | Manuka-Condensed-Black | 600, 700 | `--font-display` | H1–H3                 |
| Body               | FeatureDisplay-Bold    | 400, 500 | `--font-body`    | Paragraphs, UI labels |
| Mono               | FeatureDisplay-Regular | 400      | `--font-mono`    | Code, tags (optional) |

**Font source:** Self-hosted (`public/fonts/`)

**Loading strategy:** `next/font/local` (self-hosted)

### Type Scale — Default

> Base: 16px · Ratio: 1.25 (Major Third) · Language: PT/EN

| Token          | Size (rem) | Weight | Line-height | Tracking | Usage                |
| -------------- | ---------- | ------ | ----------- | -------- | -------------------- |
| `text-display` | 4.209      | 700    | 1.05        | -0.04em  | Hero headlines       |
| `text-h1`      | 3.157      | 700    | 1.1         | -0.03em  | Page titles          |
| `text-h2`      | 2.369      | 600    | 1.2         | -0.02em  | Section headings     |
| `text-h3`      | 1.777      | 600    | 1.3         | -0.01em  | Sub-section headings |
| `text-body-lg` | 1.25       | 400    | 1.7         | 0        | Lead paragraphs      |
| `text-body`    | 1.0        | 400    | 1.65        | 0        | Body copy            |
| `text-sm`      | 0.875      | 400    | 1.5         | 0.01em   | Captions, labels     |
| `text-xs`      | 0.75       | 400    | 1.4         | 0.02em   | Legal, meta          |

**Notes:**

- **Display & H1** — Negative tracking because large titles accumulate optical space between letters. The larger the size, the more negative the tracking.
- **Body copy** — `line-height: 1.65` instead of the classic `1.5` for better breathing in dense text (PT/EN).
- **sm & xs** — Slightly positive tracking to maintain legibility at small sizes.
- **Headings (H1–H3)** — Weight 600–700 assuming a display font with personality. If the font is naturally heavy (slab serif), reduce to 500–600.

---

### Logo

| Asset        | File                           | Format       | Usage             |
| ------------ | ------------------------------ | ------------ | ----------------- |
| Primary logo | `public/images/logo.svg`       | SVG          | Default           |
| Logo – white | `public/images/logo-white.svg` | SVG          | Dark backgrounds  |
| Logo – dark  | `public/images/logo-dark.svg`  | SVG          | Light backgrounds |
| Favicon      | `public/favicon.ico`           | ICO          | Browser tab       |
| OG image     | `public/images/og-image.jpg`   | JPG 1200×630 | Social sharing    |

**Minimum width:** 120px
**Clear space:** 24px on all sides
**Never:** stretch, recolor, place on clashing backgrounds

---

### Visual Style

**Aesthetic direction:** Editorial-minimal
**Mood:** Calm and precise

**Border radius scale:**

| Token           | Value  | Usage          |
| --------------- | ------ | -------------- |
| `--radius-sm`   | 4px    | Inputs, badges |
| `--radius-md`   | 8px    | Cards, buttons |
| `--radius-lg`   | 12px   | Modals, panels |
| `--radius-full` | 9999px | Pills, avatars |

> shadcn/ui reads `--radius` as its base radius.
> `--radius`: 0.5rem

**Shadow style:** None
**Photography style:** None
**Icon library:** `lucide-react` (default with shadcn)

---

## 3. Tech Stack

This is fixed for every project. Do not deviate without explicit instruction.

### Core

| Layer             | Choice               | Version     |
| ----------------- | -------------------- | ----------- |
| Framework         | Next.js (App Router) | latest      |
| Language          | TypeScript           | strict mode |
| Styling           | Tailwind CSS v4      | latest      |
| Component library | shadcn/ui            | latest      |
| Package manager   | pnpm                 | latest      |

### Scaffold Command

```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Then initialise shadcn/ui:

```bash
pnpm dlx shadcn@latest init
```

### Tailwind Config Additions (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--color-primary))',
					foreground: 'hsl(var(--color-primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--color-secondary))',
					foreground: 'hsl(var(--color-secondary-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--color-accent))',
					foreground: 'hsl(var(--color-accent-foreground))',
				},
				background: 'hsl(var(--color-background))',
				foreground: 'hsl(var(--color-foreground))',
				card: {
					DEFAULT: 'hsl(var(--color-card))',
					foreground: 'hsl(var(--color-card-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--color-muted))',
					foreground: 'hsl(var(--color-muted-foreground))',
				},
				border: 'hsl(var(--color-border))',
				ring: 'hsl(var(--color-ring))',
				destructive: 'hsl(var(--color-destructive))',
			},
			fontFamily: {
				display: ['var(--font-display)', 'serif'],
				body: ['var(--font-body)', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				full: 'var(--radius-full)',
			},
		},
	},
};

export default config;
```

### Folder Structure

```
src/
├── app/
│   ├── layout.tsx          ← root layout, font setup, metadata
│   ├── page.tsx            ← home page
│   ├── globals.css         ← CSS variables, base styles
│   └── [slug]/
│       └── page.tsx        ← one file per route
├── components/
│   ├── ui/                 ← shadcn/ui generated components (do not edit)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/           ← one component per page section
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── ...
├── lib/
│   └── utils.ts            ← shadcn cn() utility
├── types/
│   └── index.ts            ← shared TypeScript types
└── public/
    ├── images/
    ├── fonts/              ← self-hosted fonts (if applicable)
    └── favicon.ico
```

### shadcn/ui Components to Install

Install with `pnpm dlx shadcn@latest add [component]`:

- [x] button
- [x] card
- [x] badge
- [x] input
- [x] textarea
- [x] label
- [x] form (+ react-hook-form + zod)
- [x] navigation-menu
- [x] sheet (mobile nav drawer)
- [x] accordion (FAQ)
- [ ] carousel (testimonials / gallery)
- [ ] dialog (modals)
- [x] separator
- [ ] avatar
- [ ] tooltip
- [ ] tabs
- [ ] dropdown-menu

### Animation

| Library             | Purpose                                             | Install                   |
| ------------------- | --------------------------------------------------- | ------------------------- |
| framer-motion       | Page transitions, scroll animations, hero entrances | `pnpm add framer-motion`  |
| tailwindcss-animate | Simple CSS animations via Tailwind classes          | included with shadcn init |

**Animation approach:** Only animate `transform` and `opacity`. Never `transition-all`. Use framer-motion for scroll-triggered reveals and hero sequences. Use Tailwind animate classes for hover/focus micro-interactions.

### Additional Libraries

| Library               | Use case                            | Install                                            |
| --------------------- | ----------------------------------- | -------------------------------------------------- |
| next-themes           | Dark mode toggle                    | `pnpm add next-themes`                             |
| react-hook-form + zod | Contact form validation             | `pnpm add react-hook-form zod @hookform/resolvers` |
| sharp                 | Image optimisation (Next.js)        | `pnpm add sharp`                                   |
| clsx + tailwind-merge | Class merging (included via shadcn) | —                                                  |
| lucide-react          | Icons (included via shadcn)         | —                                                  |

### Hosting & Deployment

**Target:** Vercel
**Domain:** lumosolucoes.com

**Environment variables:**

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://lumosolucoes.com
```

---

## 4. Site Structure

### Sitemap

```
/           → Home       → src/app/page.tsx
/about      → About      → src/app/about/page.tsx
/services   → Services   → src/app/services/page.tsx
/contact    → Contact    → src/app/contact/page.tsx
```

### Navigation

**Nav type:** Top bar

**Nav items (in order):**

1. Works
2. Experience
3. Methodology
4. Connect
   **CTA in nav:** Yes — Label: `Let's Build` — Links to: `/contact`
   **Sticky nav:** Yes
   **Mobile breakpoint:** md (768px) — hamburger below this

---

## 5. Page Sections

### Home (`/`)

- [x] **Hero** — Headline: `BESPOKE DIGITAL CONSTRUCTIONS FOR AMBITIOUS SYSTEMS` / Subheadline: A sophisticated merge of structural code architecture and minimalist art direction. We build crisp, performance-driven web ecosystems engineered to engage modern audiences with absolute clarity. / CTA: `View Systems → /contact`
- [x] **Selected Systems (Works)** — High-fidelity list layout showcasing digital platforms with clean structural metadata.
- [x] **Core Engineering (Services)** — Breakdown of technical competencies across the full Next.js stack, cloud automation, and high-fidelity client solutions.
- [x] **The Mechanism (Methodology)** — A sequential narrative explaining the four key architectural phases of deployment.
- [x] **Footer**

### About (`/about`)

- [x] **The Philosophy** — Deep dive into structural precision, engineering integrity, and the minimalist aesthetic that defines our digital production workflow.
- [x] **Background & Evolution** — A linear track record showcasing over a decade of operational management, inventory coordination, and large-scale architectural infrastructure coordination transformed into digital systems engineering.
- [x] **Footer**

### Services (`/services`)

- [x] **Technical Overview** — Complete architectural breakdown of our design and technology stack capabilities.
- [x] **Strategic Solutions** — Tailored operations for real estate platforms, enterprise workflows, asset management tools, and premium branding footprints.
- [x] **Footer**

### Contact (`/contact`)

- [x] **Inquiry Desk** — Minimalist validation form built for high-tier architectural proposals and strategic consultation scheduling.
- [x] **Footer**

---

## 6. Footer

**Columns:**

1. **Lumo** — Structural Web Engineering & Minimalist Design. © 2026. All rights reserved.
2. **System Directory** — Home, Works, Experience, Methodology, Connect
3. **Direct Protocol** — GitHub, LinkedIn, Email
   **Social platforms:** GitHub, LinkedIn
   **Legal copy:** © 2026 Lumo Soluções. All rights reserved.
   **Links:** Privacy Policy / Terms

---

## 7. Copy & Content

**Who writes the copy:** Claude writes final copy tailored from inspiration references.
**Language:** English / Portuguese (Bilingual Support Matrix)

**Key messages:**

1. **Precision & Rigor:** Web engineering treated with the exact same architectural rules and restraint as physical product design.
2. **The Intersection:** A flawless transition zone where bulletproof TypeScript logic meets structural, minimalist layout.
3. **Operational Clarity:** Clear visibility over the entire project pipeline via an uncompromising 4-step production timeline.
   **CTAs across the site:**

| Label          | Destination | Context                                        |
| -------------- | ----------- | ---------------------------------------------- |
| Init System    | /contact    | Main interaction toggle on primary Hero frames |
| View Project   | /works      | Case detail link embedded in work matrices     |
| Lock Direction | /contact    | Terminal block action at workflow boundaries   |

---

## COMPLETE COPY BOOK (ENGLISH & PORTUGUESE)

---

### HOME PAGE COPY

#### Hero Section

**EN:**

> **Display Headline:** BESPOKE DIGITAL CONSTRUCTIONS FOR AMBITIOUS SYSTEMS.
>
> **Lead Body Text:** A sophisticated merge of structural code architecture and minimalist art direction. We build crisp, performance-driven web ecosystems engineered to engage modern audiences with absolute clarity. No artificial layers. Just pure technical precision.
>
> **Primary CTA Button:** Init System Protocol →
>
> **Secondary Link:** View Case Logs

**PT:**

> **Display Headline:** CONSTRUÇÕES DIGITAIS SOB MEDIDA PARA SISTEMAS AMBICIOSOS.
>
> **Lead Body Text:** Uma fusão sofisticada entre arquitetura de código estrutural e direção de arte minimalista. Desenvolvemos ecossistemas web de alta performance engenhados para engajar audiências modernas com clareza absoluta. Sem camadas artificiais. Apenas precisão técnica pura.
>
> **Primary CTA Button:** Iniciar Protocolo de Sistema →
>
> **Secondary Link:** Ver Registros de Casos

---

#### Selected Systems / Works Section

**EN:**

> **Section Heading:** SELECTED SYSTEMS
>
> **Section Subheading:** High-fidelity products engineered for operational clarity and visual depth.
>
> **Project 01 Meta:** [01 / SYSTEM MANAGEMENT PLATFORM]
> **Project 01 Title:** REALIO ASSET ARCHITECTURE
> **Project 01 Description:** A high-end real estate and property portfolio network operating with machine learning capabilities, predictive analytical frameworks, and modular database nodes.
> **Project 01 Tags:** Next.js · TypeScript · Tailwind CSS v4 · Node.js
>
> **Project 02 Meta:** [02 / DIGITAL ARCHIVE]
> **Project 02 Title:** MEOWSEUM GALLERIES
> **Project 02 Description:** An ultra-minimalist asynchronous image repository featuring optimized media serving and clean viewport scaling interactions.
> **Project 02 Tags:** React · Vite · Express · MongoDB

**PT:**

> **Section Heading:** SISTEMAS SELECIONADOS
>
> **Section Subheading:** Produtos de alta fidelidade desenvolvidos para máxima clareza operacional e profundidade visual.
>
> **Project 01 Meta:** [01 / PLATAFORMA DE GESTÃO DE SISTEMAS]
> **Project 01 Title:** ARQUITETURA DE ATIVOS REALIO
> **Project 01 Description:** Uma rede de portfólio imobiliário de alto padrão operando com capacidades de machine learning, frameworks analíticos preditivos e nós de banco de dados modulares.
> **Project 01 Tags:** Next.js · TypeScript · Tailwind CSS v4 · Node.js
>
> **Project 02 Meta:** [02 / ARQUIVO DIGITAL]
> **Project 02 Title:** GALERIAS MEOWSEUM
> **Project 02 Description:** Um repositório assíncrono ultra-minimalista de imagens apresentando entrega otimizada de mídia e interações limpas de redimensionamento de viewport.
> **Project 02 Tags:** React · Vite · Express · MongoDB

---

#### Core Engineering / Services Section

**EN:**

> **Section Heading:** CORE ENGINEERING
>
> **Section Subheading:** Technical capacities built to turn high-level logic into interactive interfaces.
>
> **Service 01 Title:** Full-Stack Architecture
> **Service 01 Text:** Developing bulletproof web ecosystems using the React framework ecosystem. Clean, typed, and scalable structural code tailored for rapid rendering, rigid type-safety, and smooth animations.
>
> **Service 02 Title:** Minimalist Art Direction
> **Service 02 Text:** Translating complex corporate or luxury visual blueprints into crisp digital form. We strip away the unnecessary, focusing exclusively on sharp typography, layout balance, and precise spacing rules.
>
> **Service 03 Title:** Operational Infrastructure
> **Service 03 Text:** Optimizing data pipelines, automating deployment pipelines, and setting up rigid cloud configurations so your application operates smoothly under heavy data loads.

**PT:**

> **Section Heading:** ENGENHARIA CENTRAL
>
> **Section Subheading:** Capacidades técnicas construídas para transformar lógica de alto nível em interfaces interativas.
>
> **Service 01 Title:** Arquitetura Full-Stack
> **Service 01 Text:** Desenvolvendo ecossistemas web indestrutíveis usando o ecossistema do framework React. Código estrutural limpo, tipado e escalável sob medida para renderização rápida, segurança estrita de tipos e animações fluidas.
>
> **Service 02 Title:** Direção de Arte Minimalista
> **Service 02 Text:** Traduzindo diretrizes visuais complexas corporativas ou de luxo em formato digital nítido. Eliminamos o desnecessário, focando exclusivamente em tipografia marcante, equilíbrio de layout e regras precisas de espaçamento.
>
> **Service 03 Title:** Infraestrutura Operacional
> **Service 03 Text:** Otimizando pipelines de dados, automatizando fluxos de deploy e estruturando configurações de nuvem rígidas para que sua aplicação opere perfeitamente sob cargas densas de dados.

---

#### The Mechanism / Methodology Section

**EN:**

> **Section Heading:** THE MECHANISM
>
> **Section Subheading:** A transparent, four-stage timeline engineered for absolute project alignment.
>
> **Step 01 Title:** 01 / Discovery Protocol
> **Step 01 Text:** Deep analytical diagnostic of your project's market placement, audience landscape, and system bottlenecks. We outline the core framework architecture and clean content strategy before writing a single line of code.
>
> **Step 02 Title:** 02 / Visual Direction
> **Step 02 Text:** We map out structural wireframes and establish the typography scale, balancing deep dark accents with sophisticated canvas light tones to give your brand a striking editorial look.
>
> **Step 03 Title:** 03 / System Design
> **Step 03 Text:** Translating approved mockups into full component designs. Every interactive element, micro-interaction, and responsive state is refined for perfect layout alignment.
>
> **Step 04 Title:** 04 / Code Deployment
> **Step 04 Text:** Executing clean, modular Next.js builds packed with rigorous TypeScript architecture. The process wraps up with intense deployment audits for ultimate structural integrity and high lighthouse scores.

**PT:**

> **Section Heading:** O MECANISMO
>
> **Section Subheading:** Um cronograma transparente de quatro estágios engenhado para alinhamento absoluto do projeto.
>
> **Step 01 Title:** 01 / Protocolo de Descoberta
> **Step 01 Text:** Diagnóstico analítico profundo do posicionamento de mercado do seu projeto, cenário de público-alvo e gargalos do sistema. Esboçamos a arquitetura central do framework e uma estratégia limpa de conteúdo antes de escrever uma única linha de código.
>
> **Step 02 Title:** 02 / Direção Visual
> **Step 02 Text:** Mapeamos wireframes estruturais e estabelecemos a escala tipográfica, equilibrando acentos escuros profundos com tons claros de tela sofisticados para dar à sua marca um visual editorial impactante.
>
> **Step 03 Title:** 03 / Design do Sistema
> **Step 03 Text:** Traduzindo layouts aprovados em designs completos de componentes. Cada elemento interativo, micro-interação e estado responsivo é refinado para um alinhamento perfeito de layout.
>
> **Step 04 Title:** 04 / Implantação de Código
> **Step 04 Text:** Executando compilações Next.js limpas e modulares, munidas de uma arquitetura rigorosa em TypeScript. O processo termina com auditorias intensas de deploy para máxima integridade estrutural e pontuações elevadas de Lighthouse.

---

### ABOUT PAGE COPY

#### The Philosophy Section

**EN:**

> **Section Heading:** STRUCTURAL INTEGRITY MEETS MINIMALIST RESTRAINT
>
> **Body Paragraph 01:** We treat digital production with the same operational discipline found in heavy logistics and infrastructural management. A premium interface shouldn't scream for attention. It must command it through quiet confidence, flawless layout balance, and technical execution that runs perfectly under any condition.
>
> **Body Paragraph 02:** True minimalism isn't just about empty canvas spaces. It is an engineering principle. By removing artificial visual noise and styling distractions, we allow your digital assets, typographic systems, and primary transactional triggers to perform with high impact.

**PT:**

> **Section Heading:** INTEGRIDADE ESTRUTURAL ENCONTRA A RESTRIÇÃO MINIMALISTA
>
> **Body Paragraph 01:** Tratamos a produção digital com a mesma disciplina operacional encontrada na logística pesada e na gestão de infraestruturas. Uma interface premium não deve gritar por atenção. Ela deve comandar através de uma confiança silenciosa, equilíbrio impecável de layout e uma execução técnica que roda perfeitamente sob qualquer condição.
>
> **Body Paragraph 02:** O verdadeiro minimalismo não se resume a espaços vazios na tela. É um princípio de engenharia. Ao remover ruídos visuais artificiais e distrações estéticas, permitimos que seus ativos digitais, sistemas tipográficos e gatilhos transacionais primários performem com máximo impacto.

---

#### Background & Evolution Section

**EN:**

> **Section Heading:** THE EVOLUTION OF TRAJECTORY
>
> **Intro Text:** Rooted in ten years of rigorous operational leadership, systems configuration, and large-scale complex resource management.
>
> **Timeline Item 01 Role:** Full-Stack Architect & Digital Art Director — Lumo
> **Timeline Item 01 Text:** Engineering fast web applications, interactive frameworks, and custom digital identities for discerning corporate and luxury ecosystems using Next.js and TypeScript.
>
> **Timeline Item 02 Role:** Operations Manager & Logistics Coordinator — Medical Distribution Industry
> **Timeline Item 02 Text:** Structured and organized high-volume supply inventories, financial ledgers, and distribution networks. Engineered complex logistics tracking systems requiring absolute accuracy and zero failure margins.
>
> **Timeline Item 03 Role:** Operational Supervisor — Large Scale Housing Infrastructure (400 Units)
> **Timeline Item 03 Text:** Supervised multi-unit asset management, managed daily technical operations, coordinated compliance standards, and resolved high-stakes community challenges through systematic problem-solving frameworks.

**PT:**

> **Section Heading:** A EVOLUÇÃO DA TRAJETÓRIA
>
> **Intro Text:** Enraizado em dez anos de liderança operacional rigorosa, configuração de sistemas e gestão de recursos complexos em grande escala.
>
> **Timeline Item 01 Role:** Arquiteto Full-Stack e Diretor de Arte Digital — Lumo
> **Timeline Item 01 Text:** Engenharia de aplicações web rápidas, frameworks interativos e identidades digitais personalizadas para ecossistemas corporativos e de luxo exigentes usando Next.js e TypeScript.
>
> **Timeline Item 02 Role:** Gerente de Operações e Coordenador de Logística — Indústria de Distribuição Hospitalar
> **Timeline Item 02 Text:** Estruturação e organização de estoques de suprimentos de alto volume, livros contábeis financeiros e redes de distribuição. Engenharia de sistemas complexos de rastreamento logístico que exigiam precisão absoluta e margem de erro zero.
>
> **Timeline Item 03 Role:** Supervisor Operacional — Infraestrutura Habitacional de Larga Escala (400 Unidades)
> **Timeline Item 03 Text:** Supervisão de gestão de ativos multi-residenciais, gerenciamento de operações técnicas diárias, coordenação de padrões de conformidade e mediação de desafios complexos por meio de frameworks sistemáticos de resolução de problemas.

---

### SERVICES PAGE COPY

#### Technical Overview Section

**EN:**

> **Section Heading:** SYSTEMS BREAKDOWN
>
> **Subheading:** Built cleanly on strict technical environments to guarantee future scalability.
>
> **Stack 01 Block:** Core Frameworks — Next.js App Router, React, Node.js ecosystem
> **Stack 02 Block:** Logic & Styling — TypeScript Engine, Tailwind CSS v4, Framer Motion
> **Stack 03 Block:** UI Component Architecture — Rigid Radix Primitives, Shadcn/ui Structural Layouts

**PT:**

> **Section Heading:** DETALHAMENTO DE SISTEMAS
>
> **Subheading:** Construído de forma limpa sobre ambientes técnicos estritos para garantir escalabilidade futura.
>
> **Stack 01 Block:** Frameworks Principais — Next.js App Router, Ecossistema React e Node.js
> **Stack 02 Block:** Lógica e Estilização — Engine TypeScript, Tailwind CSS v4, Framer Motion
> **Stack 03 Block:** Arquitetura de Componentes UI — Primitivos Radix Rígidos, Layouts Estruturais Shadcn/ui

---

#### Strategic Solutions Section

**EN:**

> **Solution 01 Title:** Real Estate & Asset Platforms
> **Solution 01 Text:** High-performance, modular interfaces optimized to catalog properties, run complex listing search filters, automate client scheduling workflows, and process large amounts of data securely.
>
> **Solution 02 Title:** Premium Corporate Branding
> **Solution 02 Text:** Editorial-grade digital footprints tailored specifically for architecture firms, law groups, medical entities, and premium brands looking to mirror their physical prestige online.

**PT:**

> **Solution 01 Title:** Plataformas Imobiliárias e de Ativos
> **Solution 01 Text:** Interfaces modulares de alta performance otimizadas para catalogar propriedades, executar filtros de busca complexos de anúncios, automatizar fluxos de agendamento de clientes e processar grandes volumes de dados de forma segura.
>
> **Solution 02 Title:** Branding Corporativo Premium
> **Solution 02 Text:** Presenças digitais de padrão editorial adaptadas especificamente para escritórios de arquitetura, grupos jurídicos, entidades médicas e marcas premium que buscam espelhar seu prestígio físico no ambiente online.

---

### CONTACT PAGE COPY

#### Inquiry Desk Section

**EN:**

> **Section Heading:** PROJECT INITIATION PROTOCOL
>
> **Subheading:** Secure your strategic session. Fill out the core indicators below, and our office will establish communication within 24 hours.
>
> **Form Label 01:** Full Name / Corporate Identity
> **Form Placeholder 01:** e.g., Alexander Vance or Vance Holdings LLC
>
> **Form Label 02:** Direct Communication Channel (Email)
> **Form Placeholder 02:** e.g., project.lead@brand.com
>
> **Form Label 03:** Structural Scope & Goals
> **Form Placeholder 03:** Describe your system requirements, timeline constraints, and primary technical needs...
>
> **Submit Button Text:** Dispatch Inquiry Protocol →
>
> **Status Subtext:** Ready to compile. All systems operational.

**PT:**

> **Section Heading:** PROTOCOLO DE INICIAÇÃO DE PROJETO
>
> **Subheading:** Garanta sua sessão de alinhamento estratégico. Preencha os indicadores centrais abaixo e nosso escritório estabelecerá comunicação dentro de 24 horas.
>
> **Form Label 01:** Nome Completo / Identidade Corporativa
> **Form Placeholder 01:** ex: Alexander Vance ou Vance Holdings Ltda
>
> **Form Label 02:** Canal de Comunicação Direto (E-mail)
> **Form Placeholder 02:** ex: lider.projeto@marca.com
>
> **Form Label 03:** Escopo Estrutural e Objetivos
> **Form Placeholder 03:** Descreva os requisitos do seu sistema, restrições de cronograma e principais necessidades técnicas...
>
> **Submit Button Text:** Despachar Protocolo de Consulta →
>
> **Status Subtext:** Pronto para compilar. Todos os sistemas operacionais.

---

## 8. Functional Requirements

- [x] Smooth scroll to anchor sections
- [x] Sticky navbar with scroll-aware background change
- [x] Mobile nav drawer (shadcn Sheet)
- [x] Contact form — fields: name, email, description — validation via react-hook-form + zod
- [x] FAQ accordion (shadcn Accordion)
- [ ] Testimonial carousel (shadcn Carousel)
- [ ] Image lightbox / gallery
- [x] Scroll-triggered fade-in animations (framer-motion)
- [ ] Dark mode toggle (next-themes)
- [ ] Cookie / consent banner

---

## 9. Assets Inventory

| Asset        | Path                                  | Status     |
| ------------ | ------------------------------------- | ---------- |
| Primary logo | `public/images/logo.svg`              | ✅ Ready   |
| Logo white   | `public/images/logo-white.svg`        | ✅ Ready   |
| Favicon      | `public/favicon.ico`                  | ✅ Ready   |
| OG image     | `public/images/og-image.jpg`          | ✅ Ready   |
| Hero image   | `public/images/hero.jpg`              | ⏳ Pending |
| Font files   | `public/fonts/`                       | ✅ Ready   |
| Icons        | `lucide-react / public/images/icons/` | ✅ Ready   |

> For any ⏳ Pending image asset, use `https://placehold.co/WIDTHxHEIGHT` and leave a `// TODO:` comment.

---

## 10. SEO & Metadata

Defined in `src/app/layout.tsx` using Next.js Metadata API.

```typescript
export const metadata: Metadata = {
	title: 'Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design',
	description:
		'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
	openGraph: {
		title: 'Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design',
		description:
			'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
		url: 'https://lumosolucoes.com',
		siteName: 'Lumo',
		images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lumo | Bespoke Full-Stack Engineering & Minimalist Web Design',
		description:
			'Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction.',
		images: ['/images/og-image.jpg'],
	},
};
```

| Field               | Value                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page title          | Lumo \| Bespoke Full-Stack Engineering & Minimalist Web Design                                                                                     |
| Meta description    | Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction. |
| OG title            | Lumo \| Bespoke Full-Stack Engineering & Minimalist Web Design                                                                                     |
| OG description      | Bespoke web applications and digital assets engineered with absolute structural precision using Next.js, TypeScript, and minimalist art direction. |
| Canonical URL       | https://lumosolucoes.com                                                                                                                           |
| Google Analytics ID | G-XXXXXXXXXX                                                                                                                                       |
| robots.txt          | Allow all                                                                                                                                          |
| sitemap.xml         | Yes (auto via next-sitemap)                                                                                                                        |

---

## 11. Reference & Inspiration

**Reference sites (feel, not copy):**

- **Joe Garner Design** (joegarnerdesign.com): Inspired the quiet confidence, high-end positioning, and clear 4-stage procedural execution (Discovery, Direction, Design, Development).
- **Eliza Doltu** (elizadoltuofficial.net): Inspired the high-fidelity merge of advanced logic, seamless full-stack performance layout, and pristine functional presentation.
- **Olha Lazarieva** (olhalazarieva.com): Inspired the elegant, ultra-minimal typography system that balances striking display sizes with ample paragraph line spacing.
  **Reference images:** Drop in `public/images/reference/` — N/A

**Avoid:** Artificial filters, bloated animations, excessive card grids, colorful primary gradients, and generic web templates.
