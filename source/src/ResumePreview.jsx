import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Download, Loader2 } from "lucide-react";
import resumeData from "./resume-data.json";
import { downloadResumePdf } from "./resume-pdf";
import "./resume-preview.css";

const {
  advantages,
  aiProjects,
  education,
  expertise,
  experience,
  personalProjects,
  profile,
  workProjects,
} = resumeData;

function splitBullet(bullet) {
  const separatorIndex = bullet.indexOf("：");
  if (separatorIndex === -1) return [null, bullet];

  return [
    bullet.slice(0, separatorIndex),
    bullet.slice(separatorIndex + 1),
  ];
}

function toProjectBlock(project) {
  return {
    name: project.name,
    meta: project.stack.join(" · "),
    date: project.years,
    summary: project.summary,
    bullets: project.bullets.map(splitBullet),
    link: project.link,
  };
}

const businessProjectBlocks = workProjects.map(toProjectBlock);
const aiProjectsPageOne = aiProjects.slice(0, 1).map(toProjectBlock);
const aiProjectsPageTwo = aiProjects.slice(1).map(toProjectBlock);
const personalProjectBlocks = personalProjects.map(toProjectBlock);

function SectionHeading({ title }) {
  return (
    <header className="resume-section-heading">
      <h2>{title}</h2>
      <span aria-hidden="true" />
    </header>
  );
}

function ProjectBlock({ project, showLink = false }) {
  return (
    <article className="resume-project">
      <header className="resume-project-head">
        <div>
          <h3>{project.name}</h3>
          <span>{project.meta}</span>
        </div>
        <time>{project.date}</time>
      </header>
      {project.summary && <p className="resume-project-summary">{project.summary}</p>}
      <ol className="resume-detail-list">
        {project.bullets.map(([title, text]) => (
          <li key={`${project.name}-${title || text}`}>
            {title && <strong>{title}：</strong>}
            <span>{text}</span>
          </li>
        ))}
      </ol>
      {showLink && project.link && (
        <a className="resume-project-link" href={project.link} target="_blank" rel="noreferrer">
          查看项目
          <ArrowUpRight size={12} />
        </a>
      )}
    </article>
  );
}

function ResumePreview() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.body.classList.add("resume-print-page");
    document.title = "寇晨迪 · AI 应用工程师简历";
    return () => {
      document.body.classList.remove("resume-print-page");
      document.title = previousTitle;
    };
  }, []);

  const downloadPdf = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      await downloadResumePdf();
    } catch (error) {
      console.error("生成简历 PDF 失败", error);
      window.alert("PDF 生成失败，请稍后重试。");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="resume-preview-page">
      <div className="resume-preview-tools">
        <a className="resume-home-link" href="/">
          <ArrowLeft size={15} />
          返回首页
        </a>
        <button
          className="resume-download-button"
          type="button"
          onClick={downloadPdf}
          disabled={isGeneratingPdf}
          aria-busy={isGeneratingPdf}
        >
          {isGeneratingPdf ? <Loader2 size={15} className="resume-loading-icon" /> : <Download size={15} />}
          {isGeneratingPdf ? "生成中..." : "下载 PDF"}
        </button>
      </div>

      <main className="resume-preview-main">
        <article className="resume-sheet resume-sheet-one">
          <header className="resume-document-header">
            <h1>{profile.name}</h1>
            <p>求职意向：{profile.role} <span className="resume-online-link">｜ 线上简历：<a href={profile.website}>koucxz.github.io</a></span></p>
            <div className="resume-contact-line">
              <span>{profile.city}</span>
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.language}</span>
            </div>
          </header>

          <section className="resume-section">
            <SectionHeading title="个人优势" />
            <ol className="resume-numbered-list">
              {advantages.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}：</strong>
                  {item.text}
                </li>
              ))}
            </ol>
          </section>

          <section className="resume-section">
            <SectionHeading title="专业技能" />
            <ol className="resume-numbered-list">
              {expertise.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}：</strong>
                  {item.description}
                </li>
              ))}
            </ol>
          </section>

          <section className="resume-section">
            <SectionHeading title="工作经历" />
            <div className="resume-work-list">
              {experience.map((job) => (
                <article className="resume-work-item" key={job.company}>
                  <header>
                    <div>
                      <h3>{job.company}</h3>
                      <span>{job.role}</span>
                    </div>
                    <time>{job.date}</time>
                  </header>
                  <ol className="resume-work-bullets">
                    {job.highlights.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ol>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title="AI 项目经历" />
            <div className="resume-project-list">
              {aiProjectsPageOne.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>
        </article>

        <article className="resume-sheet resume-sheet-two">
          <section className="resume-section resume-first-section" aria-labelledby="ai-projects-continued">
            <h2 className="resume-visually-hidden" id="ai-projects-continued">AI 项目经历续</h2>
            <div className="resume-project-list">
              {aiProjectsPageTwo.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title="业务项目经历" />
            <div className="resume-project-list">
              {businessProjectBlocks.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title="个人项目" />
            <div className="resume-project-list">
              {personalProjectBlocks.map((project) => (
                <ProjectBlock project={project} showLink key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title="教育经历" />
            <div className="resume-education-row">
              <div>
                <strong>{education.school}</strong>
                <span>{education.note} / {education.degree}</span>
              </div>
              <time>{education.date}</time>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

export default ResumePreview;
