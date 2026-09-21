import ResumeContent from "@/frontend/components/resume/ResumeContent";
import { resume } from "@/content/resume";

export default function About(): JSX.Element {
  return (
    <div className="resume-page">
      <div className="page-heading reveal">
        <p className="eyebrow">02 / OPERATOR DOSSIER</p>
        <h1>
          關於我<span>THE FULL STORY</span>
        </h1>
        <p>
          從第一行程式碼，到跨系統的完整解決方案。
          <br />
          這裡記錄我的工作經歷、專案成果，以及持續探索的技術。
        </p>
        <a
          className="action-link"
          href={resume.links.resume}
          rel="noopener noreferrer"
          target="_blank"
        >
          104 履歷 ↗
        </a>
      </div>
      <ResumeContent />
    </div>
  );
}
