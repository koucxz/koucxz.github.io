// 英文站数据源：措辞以 outputs/Chendi_Kou_*_Engineer_Resume.docx 为准
export const profile = {
  name: "Chendi Kou",
  english: "KOU CHENDI",
  role: "Frontend Engineer / Frontend Technical Manager / AI Application Engineer",
  currentRole: "Frontend Technical Manager",
  experience: "Nearly 10 years",
  city: "Shenzhen, China",
  phone: "+86 156 1792 2762",
  email: "koucxz@hotmail.com",
  github: "https://github.com/koucxz",
  availability: "Open to roles · Frontend Engineer / Frontend Tech Lead / AI Application Engineer",
  summary:
    "Frontend engineer with nearly 10 years of production experience and the past 3 years focused on AI applications. Led frontend architecture and delivery for e-commerce, payments, IM, and operations platforms, with hands-on delivery of RAG, MCP, Agent workflows, and cross-platform applications.",
  intro:
    "Nearly 10 years of hands-on engineering, with the past 3 years focused on AI applications. I have owned frontend architecture and delivery for e-commerce, payments, IM, and operations platforms, taking work from requirement breakdown and design review to shipped releases.",
  aiSummary:
    "Led an operations decision Agent covering Agent architecture, intent recognition, RAG, MCP, context management, and an evaluation loop; 92% intent accuracy and 87% task success, with 95% tool-selection success at 4.8s P95 latency.",
};

export const advantages = [
  {
    title: "Engineering leadership",
    text: "Own architecture reviews, work breakdown, quality, releases, and mentoring across complex business systems.",
  },
  {
    title: "Agent delivery",
    text: "Led an operations decision Agent with 95% tool-selection success, 4.8s P95 latency, and 87% end-to-end task success.",
  },
  {
    title: "Performance and multi-platform delivery",
    text: "Reduced frontend startup from 5–8 minutes to under 90 seconds and cut Mini Program main-package size by 20%+ across PC, H5, Mini Program, Flutter, and Hybrid App surfaces.",
  },
];

export const bossGreeting =
  "Hi, I have nearly 10 years of production engineering experience, with the past 3 years focused on AI applications. I have shipped Dify, RAG, MCP, multi-channel entry points, and a trace-based evaluation loop, and currently lead a frontend team delivering complex business systems. I would be glad to talk further.";

export const selfIntroduction =
  "Nearly 10 years of hands-on engineering experience, with the past 3 years focused on AI applications, while acting as frontend technical manager and technical owner. My strengths are business system delivery, Agent and AI application landing, and cross-platform full-stack delivery. I led an operations decision Agent that covers intent recognition, task orchestration, context management, Dify/RAG/MCP integration, and a trace-based evaluation loop, reaching 92% intent accuracy and 87% task success.";

export const metrics = [
  { value: "10 yrs", label: "Production experience", note: "3 years focused on AI" },
  { value: "92%", label: "Intent accuracy", note: "Rules, vectors and LLMs" },
  { value: "87%", label: "Task success rate", note: "End-to-end Agent loop" },
  { value: "90%+", label: "Admin pages covered", note: "Configuration delivery" },
];

export const expertise = [
  {
    title: "RAG and knowledge engineering",
    icon: "brain",
    description:
      "Document cleaning, chunking, embeddings, vector retrieval, hybrid search, reranking, context assembly, and citation constraints. Able to trace recall and generation issues from ingestion to answer.",
    skills: ["RAG", "Embedding", "Rerank", "Knowledge base"],
  },
  {
    title: "Business MCP tooling",
    icon: "workflow",
    description:
      "Abstracted product selection, assisted selling, inventory, and pricing into tool contracts for query, analysis, generation, verification, shipping, and refunds; governed 20+ API capabilities with unified JSON Schema, parameter mapping, permissions, idempotency, error shapes, credential isolation, and result read-back.",
    skills: ["MCP", "JSON Schema", "Swagger", "Tool Calling"],
  },
  {
    title: "Agent engineering",
    icon: "brain",
    description:
      "Hands-on with ReAct, workflows, and Tool Calling; task decomposition, intent routing, tool selection, context management, state transitions, structured output, and human confirmation.",
    skills: ["Agent", "ReAct", "Workflow", "Tool Calling"],
  },
  {
    title: "Frontend and cross-platform",
    icon: "layers",
    description:
      "TypeScript, Vue 2/3, React, and Angular, with Flutter experience across PC, H5, Mini Program, and Hybrid App surfaces.",
    skills: ["Vue", "React", "Angular", "Flutter", "Mini Program"],
  },
  {
    title: "Engineering and performance",
    icon: "gauge",
    description:
      "TypeScript, Monorepo, Gulp/Webpack, API type generation, and unit testing; incremental builds, package governance, virtualization, and frontend monolith decomposition.",
    skills: ["TypeScript", "Monorepo", "Webpack", "Vite"],
  },
  {
    title: "Backend and API delivery",
    icon: "workflow",
    description:
      "Built Node.js BFF and service APIs with Express.js and NestJS, integrated Nacos service discovery, and owned aggregation, parameter validation, error normalization, and frontend-backend integration.",
    skills: ["Node.js", "Express.js", "NestJS", "Nacos"],
  },
  {
    title: "AI application integration",
    icon: "workflow",
    description:
      "Dify workflows, MCP Tool Calling, business APIs, and multi-channel entry points, including parameter validation, permission control, and failure feedback.",
    skills: ["Dify", "MCP", "API", "Multi-channel"],
  },
  {
    title: "AI development tooling",
    icon: "brain",
    description:
      "Using AI coding in daily delivery since 2023, practising Vibe Coding and SDD collaboration; Claude Code, Codex, GitHub Copilot, Trae, and Qoder, plus self-hosted sub2api and new-api gateways.",
    skills: ["Claude Code", "Codex", "Copilot", "Trae", "Qoder"],
  },
];

