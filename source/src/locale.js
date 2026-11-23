/**
 * 站点语言与路由：
 * - `/`          中文作品集
 * - `/en`        英文作品集
 * - `/resume`    英文在线简历（对外分享的固定地址）
 * - `/en/resume` 英文在线简历（从英文站进入时保持语言一致）
 * - `/zh/resume` 中文在线简历（从中文站进入）
 */

export function resolveRoute(pathname) {
  const path = pathname.replace(/\/index\.html$/i, "").replace(/\/+$/, "") || "/";
  if (path === "/en") return { lang: "en", view: "portfolio" };
  if (path === "/resume" || path === "/en/resume") return { lang: "en", view: "resume" };
  if (path === "/zh/resume") return { lang: "zh", view: "resume" };
  return { lang: "zh", view: "portfolio" };
}

export const ROUTE = resolveRoute(window.location.pathname);
export const LANG = ROUTE.lang;

/** 与当前语言匹配的站内地址，避免中文站跳到英文简历、英文站跳回中文站 */
export const routeHref = {
  portfolio: LANG === "en" ? "/en" : "/",
  resume: LANG === "en" ? "/en/resume" : "/zh/resume",
  switchLanguage: LANG === "en" ? "/" : "/en",
  resumeOtherLanguage: LANG === "en" ? "/zh/resume" : "/resume",
  resumeFile: LANG === "en" ? "/resume-en.docx" : "/resume.docx",
};

const zhCopy = {
  nav: [
    { id: "about", label: "关于" },
    { id: "projects", label: "项目" },
    { id: "skills", label: "技能" },
    { id: "experience", label: "经历" },
    { id: "contact", label: "联系" },
  ],
  roles: ["前端工程师", "前端技术经理", "AI 应用工程师"],
  backTop: "返回顶部",
  navAria: "简历页面导航",
  onlineResume: "在线简历",
  viewProjects: "查看项目",
  socialAria: "联系与社交链接",
  mailAria: "发送邮件",
  phoneAria: "拨打电话",
  browseProjectsAria: "浏览个人项目",
  portraitAlt: "寇晨迪的照片",
  loading: "加载中",
  demoAlt: "项目演示",
  demoPlaceholder: "项目演示位置",
  labelColon: "：",
  roleAriaPrefix: "职位：",
  projectsTitle: "个人项目",
  projectsLead: "AI 产品、开发工具与工程实践",
  coreStackKicker: "CORE STACK / 技术能力",
  coreStackTitle: "核心技术栈",
  skillsTitle: "技术能力",
  skillsLead: "前端架构、工程化与 AI 应用能力",
  experienceTitle: "工作经历",
  experienceLead: "长期负责复杂业务与团队交付",
  contactTitle: "一起做成点事",
  sendEmail: "发邮件",
  addWechat: "加微信",
  wechatCloseAria: "关闭微信二维码",
  wechatTitle: "微信扫码添加",
  wechatAlt: "寇晨迪微信二维码",
  wechatName: "寇晨迪 · AI 应用工程师",
  close: "关闭",
  footerName: "© 2026 寇晨迪",
  backToTopText: "回到顶部 ↑",
  switchLanguage: "EN",
  switchLanguageAria: "Switch to English",
  resume: {
    docTitle: "寇晨迪 · 全栈开发工程师简历",
    backHome: "返回首页",
    downloadPdf: "下载 PDF",
    generating: "生成中...",
    targetRole: "求职意向：",
    onlineLabel: "｜ 线上简历：",
    sections: {
      advantages: "个人优势",
      skills: "专业技能",
      work: "工作经历",
      ai: "AI 项目经历",
      aiCont: "AI 项目经历续",
      workProjects: "业务项目经历",
      personal: "个人项目",
      education: "教育经历",
    },
    viewProject: "查看项目",
    pdfError: "PDF 生成失败，请稍后重试。",
    pdfTitle: "寇晨迪 · 全栈开发工程师简历",
    pdfAuthor: "寇晨迪",
    pdfFile: "寇晨迪_全栈开发工程师_郑州大学.pdf",
    docxFile: "寇晨迪_全栈开发工程师_郑州大学.docx",
    pdfFontError: "无法加载字体",
  },
};

const enCopy = {
  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  roles: ["Frontend Engineer", "Frontend Technical Manager", "AI Application Engineer"],
  backTop: "Back to top",
  navAria: "Resume sections",
  onlineResume: "Online resume",
  viewProjects: "View projects",
  socialAria: "Contact and social links",
  mailAria: "Send email",
  phoneAria: "Call",
  browseProjectsAria: "Browse personal projects",
  portraitAlt: "Chendi Kou portrait",
  loading: "Loading",
  demoAlt: "project demo",
  demoPlaceholder: "Demo placeholder",
  labelColon: ": ",
  roleAriaPrefix: "Role: ",
  projectsTitle: "Personal projects",
  projectsLead: "AI products, developer tools, and engineering practice",
  coreStackKicker: "CORE STACK / SKILLS",
  coreStackTitle: "Core stack",
  skillsTitle: "Technical skills",
  skillsLead: "Frontend architecture, engineering, and AI applications",
  experienceTitle: "Experience",
  experienceLead: "Long-running ownership of complex business delivery",
  contactTitle: "Let's build something",
  sendEmail: "Send email",
  addWechat: "WeChat",
  wechatCloseAria: "Close WeChat QR code",
  wechatTitle: "Scan to connect on WeChat",
  wechatAlt: "Chendi Kou WeChat QR code",
  wechatName: "Chendi Kou · AI Application Engineer",
  close: "Close",
  footerName: "© 2026 Chendi Kou",
  backToTopText: "Back to top ↑",
  switchLanguage: "中文",
  switchLanguageAria: "切换到中文",
  resume: {
    docTitle: "Chendi Kou · Frontend Engineer Resume",
    backHome: "Back to home",
    downloadPdf: "Download PDF",
    generating: "Generating...",
    targetRole: "Target role: ",
    onlineLabel: " | Online resume: ",
    sections: {
      advantages: "Summary",
      skills: "Technical skills",
      work: "Experience",
      ai: "AI projects",
      aiCont: "AI projects (continued)",
      workProjects: "Business projects",
      personal: "Personal projects",
      education: "Education",
    },
    viewProject: "View project",
    pdfError: "Failed to generate the PDF. Please try again.",
    pdfTitle: "Chendi Kou · Frontend Engineer Resume",
    pdfAuthor: "Chendi Kou",
    pdfFile: "Chendi_Kou_FrontEnd_Resume.pdf",
    docxFile: "Chendi_Kou_FrontEnd_Resume.docx",
    pdfFontError: "Failed to load the font",
  },
};

export const copy = LANG === "en" ? enCopy : zhCopy;
