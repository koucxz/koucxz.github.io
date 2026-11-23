import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Download, Loader2 } from "lucide-react";
import resumeZh from "./resume-data.json";
import resumeEn from "./resume-data-en.json";
import { downloadResumePdf } from "./resume-pdf";
import { LANG, copy, routeHref } from "./locale";
import "./resume-preview.css";

const resumeData = LANG === "en" ? resumeEn : resumeZh;

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
  // 中文用「：」、英文用「: 」分隔要点标题，过长的不当标题处理
  const separatorIndex = bullet.search(/：|: /);
  if (separatorIndex <= 0 || separatorIndex > 40) return [null, bullet];

  return [
    bullet.slice(0, separatorIndex),
    bullet.slice(separatorIndex + (bullet[separatorIndex] === "：" ? 1 : 2)),
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
            {title && <strong>{title}{copy.labelColon}</strong>}
            <span>{text}</span>
          </li>
        ))}
      </ol>
      {showLink && project.link && (
        <a className="resume-project-link" href={project.link} target="_blank" rel="noreferrer">
          {copy.resume.viewProject}
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
    document.title = copy.resume.docTitle;
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
      console.error("Failed to generate the resume PDF", error);
      window.alert(copy.resume.pdfError);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="resume-preview-page">
      <div className="resume-preview-tools">
        <a className="resume-home-link" href={routeHref.portfolio}>
          <ArrowLeft size={15} />
          {copy.resume.backHome}
        </a>
        <a className="resume-home-link" href={routeHref.resumeFile} download={copy.resume.docxFile}>
          <Download size={15} />
          DOCX
        </a>
        <a className="resume-home-link" href={routeHref.resumeOtherLanguage}>
          {copy.switchLanguage}
        </a>
        <button
          className="resume-download-button"
          type="button"
          onClick={downloadPdf}
          disabled={isGeneratingPdf}
          aria-busy={isGeneratingPdf}
        >
          {isGeneratingPdf ? <Loader2 size={15} className="resume-loading-icon" /> : <Download size={15} />}
          {isGeneratingPdf ? copy.resume.generating : copy.resume.downloadPdf}
        </button>
      </div>

      <main className="resume-preview-main">
        <article className="resume-sheet resume-sheet-one">
          <header className="resume-document-header">
            <h1>{profile.name}</h1>
            <p>{copy.resume.targetRole}{profile.role} <span className="resume-online-link">{copy.resume.onlineLabel}<a href={profile.website}>koucxz.github.io</a></span></p>
            <div className="resume-contact-line">
              <span>{profile.city}</span>
              <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>{profile.phone}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.language}</span>
            </div>
          </header>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.advantages} />
            <ol className="resume-numbered-list">
              {advantages.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}{copy.labelColon}</strong>
                  {item.text}
                </li>
              ))}
            </ol>
          </section>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.skills} />
            <ol className="resume-numbered-list">
              {expertise.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}{copy.labelColon}</strong>
                  {item.description}
                </li>
              ))}
            </ol>
          </section>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.work} />
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
            <SectionHeading title={copy.resume.sections.ai} />
            <div className="resume-project-list">
              {aiProjectsPageOne.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>
        </article>

        <article className="resume-sheet resume-sheet-two">
          <section className="resume-section resume-first-section" aria-labelledby="ai-projects-continued">
            <h2 className="resume-visually-hidden" id="ai-projects-continued">{copy.resume.sections.aiCont}</h2>
            <div className="resume-project-list">
              {aiProjectsPageTwo.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.workProjects} />
            <div className="resume-project-list">
              {businessProjectBlocks.map((project) => (
                <ProjectBlock project={project} key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.personal} />
            <div className="resume-project-list">
              {personalProjectBlocks.map((project) => (
                <ProjectBlock project={project} showLink key={project.name} />
              ))}
            </div>
          </section>

          <section className="resume-section">
            <SectionHeading title={copy.resume.sections.education} />
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