export const featuredStack = [
  {
    title: "AI application engineering",
    note: "From tool integration to a closed loop",
    skills: ["Dify", "MCP", "Agent", "RAG", "LangChain", "Tool Calling"],
  },
  {
    title: "Agent and knowledge engineering",
    note: "Intent, context and tool governance",
    skills: ["Agent", "ReAct", "Workflow", "RAG", "Embedding", "Rerank"],
  },
  {
    title: "Engineering and platforms",
    note: "Complex business, many surfaces",
    skills: ["React", "Vue", "Angular", "TypeScript", "Mini Program", "Flutter"],
  },
];

export const personalProjects = [
  {
    key: "video-note",
    name: "VideoNote: Multimodal Video Notes",
    personal: true,
    demoGif: "/assets/videonote-workflow.gif",
    kicker: "Personal · Multimodal",
    years: "May 2026 — Aug 2026",
    summary:
      "Chained FFmpeg, ASR, key-frame extraction, and VLM/LLM processing to produce structured, searchable, question-answerable video notes.",
    bullets: [
      "Multimodal pipeline: chained FFmpeg, ASR, key-frame extraction, and VLM/LLM processing to produce structured video notes that are searchable and answerable.",
      "Resumable long tasks: persisted stage state and checkpoints so failed tasks could resume without repeating completed work.",
      "Model abstraction: abstracted model providers and vector retrieval to support local fallback and additional implementations.",
    ],
    stack: ["React", "FastAPI", "FFmpeg", "VLM / LLM"],
    visual: "video",
    link: "https://video-note-rho.vercel.app/",
  },
  {
    key: "signal-dock",
    name: "SignalDock: AI Information Radar",
    personal: true,
    demoGif: "/assets/signaldock-workflow.gif",
    kicker: "Personal · AI product",
    years: "Oct 2026 — Present",
    summary:
      "An AI radar for personal information tracking: collects public sources by topic, then cleans, deduplicates, merges events, detects changes, and runs AI analysis into a feed worth following.",
    bullets: [
      "Multi-source collection: independent adapters for Juejin, 36Kr, tech-media RSS, V2EX, and Hacker News, so one failing source never blocks the rest.",
      "Data handling: layered deduplication by URL, content fingerprint, and event key, keeping multi-source coverage and snapshots to detect first sightings and edits.",
      "AI analysis: relevance, importance, and summaries, with automatic fallback when structured output breaks; the frontend supports filtering, sorting, paging, and unread state.",
    ],
    stack: ["React 19", "Express 5", "TypeScript", "SQLite", "AI Analysis"],
    visual: "signaldock",
    link: "https://signaldock-five.vercel.app/",
  },
  {
    key: "gencode-vscode",
    name: "GenCode: VS Code AI Coding Extension",
    personal: true,
    demoGif: "/assets/gencode-usage.gif",
    kicker: "Personal · AI coding",
    years: "Mar 2023 — Apr 2023",
    summary:
      "Built an internal VS Code code-generation extension with Python and LangChain; the project was later open-sourced.",
    bullets: [
      "Built an internal VS Code code-generation extension with Python and LangChain; the project was later open-sourced.",
    ],
    stack: ["Python", "LangChain", "VS Code Extension", "OpenAI"],
    visual: "gencode",
    link: "https://github.com/koucxz/gencode-vscode",
  },
];

