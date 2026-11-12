import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Gauge,
  Github,
  GraduationCap,
  Loader2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Printer,
  Quote,
  Sparkles,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  aiProjects,
  allSkills,
  bossGreeting,
  businessProjects,
  education,
  experience,
  expertise,
  featuredStack,
  journey,
  metrics,
  personalProjects,
  profile,
  selfIntroduction,
} from "./data";

const uniqueHighlights = (job) => {
  const seen = new Set([job.description]);
  return job.highlights.filter((item) => {
    if (seen.has(item)) return false;
    seen.add(item);
    return true;
  });
};

const themes = [
  { id: "product", code: "01", name: "作品集", note: "项目优先" },
  { id: "editorial", code: "02", name: "编辑型", note: "叙事清晰" },
  { id: "executive", code: "03", name: "管理型", note: "管理纵深" },
  { id: "timeline", code: "04", name: "时间线", note: "成长脉络" },
  { id: "spotlight", code: "05", name: "画册型", note: "作品展示" },
];

const navItems = [
  { id: "projects", label: "项目" },
  { id: "expertise", label: "能力" },
  { id: "experience", label: "经历" },
  { id: "contact", label: "联系" },
];

const referenceNavItems = [
  { id: "about", label: "关于" },
  { id: "projects", label: "项目" },
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
  { id: "contact", label: "联系" },
];

const iconMap = {
  layers: Layers3,
  brain: BrainCircuit,
  gauge: Gauge,
  briefcase: BriefcaseBusiness,
  workflow: Workflow,
};

function getInitialTheme() {
  const fromUrl = new URLSearchParams(window.location.search).get("v");
  const fromStorage = window.localStorage.getItem("resume-theme");
  const candidate = fromUrl || fromStorage;
  return themes.some((item) => item.id === candidate) ? candidate : "product";
}

function App() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.body.dataset.theme = "reference";
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyText = async (text, label = "已复制") => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(label);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setToast(label);
    }
  };

  return (
    <div className="resume-app theme-reference">
      <ReferenceResume copyText={copyText} />
      <div className={`copy-toast ${toast ? "is-visible" : ""}`} role="status">
        <Check size={16} />
        {toast}
      </div>
    </div>
  );
}

function ThemeDock({ current, onSwitch }) {
  return (
    <nav className="theme-dock" aria-label="切换简历设计版本">
      <span className="dock-label">版本</span>
      <div className="dock-options">
        {themes.map((item) => (
          <button
            className={`dock-option ${current === item.id ? "is-active" : ""}`}
            key={item.id}
            type="button"
            onClick={() => onSwitch(item.id)}
            title={`${item.name} · ${item.note}`}
            aria-label={`查看${item.name}版本`}
          >
            <span>{item.code}</span>
            <strong>{item.name}</strong>
          </button>
        ))}
      </div>
    </nav>
  );
}

function MobileMenu({ onClose, onCopy }) {
  return (
    <div className="mobile-menu">
      <div className="mobile-menu-head">
        <span>KC · Resume</span>
        <button type="button" onClick={onClose} aria-label="关闭菜单">
          <X size={21} />
        </button>
      </div>
      <nav>
        {navItems.map((item, index) => (
          <a href={`#${item.id}`} onClick={onClose} key={item.id}>
            <span>0{index + 1}</span>
            {item.label}
            <ArrowUpRight size={17} />
          </a>
        ))}
      </nav>
      <div className="mobile-menu-actions">
        <button type="button" onClick={onCopy}>
          <Copy size={17} />
          Boss 招呼
        </button>
        <a href="/resume.docx" download>
          <Download size={17} />
          下载简历
        </a>
      </div>
    </div>
  );
}

function NavToggle({ onClick }) {
  return (
    <button className="nav-toggle" type="button" onClick={onClick} aria-label="打开导航">
      <Menu size={20} />
    </button>
  );
}

function ContactList({ compact = false }) {
  return (
    <div className={`contact-list ${compact ? "is-compact" : ""}`}>
      <a href={`tel:${profile.phone}`}>
        <Phone size={15} />
        {profile.phone}
      </a>
      <a href={`mailto:${profile.email}`}>
        <Mail size={15} />
        {profile.email}
      </a>
      <span>
        <MapPin size={15} />
        {profile.city}
      </span>
      <a href={profile.github} target="_blank" rel="noreferrer">
        <Github size={15} />
        GitHub
      </a>
    </div>
  );
}

function ActionLinks({ copyText, tone = "light" }) {
  return (
    <div className={`action-links tone-${tone}`}>
      <button type="button" onClick={() => copyText(bossGreeting, "Boss 招呼文案已复制")}>
        <Copy size={16} />
        复制 Boss 招呼
      </button>
      <a href="/resume.docx" download>
        <Download size={16} />
        下载完整简历
      </a>
      <button type="button" onClick={() => window.print()}>
        <Printer size={16} />
        打印 / PDF
      </button>
    </div>
  );
}

function SectionIndex({ number, children, className = "" }) {
  return (
    <div className={`section-index ${className}`}>
      <span>{number}</span>
      <strong>{children}</strong>
    </div>
  );
}

function MetricLine({ tone = "light" }) {
  return (
    <div className={`metric-line metric-line-${tone}`}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <small>{metric.note}</small>
        </div>
      ))}
    </div>
  );
}

