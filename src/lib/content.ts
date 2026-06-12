import type { LocalizedText } from "@/types";

/*
  Copy book — transcribed verbatim from specs/PROJECT_SPECS.md §5–§7.
  Nav/footer/UI chrome PT strings written per spec §7
  ("Claude writes final copy", bilingual support matrix).
*/

export type Project = {
	meta: LocalizedText;
	title: LocalizedText;
	description: LocalizedText;
	tags: string;
};

export type TitledBlock = {
	title: LocalizedText;
	text: LocalizedText;
};

export const nav = {
	items: [
		{ label: { en: "Works", pt: "Trabalhos" }, href: "/#works" },
		{ label: { en: "Experience", pt: "Experiência" }, href: "/about" },
		{ label: { en: "Methodology", pt: "Metodologia" }, href: "/#mechanism" },
		{ label: { en: "Connect", pt: "Conexão" }, href: "/contact" },
	],
	cta: { label: { en: "Contact Me", pt: "Contato" }, href: "/contact" },
} as const;

export const hero = {
	eyebrow: {
		en: "Lumo — Digital Architecture & Development Hub",
		pt: "Lumo — Hub de Arquitetura e Desenvolvimento Digital",
	},
	headline: {
		en: "Bespoke digital constructions for ambitious systems.",
		pt: "Construções digitais sob medida para sistemas ambiciosos.",
	},
	lead: {
		en: "A sophisticated merge of structural code architecture and minimalist art direction. We build crisp, performance-driven web ecosystems engineered to engage modern audiences with absolute clarity. No artificial layers. Just pure technical precision.",
		pt: "Uma fusão sofisticada entre arquitetura de código estrutural e direção de arte minimalista. Desenvolvemos ecossistemas web de alta performance engenhados para engajar audiências modernas com clareza absoluta. Sem camadas artificiais. Apenas precisão técnica pura.",
	},
	primaryCta: {
		label: { en: "Init System Protocol →", pt: "Iniciar Protocolo de Sistema →" },
		href: "/contact",
	},
	secondaryCta: {
		label: { en: "View Case Logs", pt: "Ver Registros de Casos" },
		href: "/#works",
	},
};

export const works = {
	heading: { en: "Selected Systems", pt: "Sistemas Selecionados" },
	subheading: {
		en: "High-fidelity products engineered for operational clarity and visual depth.",
		pt: "Produtos de alta fidelidade desenvolvidos para máxima clareza operacional e profundidade visual.",
	},
	projects: [
		{
			meta: {
				en: "[01 / System Management Platform]",
				pt: "[01 / Plataforma de Gestão de Sistemas]",
			},
			title: { en: "Realio Asset Architecture", pt: "Arquitetura de Ativos Realio" },
			description: {
				en: "A high-end real estate and property portfolio network operating with machine learning capabilities, predictive analytical frameworks, and modular database nodes.",
				pt: "Uma rede de portfólio imobiliário de alto padrão operando com capacidades de machine learning, frameworks analíticos preditivos e nós de banco de dados modulares.",
			},
			tags: "Next.js · TypeScript · Tailwind CSS v4 · Node.js",
		},
		{
			meta: { en: "[02 / Digital Archive]", pt: "[02 / Arquivo Digital]" },
			title: { en: "Meowseum Galleries", pt: "Galerias Meowseum" },
			description: {
				en: "An ultra-minimalist asynchronous image repository featuring optimized media serving and clean viewport scaling interactions.",
				pt: "Um repositório assíncrono ultra-minimalista de imagens apresentando entrega otimizada de mídia e interações limpas de redimensionamento de viewport.",
			},
			tags: "React · Vite · Express · MongoDB",
		},
	] satisfies Project[],
};