export const workProjects = [
  {
    key: "group-ecommerce",
    name: "Qunjielong E-commerce Platform",
    kicker: "Core business · Multi-platform",
    years: "Jul 2020 — Present",
    summary:
      "For a social-commerce platform with hundreds of millions of RMB in monthly GMV and 1M daily active users, delivered Mini Program, PC, operations console, Flutter, and a configuration-driven platform across user, payments, IM, and commerce.",
    bullets: [
      "Multi-platform delivery: delivered Mini Program, PC, operations console, and Flutter experiences across user, payments, IM, and commerce; led IM, home, and checkout refactors and iterated virtualization, page loading, and CLS to remove rendering jank.",
      "Performance and engineering: optimized incremental builds, caching, and package size, reducing startup from 5–8 minutes to under 90 seconds; added TypeScript/UI unit tests with 60%+ coverage on core modules and components.",
      "Low-code and configuration delivery: built an Angular configuration-driven platform covering 90%+ of common operations pages, launched in one month, and enabled backend teams to ship selected routine features independently.",
      "GEO optimization: staticized Angular public pages and added structured data, sitemap, and llms.txt to improve retrieval and citations across AI answer engines such as Doubao, Yuanbao, and DeepSeek.",
      "BFF integration: built Node.js aggregation for draft-box and rich-text validation APIs, standardizing parameter validation and error results with paragraph-level error localization and page-level feedback.",
    ],
    stack: ["Mini Program", "Angular", "TypeScript", "Flutter"],
  },
  {
    key: "dake-alliance",
    name: "Daka Alliance",
    kicker: "WeChat Store · Monorepo",
    years: "Oct 2024 — Feb 2025",
    summary:
      "Integrated with the WeChat Store ecosystem to help suppliers acquire more customers; built the PC site and operations console across product marketplace, sourcing, traceability, and product-detail workflows.",
    bullets: [
      "Multi-app architecture: managed the PC site and operations console in a Monorepo, sharing components, business modules, and API types while keeping independent application entry points.",
      "Pagination and virtualization: loaded data on demand at scroll boundaries, controlled render nodes with virtualization, and combined request throttling with loading and error-state handling.",
      "Complex forms: separated state, field dependencies, validation, hydration, and submission transforms by business module; protected routes with React Router, AuthGuard, and role permissions.",
    ],
    stack: ["React 19", "Monorepo", "WeChat Store", "Route guard"],
  },
  {
    key: "lexing-auto",
    name: "Lexing Automotive Business Platform",
    kicker: "Multi-platform · Engineering",
    years: "Apr 2018 — May 2020",
    summary:
      "Delivered multiple platforms for Aite Good Car and Leying Car across dealer tools, automotive content, orders, payments, logistics, and finance workflows.",
    bullets: [
      "Multi-platform architecture and delivery: led Aite Good Car PC, H5, and Mini Program delivery with Nuxt SSR, keeping first paint under 600ms and placing model-keyword pages within the top 1–3 pages of Bing and Google results; also shipped Leying Car web, WeChat web, Mini Program, and in-app H5.",
      "Business workflows and cross-platform capability: handled cross-platform authentication, payment callbacks, navigation, and the complete dealer-to-user transaction flow across orders, payments, logistics, and finance.",
      "Engineering and stability: built production logs, analytics, and Sentry monitoring; split the frontend monolith and optimized Webpack, reducing builds from 10 minutes to under 2 minutes, and introduced TypeScript, Swagger code generation, and CLI scaffolding.",
    ],
    stack: ["Nuxt.js", "SSR", "Mini Program", "Webpack"],
  },
];