function ProjectVisual({ variant, compact = false }) {
  const labels = {
    tools: "业务工具",
    chat: "小程序 AI",
    video: "多模态笔记",
    knowledge: "客服知识库",
    terminal: "质量检查",
    dashboard: "经营分析",
  };

  return (
    <div className={`project-visual visual-${variant} ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <div className="visual-topbar">
        <span className="visual-brand">{labels[variant]}</span>
        <span className="visual-role">真实业务场景</span>
      </div>

      {variant === "tools" && (
        <div className="tools-ui">
          <div className="visual-side">
            <span className="is-active">活动查询</span>
            <span>选品分析</span>
            <span>帮卖流程</span>
          </div>
          <div className="visual-main">
            <div className="mini-label">业务能力已接入</div>
            <div className="schema-row">
              <span>活动与商品查询</span>
              <b>可用</b>
            </div>
            <div className="schema-row">
              <span>帮卖与核销操作</span>
              <b>可用</b>
            </div>
            <div className="schema-row">
              <span>鉴权与会话隔离</span>
              <b>已配置</b>
            </div>
            <div className="success-line">
              <Check size={13} />
              12 项业务能力稳定调用
            </div>
          </div>
        </div>
      )}

      {variant === "chat" && (
        <div className="chat-ui">
          <div className="user-bubble">帮我分析本周适合发布的活动</div>
          <div className="bot-bubble">
            <span className="bot-avatar">AI</span>
            <div>
              <p>已分析 4 场活动与 12 个商品</p>
              <div className="tool-pills">
                <span>活动分析</span>
                <span>选品</span>
                <span>文案生成</span>
              </div>
            </div>
          </div>
          <div className="chat-input">
            <span>继续追问...</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      )}

      {variant === "video" && (
        <div className="video-ui">
          <div className="video-canvas">
            <span className="play-dot">▶</span>
            <div className="video-caption">KEYNOTE / VISION ANALYSIS</div>
          </div>
          <div className="video-notes">
            <div className="mini-label">STRUCTURED NOTES</div>
            <strong>The AI Landscape</strong>
            <span>01 · Opening</span>
            <span>02 · Key points</span>
            <span>03 · Summary</span>
          </div>
        </div>
      )}

      {variant === "knowledge" && (
        <div className="knowledge-ui">
          <div className="knowledge-search">
            <span>如何申请售后退款？</span>
            <ArrowRight size={15} />
          </div>
          <div className="knowledge-result">
            <span>知识命中 · 0.92</span>
            <p>退款规则与售后处理流程</p>
          </div>
          <div className="knowledge-result">
            <span>知识命中 · 0.87</span>
            <p>订单异常与人工转接说明</p>
          </div>
          <div className="knowledge-status">1,970 条资料 · RAG workflow</div>
        </div>
      )}

      {variant === "terminal" && (
        <div className="terminal-ui">
          <div>工具质量回归</div>
          <div><em>通过</em> 工具契约校验</div>
          <div><em>通过</em> YAML 用例断言</div>
          <div><em>通过</em> CI 报告输出</div>
          <div className="terminal-total">14 项通过 · 可持续回归</div>
        </div>
      )}

      {variant === "dashboard" && (
        <div className="dashboard-ui">
          <div className="dashboard-head">
            <span>经营概览</span>
            <b>本周</b>
          </div>
          <div className="bar-chart">
            {[46, 66, 52, 82, 68, 91, 74].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="dashboard-stats">
            <span><b>32</b> 活动</span>
            <span><b>18</b> 热销品</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectMedia({ project, compact = false }) {
  const [isPrimaryLoaded, setIsPrimaryLoaded] = useState(false);
  const primaryImageRef = useRef(null);

  useEffect(() => {
    if (primaryImageRef.current?.complete) {
      setIsPrimaryLoaded(true);
    }
  }, []);

  if (!project.personal) {
    return <ProjectVisual variant={project.visual} compact={compact} />;
  }

  const hasMedia = project.demoGif || project.demoImage;

  return (
    <figure
      className={`project-demo-slot ${compact ? "is-compact" : ""}`}
      data-project-demo={project.key}
      aria-busy={hasMedia && !isPrimaryLoaded}
    >
      <div className="project-demo-head">
        <span>{project.name}</span>
        <span>{project.years}</span>
      </div>
      {hasMedia ? (
        <>
          <div className={`project-demo-primary ${isPrimaryLoaded ? "is-loaded" : "is-loading"}`}>
            <img
              src={project.demoGif || project.demoImage}
              alt={`${project.name} 项目演示`}
              ref={primaryImageRef}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsPrimaryLoaded(true)}
              onError={() => setIsPrimaryLoaded(true)}
            />
            {!isPrimaryLoaded && (
              <div className="project-demo-loading" aria-live="polite">
                <Loader2 size={16} className="project-demo-loading-icon" />
                <span>加载中</span>
              </div>
            )}
          </div>
          {project.demoShots?.length > 0 && (
            <div className="project-demo-shots">
              {project.demoShots.map((shot) => (
                <div key={shot.src}>
                  <img src={shot.src} alt={`${project.name} ${shot.label}`} loading="lazy" decoding="async" />
                  <span>{shot.label}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="project-demo-canvas">
          <span className="project-demo-play"><Play size={17} fill="currentColor" /></span>
          <div>
            <span>{project.name}</span>
            <strong>项目演示位置</strong>
            <small>IMAGE / GIF / VIDEO</small>
          </div>
        </div>
      )}
    </figure>
  );
}

function HighlightText({ text }) {
  const [label, ...rest] = text.split("：");
  if (rest.length === 0) return text;

  return (
    <>
      <strong>{label}：</strong>
      {rest.join("：")}
    </>
  );
}

function ExpertiseGrid({ variant = "default" }) {
  return (
    <div className={`expertise-grid expertise-${variant}`}>
      {expertise.map((item, index) => {
        const Icon = iconMap[item.icon];
        return (
          <article key={item.title} className="expertise-item">
            <div className="expertise-top">
              <span className="expertise-icon"><Icon size={19} /></span>
              <span className="expertise-number">0{index + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="skill-tags">
              {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ProductResume({ mobileOpen, setMobileOpen, copyText }) {
  return (
    <>
      <header className="product-nav">
        <div className="site-container nav-inner">
          <a className="product-logo" href="#top" aria-label="返回顶部">
            KC<span>.</span>
          </a>
          <nav className="desktop-nav">
            {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-download" href="/resume.docx" download>
              <Download size={16} />
              简历
            </a>
            <NavToggle onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      <main id="top">
        <section className="product-hero">
          <div className="site-container product-hero-grid">
            <div className="product-hero-copy">
              <div className="eyebrow eyebrow-blue">
                <span className="status-dot" />
                {profile.availability}
              </div>
              <h1>
                寇晨迪
                <span>AI 应用工程师</span>
              </h1>
              <p className="hero-lead">{profile.summary}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  查看项目
                  <ArrowDown size={17} />
                </a>
                <a className="button button-quiet" href={`mailto:${profile.email}`}>
                  联系我
                  <ArrowUpRight size={17} />
                </a>
              </div>
              <ContactList />
            </div>

            <div className="candidate-board">
              <div className="candidate-board-head">
                <span>PROFILE / 001</span>
                <span>SHENZHEN</span>
              </div>
              <figure className="candidate-proof">
                <img src="/assets/video-note.png" alt="VideoNote 多模态视频笔记项目界面" />
                <figcaption>
                  <span>VIDEONOTE · 2026</span>
                  <strong>视频 → ASR → 关键帧 → 结构化笔记</strong>
                </figcaption>
              </figure>
              <div className="candidate-meta">
                <div>
                  <span>当前角色</span>
                  <strong>{profile.currentRole}</strong>
                </div>
                <div>
                  <span>核心方向</span>
                  <strong>AI 应用 × 前端架构</strong>
                </div>
                <div>
                  <span>英语</span>
                  <strong>CET-6 · 日常沟通</strong>
                </div>
              </div>
              <div className="candidate-stack">
                {["React", "Vue", "MCP", "Dify", "Agent"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <MetricLine />

        <section id="about" className="section product-about">
          <div className="site-container">
            <SectionIndex number="01">个人定位</SectionIndex>
            <div className="product-about-grid">
              <h2>既能处理复杂前端系统，也能把 AI 能力做成业务真正可用的产品。</h2>
              <div>
                <p>{profile.intro}</p>
                <p>{profile.aiSummary}</p>
                <div className="inline-proof">
                  <span><Check size={15} /> 大型项目拆分与重构</span>
                  <span><Check size={15} /> MCP / Agent 落地</span>
                  <span><Check size={15} /> 团队与交付管理</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="section product-expertise">
          <div className="site-container">
            <SectionIndex number="02">能力结构</SectionIndex>
            <div className="section-title-row">
              <h2>前端深度，AI 广度，交付闭环。</h2>
              <p>覆盖架构、工程、业务与团队协作，不只是一组框架名称。</p>
            </div>
            <ExpertiseGrid />
          </div>
        </section>

        <section id="projects" className="section product-projects">
          <div className="site-container">
            <SectionIndex number="03">精选项目</SectionIndex>
            <div className="section-title-row">
              <h2>AI 不是演示，而是进入真实业务链路。</h2>
              <p>从工具契约、工作流到多模态长任务，关注可用性、维护性和可观测性。</p>
            </div>
            <div className="product-project-list">
              {aiProjects.slice(0, 5).map((project, index) => (
                <article className={`product-project ${index === 0 ? "is-featured" : ""}`} key={project.key}>
                  <div className="project-copy">
                    <div className="project-kicker">
                      <span>{project.kicker}</span>
                      <small>{project.years}</small>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    <ul>
                      {project.bullets.slice(0, 2).map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    <div className="project-bottom">
                      <div className="skill-tags">
                        {project.stack.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          查看项目 <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  <ProjectMedia project={project} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-business">
          <div className="site-container">
            <SectionIndex number="04">业务项目</SectionIndex>
            <div className="business-strip">
              {businessProjects.map((project) => (
                <article key={project.name}>
                  <span>{project.meta}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <strong>{project.highlights[0]}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section product-experience">
          <div className="site-container product-experience-grid">
            <div>
              <SectionIndex number="05">工作经历</SectionIndex>
              <h2>从工程效率，<br />到业务负责人。</h2>
              <p className="section-support">带过团队，也持续写代码；能够把技术判断落到方案、节奏和交付结果上。</p>
            </div>
            <div className="experience-list">
              {experience.map((job) => (
                <article key={job.company}>
                  <div className="job-head">
                    <div>
                      <h3>{job.company}</h3>
                      <span>{job.role}</span>
                    </div>
                    <time>{job.date}</time>
                  </div>
                  <p>{job.description}</p>
                  <ul>
                    {uniqueHighlights(job).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="skill-tags">
                    {job.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="site-container product-education">
            <GraduationCap size={18} />
            <strong>{education.school}</strong>
            <span>{education.note} · {education.degree}</span>
            <time>{education.date}</time>
          </div>
        </section>

        <section id="contact" className="product-contact">
          <div className="site-container product-contact-grid">
            <div>
              <div className="eyebrow">OPEN TO WORK</div>
              <h2>希望把下一段经验，<br />用在更具产品价值的 AI 应用上。</h2>
              <p>关注 AI 应用工程师、Agent 工程和应用集成方向。</p>
              <ContactList />
            </div>
            <div className="contact-panel">
              <ActionLinks copyText={copyText} tone="dark" />
              <button
                className="text-copy"
                type="button"
                onClick={() => copyText(selfIntroduction, "自我介绍已复制")}
              >
                复制自我介绍
                <Copy size={15} />
              </button>
            </div>
          </div>
          <div className="site-container footer-line">
            <span>© 2026 寇晨迪</span>
            <a href="#top">回到顶部 ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}

function EditorialResume({ mobileOpen, setMobileOpen, copyText }) {
  return (
    <>
      <header className="editorial-nav">
        <div className="editorial-container editorial-nav-inner">
          <a className="editorial-logo" href="#top">
            <span />
            寇晨迪
          </a>
          <nav className="desktop-nav">
            {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="editorial-contact-link" href={`mailto:${profile.email}`}>联系我</a>
            <NavToggle onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      <main id="top" className="editorial-main">
        <section className="editorial-hero">
          <div className="editorial-container">
            <div className="editorial-issue">
              <span>PORTFOLIO / 2026</span>
              <span>AI APPLICATION ENGINEER</span>
            </div>
            <div className="editorial-hero-grid">
              <div className="editorial-name">
                <span>寇</span>
                晨迪
              </div>
              <div className="editorial-monogram">
                <span>09</span>
                <strong>YEARS</strong>
                <small>IN FRONTEND</small>
              </div>
            </div>
            <div className="editorial-headline">
              <h1>把复杂系统做简单，<br />把 AI 能力做进业务。</h1>
              <div>
                <p>{profile.summary}</p>
                <a href="#projects">浏览精选项目 <ArrowUpRight size={17} /></a>
              </div>
            </div>
            <div className="editorial-profile-row">
              <span>深圳 / 中国</span>
              <span>前端技术经理</span>
              <span>React · Vue · MCP</span>
              <span>看机会</span>
            </div>
          </div>
        </section>

        <section id="about" className="editorial-section editorial-about">
          <div className="editorial-container editorial-two-col">
            <SectionIndex number="01">关于</SectionIndex>
            <div>
              <p className="editorial-large-text">
                我有近十年前端研发经验，做过大型项目拆分、工程治理和团队管理。
                近三年把注意力放到 AI 应用落地，从工具契约、RAG 到 Agent 工作流，持续在真实业务里验证技术价值。
              </p>
              <div className="editorial-notes">
                <div>
                  <span>01 / 工程底盘</span>
                  <p>React、Vue、Angular、小程序与 Node.js，能处理复杂历史项目，也能从 0 到 1 搭架构。</p>
                </div>
                <div>
                  <span>02 / AI 落地</span>
                  <p>不只调用模型，更关注工具质量、业务边界、失败恢复和线上可观测性。</p>
                </div>
                <div>
                  <span>03 / 团队协作</span>
                  <p>带过 12 人团队，做过方案评审、任务拆解、质量控制与成员培养。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="editorial-section editorial-expertise">
          <div className="editorial-container">
            <SectionIndex number="02">能力</SectionIndex>
            <div className="editorial-skill-head">
              <h2>跨越界面、工程与智能应用。</h2>
              <div className="skill-cloud">
                {allSkills.slice(0, 15).map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
            <ExpertiseGrid variant="editorial" />
          </div>
        </section>

        <section id="projects" className="editorial-section editorial-projects">
          <div className="editorial-container">
            <SectionIndex number="03">精选项目</SectionIndex>
            <div className="editorial-project-list">
              {aiProjects.slice(0, 5).map((project, index) => (
                <article className="editorial-project" key={project.key}>
                  <div className="editorial-project-index">0{index + 1}</div>
                  <div className="editorial-project-copy">
                    <span>{project.kicker} · {project.years}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    <ul>
                      {project.bullets.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="skill-tags">
                      {project.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <ProjectMedia project={project} compact />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="editorial-section editorial-experience">
          <div className="editorial-container editorial-exp-grid">
            <div>
              <SectionIndex number="04">经历</SectionIndex>
              <h2>在业务里成长，<br />在团队里放大。</h2>
            </div>
            <div className="editorial-timeline">
              {experience.map((job) => (
                <article key={job.company}>
                  <time>{job.date}</time>
                  <div>
                    <span>{job.role}</span>
                    <h3>{job.company}</h3>
                    <p>{job.description}</p>
                    <ul>
                      {uniqueHighlights(job).slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-education">
          <div className="editorial-container">
            <SectionIndex number="05">教育</SectionIndex>
            <div>
              <GraduationCap size={22} />
              <h3>{education.school}</h3>
              <p>{education.note} · {education.degree}</p>
              <span>{education.date}</span>
            </div>
          </div>
        </section>

        <section id="contact" className="editorial-contact">
          <div className="editorial-container">
            <Quote size={28} />
            <h2>一起做有价值、能落地的 AI 产品。</h2>
            <p>AI 应用 · Agent 工程 · 应用集成</p>
            <ContactList />
            <ActionLinks copyText={copyText} tone="dark" />
          </div>
        </section>
      </main>
    </>
  );
}

function ExecutiveResume({ mobileOpen, setMobileOpen, copyText }) {
  return (
    <>
      <header className="executive-nav">
        <div className="site-container nav-inner">
          <a className="executive-logo" href="#top">
            KC <span>/ 2026</span>
          </a>
          <nav className="desktop-nav">
            {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="executive-copy" type="button" onClick={() => copyText(bossGreeting, "Boss 招呼文案已复制")}>
              <Copy size={15} />
              招呼文案
            </button>
            <NavToggle onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      <main id="top" className="executive-main">
        <section className="executive-hero">
          <div className="site-container">
            <div className="executive-topline">
              <span>AI FRONTEND LEADERSHIP</span>
              <span>SHENZHEN · CHINA</span>
            </div>
            <div className="executive-hero-grid">
              <div>
                <div className="eyebrow">CANDIDATE PROFILE</div>
                <h1>寇晨迪</h1>
                <p className="executive-role">AI 应用工程师 / 前端技术经理</p>
                <div className="executive-rule" />
                <ContactList />
              </div>
              <div className="executive-summary">
                <span>EXECUTIVE SUMMARY</span>
                <p>
                  近十年前端研发与管理经验。擅长复杂项目治理、团队交付和跨端架构，
                  同时具备 MCP、Dify、Agent、RAG 与多模态应用的完整实践。
                </p>
                <p>
                  能连接技术判断与业务目标，把新能力从试验推进到稳定上线。
                </p>
                <div className="executive-badges">
                  <span><BadgeCheck size={15} /> 12 人团队管理</span>
                  <span><Zap size={15} /> AI 业务落地</span>
                  <span><Code2 size={15} /> 持续一线研发</span>
                </div>
              </div>
            </div>
            <div className="executive-stats">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.note}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="executive-section executive-overview">
          <div className="site-container">
            <SectionIndex number="01">管理视角</SectionIndex>
            <div className="executive-overview-grid">
              <h2>技术负责人不仅要做出方案，还要让团队稳定交付。</h2>
              <div className="executive-prose">
                <p>{profile.intro}</p>
                <p>{profile.aiSummary}</p>
              </div>
            </div>
            <div className="leadership-points">
              <div>
                <span>01</span>
                <Users size={20} />
                <h3>团队与节奏</h3>
                <p>承担方案评审、任务拆解、质量控制、版本交付和成员培养，最高管理 12 人团队。</p>
              </div>
              <div>
                <span>02</span>
                <Workflow size={20} />
                <h3>复杂项目推进</h3>
                <p>统筹用户、支付、IM、电商和运营后台研发，推动跨团队联调与产品落地。</p>
              </div>
              <div>
                <span>03</span>
                <Sparkles size={20} />
                <h3>新技术验证</h3>
                <p>从 Dify、MCP 到 Agent 与多模态，先验证业务价值，再沉淀可复用工程能力。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="executive-section executive-expertise">
          <div className="site-container">
            <SectionIndex number="02">专业能力</SectionIndex>
            <div className="executive-skill-table">
              {expertise.map((group, index) => (
                <article key={group.title}>
                  <span>0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div>{group.skills.join(" / ")}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="executive-section executive-projects">
          <div className="site-container">
            <SectionIndex number="03">代表成果</SectionIndex>
            <div className="executive-project-head">
              <h2>把 AI 能力接入业务现场。</h2>
              <p>工具契约、会话隔离、RAG 工作流、长任务恢复，每一项都面向真实使用场景。</p>
            </div>
            <div className="executive-project-list">
              {aiProjects.slice(0, 5).map((project, index) => (
                <article key={project.key}>
                  <span className="executive-project-number">0{index + 1}</span>
                  <div>
                    <small>{project.kicker} · {project.years}</small>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <ul>
                    {project.bullets.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {project.personal && <ProjectMedia project={project} compact />}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="executive-section executive-career">
          <div className="site-container">
            <SectionIndex number="04">职业履历</SectionIndex>
            <div className="executive-career-list">
              {experience.map((job) => (
                <article key={job.company}>
                  <time>{job.date}</time>
                  <div>
                    <span>{job.role}</span>
                    <h3>{job.company}</h3>
                  </div>
                  <div>
                    <p>{job.description}</p>
                    <ul>
                    {uniqueHighlights(job).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="executive-education-row">
              <GraduationCap size={18} />
              <strong>{education.school}</strong>
              <span>{education.note} · {education.degree}</span>
              <time>{education.date}</time>
            </div>
          </div>
        </section>

        <section id="contact" className="executive-contact">
          <div className="site-container executive-contact-grid">
            <div>
              <div className="eyebrow">NEXT OPPORTUNITY</div>
              <h2>寻找能同时发挥前端深度与 AI 落地能力的机会。</h2>
            </div>
            <div>
              <ContactList />
              <ActionLinks copyText={copyText} tone="dark" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function TimelineResume({ mobileOpen, setMobileOpen, copyText }) {
  return (
    <>
      <header className="timeline-nav">
        <div className="timeline-container nav-inner">
          <a className="timeline-logo" href="#top">
            寇晨迪<span>/ AI 应用</span>
          </a>
          <nav className="desktop-nav">
            {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="timeline-mail" href={`mailto:${profile.email}`}>
              <Mail size={16} />
              Email
            </a>
            <NavToggle onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      <main id="top" className="timeline-main">
        <section className="timeline-hero">
          <div className="timeline-container">
            <div className="timeline-hero-copy">
              <span className="eyebrow">9 YEARS IN FRONTEND · AI IN PRACTICE</span>
              <h1>一条持续向前的<br />前端工程路径。</h1>
              <p>{profile.summary}</p>
              <div className="timeline-hero-actions">
                <a href="#journey">查看成长路径 <ArrowDown size={16} /></a>
                <span><CircleDot size={14} /> 深圳 · 看机会</span>
              </div>
            </div>
            <div className="timeline-hero-card">
              <span>当前坐标</span>
              <strong>2026</strong>
              <p>前端技术经理</p>
              <div>
                <span>架构</span>
                <span>团队</span>
                <span>AI 落地</span>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="timeline-section timeline-journey">
          <div className="timeline-container">
            <SectionIndex number="01">AI 实践路径</SectionIndex>
            <div className="journey-list">
              {journey.map((item) => (
                <article key={item.year}>
                  <time>{item.year}</time>
                  <div className="journey-node"><span /></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="timeline-section timeline-about">
          <div className="timeline-container timeline-about-grid">
            <div>
              <SectionIndex number="02">个人概览</SectionIndex>
              <h2>代码、架构、团队与 AI，形成一条完整能力线。</h2>
            </div>
            <div>
              <p>{profile.intro}</p>
              <p>{profile.aiSummary}</p>
              <div className="timeline-facts">
                <div><strong>09</strong><span>年前端经验</span></div>
                <div><strong>12</strong><span>人团队规模</span></div>
                <div><strong>05</strong><span>类 AI 项目</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="timeline-section timeline-skills">
          <div className="timeline-container">
            <SectionIndex number="03">能力坐标</SectionIndex>
            <div className="timeline-skill-list">
              {expertise.map((group, index) => (
                <article key={group.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="skill-tags">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="timeline-section timeline-projects">
          <div className="timeline-container">
            <SectionIndex number="04">项目节点</SectionIndex>
            <div className="timeline-project-grid">
              {aiProjects.slice(0, 5).map((project, index) => (
                <article key={project.key} className={index === 0 ? "is-wide" : ""}>
                  <div className="timeline-project-meta">
                    <span>0{index + 1}</span>
                    <time>{project.years}</time>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="skill-tags">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  {project.personal && <ProjectMedia project={project} compact />}
                  {index === 0 && <ProjectVisual variant={project.visual} compact />}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="timeline-section timeline-experience">
          <div className="timeline-container">
            <SectionIndex number="05">工作经历</SectionIndex>
            <div className="career-timeline">
              {experience.map((job) => (
                <article key={job.company}>
                  <time>{job.date}</time>
                  <span className="career-dot" />
                  <div>
                    <small>{job.role}</small>
                    <h3>{job.company}</h3>
                    <p>{job.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="timeline-business">
              {businessProjects.map((project) => (
                <article key={project.name}>
                  <span>{project.meta}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
            <div className="timeline-education">
              <GraduationCap size={18} />
              <strong>{education.school}</strong>
              <span>{education.note} · {education.degree}</span>
              <time>{education.date}</time>
            </div>
          </div>
        </section>

        <section id="contact" className="timeline-contact">
          <div className="timeline-container">
            <span>NEXT CHAPTER</span>
            <h2>下一段，希望继续把技术变成业务结果。</h2>
            <ContactList />
            <ActionLinks copyText={copyText} tone="dark" />
          </div>
        </section>
      </main>
    </>
  );
}

function SpotlightResume({ mobileOpen, setMobileOpen, copyText }) {
  return (
    <>
      <header className="spotlight-nav">
        <div className="site-container nav-inner">
          <a className="spotlight-logo" href="#top">
            <span>KC</span> 寇晨迪
          </a>
          <nav className="desktop-nav">
            {navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="spotlight-download" href="/resume.docx" download>
              <Download size={15} />
              PDF / DOCX
            </a>
            <NavToggle onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </header>

      <main id="top" className="spotlight-main">
        <section className="spotlight-hero">
          <div className="site-container">
            <div className="spotlight-hero-top">
              <span>AI FRONTEND PORTFOLIO</span>
              <span>09 YEARS · SHENZHEN</span>
            </div>
            <div className="spotlight-hero-grid">
              <div>
                <div className="eyebrow">AVAILABLE FOR SELECTED ROLES</div>
                <h1>寇晨迪<span>AI 应用工程师</span></h1>
              </div>
              <div className="spotlight-hero-note">
                <p>{profile.summary}</p>
                <a href="#projects">浏览项目 <ArrowDown size={16} /></a>
              </div>
            </div>
            <div className="spotlight-cover-grid">
              <div className="spotlight-cover-main">
                <span>SELECTED WORK</span>
                <img src="/assets/video-note.png" alt="VideoNote 多模态视频笔记项目界面" />
                <strong>VideoNote · 多模态视频笔记</strong>
              </div>
              <div className="spotlight-cover-stat">
                <span>前端经验</span>
                <strong>09</strong>
                <small>YEARS</small>
              </div>
              <div className="spotlight-cover-stat is-blue">
                <span>管理规模</span>
                <strong>12</strong>
                <small>PEOPLE</small>
              </div>
              <div className="spotlight-cover-quote">
                <Quote size={21} />
                <p>复杂系统需要清晰的判断，AI 应用需要真正理解业务。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="spotlight-section spotlight-projects">
          <div className="site-container">
            <div className="spotlight-title-row">
              <SectionIndex number="01">项目精选</SectionIndex>
              <p>这里展示的不仅是功能，更是问题拆解、工程边界和交付结果。</p>
            </div>
            <div className="spotlight-project-grid">
              {aiProjects.slice(0, 5).map((project, index) => (
                <article key={project.key} className={`spotlight-project spotlight-project-${index + 1}`}>
                  <ProjectMedia project={project} />
                  <div className="spotlight-project-copy">
                    <span>{project.kicker}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    <div className="skill-tags">
                      {project.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        查看项目 <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="spotlight-section spotlight-about">
          <div className="site-container spotlight-about-grid">
            <div className="spotlight-about-title">
              <SectionIndex number="02">关于我</SectionIndex>
              <h2>做过长时间的业务系统，也做过从零验证的 AI 产品。</h2>
            </div>
            <div className="spotlight-about-copy">
              <p>{profile.intro}</p>
              <p>{profile.aiSummary}</p>
              <div className="spotlight-values">
                <span>01 · 先理解业务</span>
                <span>02 · 重视工程质量</span>
                <span>03 · 对结果负责</span>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="spotlight-section spotlight-expertise">
          <div className="site-container">
            <SectionIndex number="03">能力标签</SectionIndex>
            <div className="spotlight-skill-layout">
              <div className="spotlight-skill-intro">
                <h2>前端是底盘，AI 是新一层产品能力。</h2>
                <p>技术选型会跟随业务问题，而不是反过来限制业务。</p>
              </div>
              <ExpertiseGrid variant="spotlight" />
            </div>
          </div>
        </section>

        <section className="spotlight-section spotlight-business">
          <div className="site-container">
            <SectionIndex number="04">业务项目</SectionIndex>
            <div className="spotlight-business-grid">
              {businessProjects.map((project, index) => (
                <article key={project.name}>
                  <span>0{index + 1}</span>
                  <small>{project.meta}</small>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <strong>{project.highlights[0]}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="spotlight-section spotlight-experience">
          <div className="site-container">
            <SectionIndex number="05">工作经历</SectionIndex>
            <div className="spotlight-career">
              {experience.map((job, index) => (
                <article key={job.company}>
                  <span>0{index + 1}</span>
                  <div>
                    <time>{job.date}</time>
                    <h3>{job.company}</h3>
                    <small>{job.role}</small>
                  </div>
                  <p>{job.description}</p>
                </article>
              ))}
            </div>
            <div className="spotlight-education">
              <GraduationCap size={18} />
              <strong>{education.school}</strong>
              <span>{education.note} · {education.degree}</span>
              <time>{education.date}</time>
            </div>
          </div>
        </section>

        <section id="contact" className="spotlight-contact">
          <div className="site-container">
            <div className="spotlight-contact-mark">KC</div>
            <div>
              <span>LET'S TALK</span>
              <h2>寻找能把技术判断转化为产品结果的机会。</h2>
              <ContactList />
            </div>
            <ActionLinks copyText={copyText} tone="dark" />
          </div>
        </section>
      </main>
    </>
  );
}

const referenceRoles = ["前端工程师", "前端技术经理", "AI 应用工程师"];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const currentRole = referenceRoles[roleIndex];

  useEffect(() => {
    if (!deleting && display === currentRole) {
      const timer = window.setTimeout(() => setDeleting(true), 1450);
      return () => window.clearTimeout(timer);
    }

    if (deleting && display === "") {
      const timer = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % referenceRoles.length);
      }, 240);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      const nextLength = display.length + (deleting ? -1 : 1);
      setDisplay(currentRole.slice(0, nextLength));
    }, deleting ? 48 : 105);

    return () => window.clearTimeout(timer);
  }, [currentRole, deleting, display]);

  return (
    <p className="reference-hero-role" aria-label={`职位：${profile.role}`}>
      <span aria-hidden="true">
        {display}
        <span className="reference-type-cursor">|</span>
      </span>
    </p>
  );
}

function ReferencePortrait() {
  return (
    <div className="reference-portrait-area">
      <div className="reference-portrait-glow" aria-hidden="true" />
      <div className="reference-portrait-frame">
        <img
          className="reference-portrait-image"
          src="/assets/avatar-real.jpg"
          alt={`${profile.name}的照片`}
        />
      </div>
    </div>
  );
}

function useReferenceMotion() {
  useEffect(() => {
    const page = document.querySelector(".theme-reference");
    if (!page) return undefined;

    const elements = [...page.querySelectorAll(".reveal-on-scroll")];
    page.classList.add("reveal-enabled");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const hashTarget = document.getElementById(window.location.hash.slice(1));
    if (hashTarget) {
      elements.forEach((element) => {
        if (hashTarget.contains(element)) element.classList.add("is-revealed");
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    const revealVisible = window.setTimeout(() => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add("is-revealed");
          observer.unobserve(element);
        }
      });
    }, 220);

    return () => {
      window.clearTimeout(revealVisible);
      observer.disconnect();
      page.classList.remove("reveal-enabled");
      elements.forEach((element) => element.classList.remove("is-revealed"));
    };
  }, []);
}

function ReferenceResume({ copyText }) {
  const [wechatOpen, setWechatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(referenceNavItems[0].id);
  const [navReady, setNavReady] = useState(false);
  const navClickLockRef = useRef(0);
  useReferenceMotion();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setNavReady(true));
    const sections = referenceNavItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) {
      return () => window.cancelAnimationFrame(frame);
    }

    const updateActiveSection = () => {
      if (Date.now() - navClickLockRef.current < 1200) return;

      const marker = window.scrollY + 120;
      let current = sections[0].id;

      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (pageBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (marker >= top) current = section.id;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (id, behavior = "smooth") => {
    const target = document.getElementById(id);
    if (!target) return;

    const navHeight = document.querySelector(".ref-nav")?.getBoundingClientRect().height || 0;
    const revealOffset = id === "projects" ? 16 : 0;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - revealOffset);
    window.scrollTo({ top, behavior });
  };

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setActiveSection(id);
    navClickLockRef.current = Date.now();

    scrollToSection(id);
    window.history.pushState(null, "", `#${id}`);
  };

  useEffect(() => {
    const page = document.querySelector(".theme-reference");
    const hero = document.querySelector(".reference-hero");
    const secondScreen = document.querySelector(".ref-projects");
    const nav = page?.querySelector(".ref-nav");
    if (!page || !hero || !secondScreen) return undefined;

    let isSnapping = false;
    let snapAnimationFrame = 0;
    let unlockTimer;
    let transitionTimer;
    let touchStartY = 0;
    let touchStartScrollTop = 0;

    const getScrollTop = () => Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );

    const getSnapTop = (target) => {
      if (target === hero) return 0;
      const navHeight = nav?.getBoundingClientRect().height || 0;
      const anchor = target.querySelector("#projects") || target;
      return Math.max(0, anchor.getBoundingClientRect().top + getScrollTop() - navHeight - 16);
    };

    const cancelSnapAnimation = () => {
      if (!snapAnimationFrame) return;
      window.cancelAnimationFrame(snapAnimationFrame);
      snapAnimationFrame = 0;
    };

    const snapTo = (target) => {
      isSnapping = true;
      const transitionClass = target === hero ? "screen-transition-to-hero" : "screen-transition-to-content";
      const startTop = getScrollTop();
      const targetTop = getSnapTop(target);
      const startTime = performance.now();
      const duration = 620;
      const ease = (progress) => 1 - ((1 - progress) ** 3);

      cancelSnapAnimation();
      page.classList.remove("screen-transition-to-hero", "screen-transition-to-content");
      void page.offsetWidth;
      page.classList.add(transitionClass);
      const animateScroll = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, startTop + ((targetTop - startTop) * ease(progress)));
        if (progress < 1) {
          snapAnimationFrame = window.requestAnimationFrame(animateScroll);
        } else {
          snapAnimationFrame = 0;
        }
      };
      snapAnimationFrame = window.requestAnimationFrame(animateScroll);
      window.clearTimeout(unlockTimer);
      window.clearTimeout(transitionTimer);
      unlockTimer = window.setTimeout(() => {
        isSnapping = false;
      }, 100);
      transitionTimer = window.setTimeout(() => {
        page.classList.remove("screen-transition-to-hero", "screen-transition-to-content");
      }, 760);
    };

    const handleWheel = (event) => {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (isSnapping) {
        event.preventDefault();
        return;
      }

      cancelSnapAnimation();

      const scrollTop = getScrollTop();
      const secondScreenTop = getSnapTop(secondScreen);

      if (event.deltaY > 0 && scrollTop <= 8) {
        event.preventDefault();
        snapTo(secondScreen);
      } else if (event.deltaY < 0 && scrollTop >= secondScreenTop - 16 && scrollTop <= secondScreenTop + 40) {
        event.preventDefault();
        snapTo(hero);
      }
    };

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY || 0;
      touchStartScrollTop = getScrollTop();
    };

    const handleTouchEnd = (event) => {
      if (isSnapping) return;
      const touchEndY = event.changedTouches[0]?.clientY || touchStartY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < 12) return;

      const scrollTop = touchStartScrollTop;
      const secondScreenTop = getSnapTop(secondScreen);
      if (deltaY > 0 && scrollTop <= 8) {
        snapTo(secondScreen);
      } else if (deltaY < 0 && scrollTop >= secondScreenTop - 16 && scrollTop <= secondScreenTop + 40) {
        snapTo(hero);
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      cancelSnapAnimation();
      window.clearTimeout(unlockTimer);
      window.clearTimeout(transitionTimer);
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      page.classList.remove("screen-transition-to-hero", "screen-transition-to-content");
    };
  }, []);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const frame = window.requestAnimationFrame(() => scrollToSection(targetId, "auto"));
    const timer = window.setTimeout(() => scrollToSection(targetId, "auto"), 180);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!wechatOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setWechatOpen(false);
    };

    document.body.classList.add("menu-locked");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-locked");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [wechatOpen]);

  return (
    <>
      <header className={`ref-nav ${navReady ? "is-visible" : ""}`}>
        <div className="ref-container ref-nav-inner">
          <a className="ref-logo" href="#top" aria-label="返回顶部">
            <span className="ref-logo-mark" aria-hidden="true">
              <FileText size={16} strokeWidth={2.2} />
              <Sparkles className="ref-logo-spark" size={8} strokeWidth={2.5} />
            </span>
            <span className="ref-logo-name">寇晨迪</span>
          </a>
          <nav className="ref-nav-links" aria-label="简历页面导航">
            {referenceNavItems.map((item) => (
              <a
                className={activeSection === item.id ? "is-active" : ""}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ref-nav-actions">
            <a className="ref-resume-download" href="/resume">
              在线简历
              <FileText size={15} />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="ref-main">
        <section id="about" className="reference-hero">
          <div className="reference-hero-dots" aria-hidden="true" />
          <div className="reference-hero-card">
            <div className="reference-hero-columns">
              <div className="reference-hero-copy">
                <h1 className="reference-hero-title">
                  Hi, I'm
                  <span>{profile.name}</span>
                </h1>
                <TypewriterRole />
                <p className="reference-hero-summary">{profile.summary}</p>
                <div className="reference-hero-action">
                  <a
                    className="reference-projects-button"
                    href="#projects"
                    onClick={(event) => handleNavClick(event, "projects")}
                  >
                    查看项目
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <ReferencePortrait />
            </div>
          </div>

          <div className="reference-social-rail" aria-label="联系与社交链接">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="发送邮件">
              <Mail size={18} />
            </a>
            <a href={`tel:${profile.phone}`} aria-label="拨打电话">
              <Phone size={18} />
            </a>
          </div>
          <a className="reference-scroll-cue" href="#skills" aria-label="浏览技术栈与精选项目">
            <ArrowDown size={20} />
          </a>
        </section>

        <section className="ref-section ref-projects">
          <div className="ref-container">
            <div className="ref-section-head reveal-on-scroll" id="projects">
              <span>01</span>
              <h2>个人项目</h2>
              <p>AI 产品、开发工具与工程实践</p>
            </div>

            <div className="ref-project-list">
              {personalProjects.map((project, index) => (
                <article
                  id={`project-${project.key}`}
                  className={`ref-project-card reveal-on-scroll ${index === 0 ? "is-featured" : ""} ${project.demoGif ? "has-animated-demo" : ""}`}
                  key={project.key}
                  style={{ "--reveal-delay": `${(index % 2) * 90}ms` }}
                >
                  <div className="ref-project-copy">
                    <div className="ref-project-meta">
                      <span>{project.kicker}</span>
                      <time>{project.years}</time>
                    </div>
                    <h3>{project.name}</h3>
                    <p className="ref-project-summary">{project.summary}</p>
                    <div className="ref-highlight-list">
                      {project.bullets.map((bullet, bulletIndex) => (
                        <div key={bullet}>
                          <span>0{bulletIndex + 1}</span>
                          <p><HighlightText text={bullet} /></p>
                        </div>
                      ))}
                    </div>
                    <div className="ref-project-footer">
                      <div className="ref-stack">
                        {project.stack.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          查看项目
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="ref-project-visual">
                    <ProjectMedia project={project} compact />
                    <div className="ref-demo-caption">
                      <span>{project.name}</span>
                      <span>{String(index + 1).padStart(2, "0")} / {String(personalProjects.length).padStart(2, "0")}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="ref-tech-stack" aria-labelledby="tech-stack-title">
          <div className="ref-container ref-tech-stack-layout">
            <div className="ref-tech-stack-copy reveal-on-scroll">
              <span>CORE STACK / 技术能力</span>
              <h2 id="tech-stack-title">核心技术栈</h2>
            </div>
            <div className="ref-tech-stack-list reveal-on-scroll" style={{ "--reveal-delay": "90ms" }}>
              {featuredStack.map((group, index) => (
                <article className="ref-tech-stack-row" key={group.title}>
                  <span className="ref-tech-stack-index">0{index + 1}</span>
                  <div>
                    <strong>{group.title}</strong>
                    <small>{group.note}</small>
                  </div>
                  <div className="ref-stack">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="ref-section ref-skills">
          <div className="ref-container">
            <div className="ref-section-head reveal-on-scroll">
              <span>02</span>
              <h2>技术能力</h2>
              <p>前端架构、工程化与 AI 应用能力</p>
            </div>
            <div className="ref-skill-grid">
              {expertise.map((group, index) => {
                const Icon = iconMap[group.icon];
                return (
                  <article
                    className="reveal-on-scroll"
                    key={group.title}
                    style={{ "--reveal-delay": `${index * 70}ms` }}
                  >
                    <div className="ref-skill-title">
                      <span><Icon size={18} /></span>
                      <small>0{index + 1}</small>
                    </div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <div className="ref-stack">
                      {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" className="ref-section ref-experience">
          <div className="ref-container">
            <div className="ref-section-head reveal-on-scroll">
              <span>03</span>
              <h2>工作经历</h2>
              <p>长期负责复杂业务与团队交付</p>
            </div>
            <div className="ref-experience-list">
              {experience.map((job, index) => (
                <article
                  className="reveal-on-scroll"
                  key={job.company}
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <time>{job.date}</time>
                  <div className="ref-job">
                    <span>{job.role}</span>
                    <h3>{job.company}</h3>
                    <p>{job.description}</p>
                    <ul>
                    {uniqueHighlights(job).map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  </div>
                  <div className="ref-stack">
                    {job.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
            <div className="ref-education reveal-on-scroll">
              <GraduationCap size={19} />
              <strong>{education.school}</strong>
              <span>{education.note} · {education.degree}</span>
              <time>{education.date}</time>
            </div>
          </div>
        </section>

        <section id="contact" className="ref-contact">
          <div className="ref-container ref-contact-grid reveal-on-scroll">
            <div>
              <span className="ref-contact-kicker">GET IN TOUCH</span>
              <h2>一起做成点事</h2>
              <ContactList />
            </div>
            <div className="ref-contact-actions">
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} />
                发邮件
              </a>
              <button type="button" onClick={() => setWechatOpen(true)}>
                <MessageCircle size={17} />
                加微信
              </button>
            </div>
          </div>
          {wechatOpen && (
            <div
              className="ref-wechat-overlay"
              role="presentation"
              onClick={() => setWechatOpen(false)}
            >
              <div
                className="ref-wechat-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="wechat-dialog-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="ref-wechat-dialog-icon-close"
                  type="button"
                  onClick={() => setWechatOpen(false)}
                  aria-label="关闭微信二维码"
                >
                  <X size={18} />
                </button>
                <h3 id="wechat-dialog-title">微信扫码添加</h3>
                <img src="/assets/wechat-qr.jpg" alt="寇晨迪微信二维码" />
                <p>寇晨迪 · AI 应用工程师</p>
                <button
                  className="ref-wechat-dialog-close"
                  type="button"
                  onClick={() => setWechatOpen(false)}
                >
                  关闭
                </button>
              </div>
            </div>
          )}
          <div className="ref-container ref-footer">
            <span>© 2026 寇晨迪</span>
            <span>AI APPLICATION ENGINEER · SHENZHEN</span>
            <a href="#top">回到顶部 ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