export const services = {
	heading: { en: "Core Engineering", pt: "Engenharia Central" },
	subheading: {
		en: "Technical capacities built to turn high-level logic into interactive interfaces.",
		pt: "Capacidades técnicas construídas para transformar lógica de alto nível em interfaces interativas.",
	},
	items: [
		{
			title: { en: "Full-Stack Architecture", pt: "Arquitetura Full-Stack" },
			text: {
				en: "Developing bulletproof web ecosystems using the React framework ecosystem. Clean, typed, and scalable structural code tailored for rapid rendering, rigid type-safety, and smooth animations.",
				pt: "Desenvolvendo ecossistemas web indestrutíveis usando o ecossistema do framework React. Código estrutural limpo, tipado e escalável sob medida para renderização rápida, segurança estrita de tipos e animações fluidas.",
			},
		},
		{
			title: { en: "Minimalist Art Direction", pt: "Direção de Arte Minimalista" },
			text: {
				en: "Translating complex corporate or luxury visual blueprints into crisp digital form. We strip away the unnecessary, focusing exclusively on sharp typography, layout balance, and precise spacing rules.",
				pt: "Traduzindo diretrizes visuais complexas corporativas ou de luxo em formato digital nítido. Eliminamos o desnecessário, focando exclusivamente em tipografia marcante, equilíbrio de layout e regras precisas de espaçamento.",
			},
		},
		{
			title: { en: "Operational Infrastructure", pt: "Infraestrutura Operacional" },
			text: {
				en: "Optimizing data pipelines, automating deployment pipelines, and setting up rigid cloud configurations so your application operates smoothly under heavy data loads.",
				pt: "Otimizando pipelines de dados, automatizando fluxos de deploy e estruturando configurações de nuvem rígidas para que sua aplicação opere perfeitamente sob cargas densas de dados.",
			},
		},
	] satisfies TitledBlock[],
};

export const mechanism = {
	heading: { en: "The Mechanism", pt: "O Mecanismo" },
	subheading: {
		en: "A transparent, four-stage timeline engineered for absolute project alignment.",
		pt: "Um cronograma transparente de quatro estágios engenhado para alinhamento absoluto do projeto.",
	},
	steps: [
		{
			title: { en: "01 / Discovery Protocol", pt: "01 / Protocolo de Descoberta" },
			text: {
				en: "Deep analytical diagnostic of your project's market placement, audience landscape, and system bottlenecks. We outline the core framework architecture and clean content strategy before writing a single line of code.",
				pt: "Diagnóstico analítico profundo do posicionamento de mercado do seu projeto, cenário de público-alvo e gargalos do sistema. Esboçamos a arquitetura central do framework e uma estratégia limpa de conteúdo antes de escrever uma única linha de código.",
			},
		},
		{
			title: { en: "02 / Visual Direction", pt: "02 / Direção Visual" },
			text: {
				en: "We map out structural wireframes and establish the typography scale, balancing deep dark accents with sophisticated canvas light tones to give your brand a striking editorial look.",
				pt: "Mapeamos wireframes estruturais e estabelecemos a escala tipográfica, equilibrando acentos escuros profundos com tons claros de tela sofisticados para dar à sua marca um visual editorial impactante.",
			},
		},
		{
			title: { en: "03 / System Design", pt: "03 / Design do Sistema" },
			text: {
				en: "Translating approved mockups into full component designs. Every interactive element, micro-interaction, and responsive state is refined for perfect layout alignment.",
				pt: "Traduzindo layouts aprovados em designs completos de componentes. Cada elemento interativo, micro-interação e estado responsivo é refinado para um alinhamento perfeito de layout.",
			},
		},
		{
			title: { en: "04 / Code Deployment", pt: "04 / Implantação de Código" },
			text: {
				en: "Executing clean, modular Next.js builds packed with rigorous TypeScript architecture. The process wraps up with intense deployment audits for ultimate structural integrity and high lighthouse scores.",
				pt: "Executando compilações Next.js limpas e modulares, munidas de uma arquitetura rigorosa em TypeScript. O processo termina com auditorias intensas de deploy para máxima integridade estrutural e pontuações elevadas de Lighthouse.",
			},
		},
	] satisfies TitledBlock[],
};