export const aiProjects = [
  {
    key: "agent-platform",
    name: "Qunjielong Operations Decision Agent",
    kicker: "Agent · MCP · RAG",
    years: "Apr 2025 — Jun 2026",
    summary:
      "Built an operations decision Agent for group-buying hosts from zero to one, unifying diagnosis, product selection, assisted selling, and after-sales tasks across multiple admin systems into a natural-language workflow.",
    bullets: [
      "Agent orchestration and task planning: designed an Agent scheduler and domain-task execution model, splitting diagnosis, product selection, assisted selling, and after-sales into independently executable business units with shared context and state transitions.",
      "Intent understanding and task decomposition: combined rules, vector retrieval, and LLM classification for colloquial, abbreviated, and multi-intent queries; added clarification, rejection, and slot completion; reached 92% intent accuracy.",
      "Context and replanning: layered system rules, task state, tool results, and user preferences, loading context by task stage and recomputing only affected steps when inventory, price, or goals changed.",
      "Tool governance and evaluation: connected business systems through MCP and Tool Calling; filtered tools by role, scenario, and risk, with permissions, idempotency, audit, and result read-back; achieved 95% tool-selection success, 4.8s P95 latency, and 87% end-to-end task success.",
    ],
    stack: ["Agent", "MCP", "RAG", "Tool Calling"],
  },
  {
    key: "dify-apps",
    name: "Qunjielong AI Business Applications",
    kicker: "Dify · RAG · Workflow",
    years: "Apr 2025 — Nov 2025",
    summary:
      "Built two business applications with Dify — a customer-service knowledge base and a product-selection calendar — turning historical service records and business metrics into searchable, conversational capabilities.",
    bullets: [
      "Business MCP server: built a Node.js MCP server with the MCP SDK, exposing activity, homepage, order, product, and assisted-selling capabilities through tool definitions and parameter mappings.",
      "Customer-service knowledge base: curated 1,970 records; applied labels, role segmentation, chunking, and retrieval validation; configured data lookup, parameter completion, and human handoff flows, then sampled historical queries to evaluate results.",
      "Product-selection calendar workflow: combined business-metric lookup with product analysis through Dify Webapp and MCP; extended the conversation UI and generated request/response types with openapi-typescript.",
    ],
    stack: ["Dify", "RAG", "Workflow", "MCP"],
  },
];

export const businessProjects = workProjects.map((project) => ({
  name: project.name,
  meta: project.stack.join(" · "),
  description: project.summary,
  highlights: project.bullets,
}));

export const experience = [
  {
    company: "Guangzhou Qunjielong",
    role: "Frontend Technical Manager",
    date: "Jul 2020 — Present",
    description:
      "Led delivery across user, payments, IM, e-commerce, and operations platforms; owned architecture reviews, work breakdown, quality, releases, and mentoring.",
    highlights: [
      "Drove AI applications and frontend platform initiatives, integrating Dify, MCP, and low-code capabilities; owned technical design, frontend integration, and cross-team delivery.",
      "Proposed interaction and technical improvements, contributed to requirements, product design, and delivery, and initiated AI projects from design through business rollout.",
    ],
    stack: ["React", "Vue", "Angular", "MCP", "Dify"],
  },
  {
    company: "Guangzhou Lexing Technology",
    role: "Frontend Team Lead",
    date: "Apr 2018 — May 2020",
    description:
      "Led multi-platform delivery for 2B dealer tools and 2C automotive content products; owned architecture, technology selection, design reviews, and releases.",
    highlights: [],
    stack: ["Vue", "Nuxt.js", "Mini Program", "Webpack"],
  },
  {
    company: "Guangzhou Boyite Technology",
    role: "Frontend Engineer",
    date: "Apr 2017 — Apr 2018",
    description:
      "Built PC and mobile industrial data-visualization interfaces with ECharts and D3.js; added chart editing and multi-screen layouts, constrained concurrent rendering, and rasterized selected charts to reduce out-of-memory risk.",
    highlights: [],
    stack: ["ECharts", "D3.js", "JavaScript"],
  },
];

export const journey = [
  {
    year: "2023",
    title: "AI coding tools",
    text: "Built an internal VS Code code-generation extension with Python and LangChain; the project was later open-sourced.",
  },
  {
    year: "2025",
    title: "Agent and MCP",
    text: "Shipped the Qunjielong Operations Decision Agent, covering Agent architecture, intent recognition, RAG, MCP, context management, and an evaluation loop.",
  },
  {
    year: "2026",
    title: "AI application delivery",
    text: "Delivered a customer-service knowledge base and a product-selection calendar on Dify, forming searchable, conversational business capabilities.",
  },
];

export const allSkills = [
  "Dify",
  "MCP",
  "Agent",
  "RAG",
  "LangChain",
  "ReAct",
  "Tool Calling",
  "React",
  "Vue 2 / 3",
  "Angular",
  "TypeScript",
  "Mini Program",
  "Flutter",
  "Node.js",
  "Monorepo",
  "Webpack",
  "Nginx",
  "Docker",
  "Prometheus",
  "Sentry",
];

export const education = {
  school: "Zhengzhou University",
  degree: "B.Eng. in Communication Engineering",
  note: "Project 211 / Double First-Class",
  date: "Sep 2012 — Jun 2016",
};