export const about = {
	philosophy: {
		heading: {
			en: "Structural integrity meets minimalist restraint",
			pt: "Integridade estrutural encontra a restrição minimalista",
		},
		paragraphs: [
			{
				en: "We treat digital production with the same operational discipline found in heavy logistics and infrastructural management. A premium interface shouldn't scream for attention. It must command it through quiet confidence, flawless layout balance, and technical execution that runs perfectly under any condition.",
				pt: "Tratamos a produção digital com a mesma disciplina operacional encontrada na logística pesada e na gestão de infraestruturas. Uma interface premium não deve gritar por atenção. Ela deve comandar através de uma confiança silenciosa, equilíbrio impecável de layout e uma execução técnica que roda perfeitamente sob qualquer condição.",
			},
			{
				en: "True minimalism isn't just about empty canvas spaces. It is an engineering principle. By removing artificial visual noise and styling distractions, we allow your digital assets, typographic systems, and primary transactional triggers to perform with high impact.",
				pt: "O verdadeiro minimalismo não se resume a espaços vazios na tela. É um princípio de engenharia. Ao remover ruídos visuais artificiais e distrações estéticas, permitimos que seus ativos digitais, sistemas tipográficos e gatilhos transacionais primários performem com máximo impacto.",
			},
		] satisfies LocalizedText[],
	},
	evolution: {
		heading: { en: "The Evolution of Trajectory", pt: "A Evolução da Trajetória" },
		intro: {
			en: "Rooted in ten years of rigorous operational leadership, systems configuration, and large-scale complex resource management.",
			pt: "Enraizado em dez anos de liderança operacional rigorosa, configuração de sistemas e gestão de recursos complexos em grande escala.",
		},
		timeline: [
			{
				title: {
					en: "Full-Stack Architect & Digital Art Director — Lumo",
					pt: "Arquiteto Full-Stack e Diretor de Arte Digital — Lumo",
				},
				text: {
					en: "Engineering fast web applications, interactive frameworks, and custom digital identities for discerning corporate and luxury ecosystems using Next.js and TypeScript.",
					pt: "Engenharia de aplicações web rápidas, frameworks interativos e identidades digitais personalizadas para ecossistemas corporativos e de luxo exigentes usando Next.js e TypeScript.",
				},
			},
			{
				title: {
					en: "Operations Manager & Logistics Coordinator — Medical Distribution Industry",
					pt: "Gerente de Operações e Coordenador de Logística — Indústria de Distribuição Hospitalar",
				},
				text: {
					en: "Structured and organized high-volume supply inventories, financial ledgers, and distribution networks. Engineered complex logistics tracking systems requiring absolute accuracy and zero failure margins.",
					pt: "Estruturação e organização de estoques de suprimentos de alto volume, livros contábeis financeiros e redes de distribuição. Engenharia de sistemas complexos de rastreamento logístico que exigiam precisão absoluta e margem de erro zero.",
				},
			},
			{
				title: {
					en: "Operational Supervisor — Large Scale Housing Infrastructure (400 Units)",
					pt: "Supervisor Operacional — Infraestrutura Habitacional de Larga Escala (400 Unidades)",
				},
				text: {
					en: "Supervised multi-unit asset management, managed daily technical operations, coordinated compliance standards, and resolved high-stakes community challenges through systematic problem-solving frameworks.",
					pt: "Supervisão de gestão de ativos multi-residenciais, gerenciamento de operações técnicas diárias, coordenação de padrões de conformidade e mediação de desafios complexos por meio de frameworks sistemáticos de resolução de problemas.",
				},
			},
		] satisfies TitledBlock[],
	},
};

export const servicesPage = {
	overview: {
		heading: { en: "Systems Breakdown", pt: "Detalhamento de Sistemas" },
		subheading: {
			en: "Built cleanly on strict technical environments to guarantee future scalability.",
			pt: "Construído de forma limpa sobre ambientes técnicos estritos para garantir escalabilidade futura.",
		},
		stacks: [
			{
				title: { en: "Core Frameworks", pt: "Frameworks Principais" },
				text: {
					en: "Next.js App Router, React, Node.js ecosystem",
					pt: "Next.js App Router, Ecossistema React e Node.js",
				},
			},
			{
				title: { en: "Logic & Styling", pt: "Lógica e Estilização" },
				text: {
					en: "TypeScript Engine, Tailwind CSS v4, Framer Motion",
					pt: "Engine TypeScript, Tailwind CSS v4, Framer Motion",
				},
			},
			{
				title: { en: "UI Component Architecture", pt: "Arquitetura de Componentes UI" },
				text: {
					en: "Rigid Radix Primitives, Shadcn/ui Structural Layouts",
					pt: "Primitivos Radix Rígidos, Layouts Estruturais Shadcn/ui",
				},
			},
		] satisfies TitledBlock[],
	},
	solutions: {
		label: { en: "Strategic Solutions", pt: "Soluções Estratégicas" },
		items: [
			{
				title: {
					en: "Real Estate & Asset Platforms",
					pt: "Plataformas Imobiliárias e de Ativos",
				},
				text: {
					en: "High-performance, modular interfaces optimized to catalog properties, run complex listing search filters, automate client scheduling workflows, and process large amounts of data securely.",
					pt: "Interfaces modulares de alta performance otimizadas para catalogar propriedades, executar filtros de busca complexos de anúncios, automatizar fluxos de agendamento de clientes e processar grandes volumes de dados de forma segura.",
				},
			},
			{
				title: {
					en: "Premium Corporate Branding",
					pt: "Branding Corporativo Premium",
				},
				text: {
					en: "Editorial-grade digital footprints tailored specifically for architecture firms, law groups, medical entities, and premium brands looking to mirror their physical prestige online.",
					pt: "Presenças digitais de padrão editorial adaptadas especificamente para escritórios de arquitetura, grupos jurídicos, entidades médicas e marcas premium que buscam espelhar seu prestígio físico no ambiente online.",
				},
			},
		] satisfies TitledBlock[],
	},
};

export const contact = {
	heading: {
		en: "Project Initiation Protocol",
		pt: "Protocolo de Iniciação de Projeto",
	},
	subheading: {
		en: "Secure your strategic session. Fill out the core indicators below, and our office will establish communication within 24 hours.",
		pt: "Garanta sua sessão de alinhamento estratégico. Preencha os indicadores centrais abaixo e nosso escritório estabelecerá comunicação dentro de 24 horas.",
	},
	fields: {
		name: {
			label: {
				en: "Full Name / Corporate Identity",
				pt: "Nome Completo / Identidade Corporativa",
			},
			placeholder: {
				en: "e.g., Alexander Vance or Vance Holdings LLC",
				pt: "ex: Alexander Vance ou Vance Holdings Ltda",
			},
		},
		email: {
			label: {
				en: "Direct Communication Channel (Email)",
				pt: "Canal de Comunicação Direto (E-mail)",
			},
			placeholder: {
				en: "e.g., project.lead@brand.com",
				pt: "ex: lider.projeto@marca.com",
			},
		},
		scope: {
			label: {
				en: "Structural Scope & Goals",
				pt: "Escopo Estrutural e Objetivos",
			},
			placeholder: {
				en: "Describe your system requirements, timeline constraints, and primary technical needs...",
				pt: "Descreva os requisitos do seu sistema, restrições de cronograma e principais necessidades técnicas...",
			},
		},
	},
	submit: {
		en: "Dispatch Inquiry Protocol →",
		pt: "Despachar Protocolo de Consulta →",
	},
	status: {
		en: "Ready to compile. All systems operational.",
		pt: "Pronto para compilar. Todos os sistemas operacionais.",
	},
	dispatched: {
		en: "Inquiry dispatched. Our office will establish communication within 24 hours.",
		pt: "Consulta despachada. Nosso escritório estabelecerá comunicação dentro de 24 horas.",
	},
	errors: {
		name: {
			en: "Identity required — minimum 2 characters.",
			pt: "Identidade obrigatória — mínimo de 2 caracteres.",
		},
		email: {
			en: "Valid communication channel required.",
			pt: "Canal de comunicação válido obrigatório.",
		},
		scope: {
			en: "Describe the scope — minimum 10 characters.",
			pt: "Descreva o escopo — mínimo de 10 caracteres.",
		},
	},
};

export const footer = {
	tagline: {
		en: "Structural Web Engineering & Minimalist Design. © 2026. All rights reserved.",
		pt: "Engenharia Web Estrutural e Design Minimalista. © 2026. Todos os direitos reservados.",
	},
	directory: {
		heading: { en: "System Directory", pt: "Diretório do Sistema" },
		links: [
			{ label: { en: "Home", pt: "Início" }, href: "/" },
			{ label: { en: "Works", pt: "Trabalhos" }, href: "/#works" },
			{ label: { en: "Experience", pt: "Experiência" }, href: "/about" },
			{ label: { en: "Methodology", pt: "Metodologia" }, href: "/#mechanism" },
			{ label: { en: "Connect", pt: "Conexão" }, href: "/contact" },
		],
	},
	protocol: {
		heading: { en: "Direct Protocol", pt: "Protocolo Direto" },
		// TODO: replace placeholder hrefs with real profiles when provided.
		links: [
			{ label: { en: "GitHub", pt: "GitHub" }, href: "https://github.com" },
			{ label: { en: "LinkedIn", pt: "LinkedIn" }, href: "https://linkedin.com" },
			{ label: { en: "Email", pt: "E-mail" }, href: "mailto:luisviegasdev@gmail.com" },
		],
	},
	legal: {
		en: "© 2026 Lumo Soluções. All rights reserved.",
		pt: "© 2026 Lumo Soluções. Todos os direitos reservados.",
	},
	legalLinks: [
		// TODO: routes pending — pages not in SPECS sitemap yet.
		{ label: { en: "Privacy Policy", pt: "Política de Privacidade" }, href: "#" },
		{ label: { en: "Terms", pt: "Termos" }, href: "#" },
	],
};
