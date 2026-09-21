"use client";

import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Cmd from "@/frontend/components/cmd/Cmd";
import { resume } from "@/content/resume";

export default function Home(): JSX.Element {
  return (
    <div className="console-page">
      <section aria-labelledby="home-title" className="hero-section reveal">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> WELCOME TO MY PERSONAL UNIVERSE
          </p>
          <h1 id="home-title">
            Ideas into systems.
            <br />
            <span>Beyond the interface.</span>
          </h1>
          <p className="hero-intro">
            我是何家華，<strong>資深全端工程師。</strong>
            <br />
            從前端互動、系統整合到 AI 應用，讓想法成為真正運作的產品。
          </p>
          <div className="hero-bottom">
            <span className="mono">REACT / NEXT.JS / NODE.JS / AI</span>
            <a href="#terminal">
              探索我的世界 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="orbital-display">
          <div className="orbit-cross horizontal" />
          <div className="orbit-cross vertical" />
          <div className="orbit-ring outer" />
          <div className="orbit-ring middle" />
          <div className="orbit-ring inner" />
          <div className="orbit-path">
            <span />
          </div>
          <div className="orbit-core">
            <span>AH</span>
            <small>
              ENGINEERING
              <br />& EXPLORATION
            </small>
          </div>
          <span className="orbit-label label-top">FRONTEND</span>
          <span className="orbit-label label-left">BACKEND</span>
          <span className="orbit-label label-right">AI / LLM</span>
          <span className="orbit-coordinate">25° N · TAIWAN</span>
          <span className="orbit-caption">A CONNECTED WORLD</span>
        </div>
      </section>

      <div className="section-label">
        <span>01 / MISSION CONTROL</span>
        <span>透過指令，認識我的開發宇宙</span>
      </div>
      <div className="console-grid reveal delay-one">
        <Cmd />
        <aside aria-label="個人資訊" className="console-sidebar">
          <section className="panel profile-panel">
            <div className="panel-label">
              <span>OPERATOR PROFILE</span>
              <span className="tiny-cross">+</span>
            </div>
            <div className="operator-heading">
              <div className="operator-avatar">
                AH
                <span />
              </div>
              <div>
                <h2>
                  何家華 <span>Andy Ho</span>
                </h2>
                <p>資深全端工程師</p>
              </div>
            </div>
            <p className="sidebar-bio">
              連結使用者、技術與業務需求。
              <br />
              打造穩定、可維護的產品與系統。
            </p>
            <div className="profile-stats">
              <div>
                <strong>
                  7<span>+</span>
                </strong>
                <small>年軟體開發經驗</small>
              </div>
              <div>
                <strong>5</strong>
                <small>跨領域專案成就</small>
              </div>
            </div>
            <Link className="panel-link" href="/about">
              查看完整履歷 <ArrowOutwardIcon fontSize="small" />
            </Link>
          </section>
          <section className="panel current-panel">
            <div className="panel-label">
              <span>CURRENT POSITION</span>
              <span className="status-dot" />
            </div>
            <h3>{resume.jobs[0].company}</h3>
            <p>{resume.jobs[0].title}</p>
            <span className="mono">2026.08 — PRESENT</span>
          </section>
          <Link className="panel ai-panel" href="/need-ai">
            <div aria-hidden="true" className="ai-symbol">
              ✳
            </div>
            <div>
              <span className="panel-label">MEET MY AI ASSISTANT</span>
              <h3>讓圓媛為你介紹</h3>
              <p>經歷、技術、作品，直接問她。</p>
            </div>
            <ArrowOutwardIcon fontSize="small" />
          </Link>
        </aside>
      </div>

      <section
        aria-labelledby="projects-title"
        className="projects-section reveal delay-two"
      >
        <div className="section-label">
          <span>02 / SELECTED EXPLORATIONS</span>
          <Link href="/about#projects">全部作品 ↗</Link>
        </div>
        <h2 className="section-heading" id="projects-title">
          把想法，做成作品。<span>BUILT TO EXPLORE.</span>
        </h2>
        <div className="project-grid">
          {resume.projects.slice(0, 3).map((project, index) => (
            <a
              className="project-card"
              href={project.url}
              key={project.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div aria-hidden="true" className={`project-art art-${index}`}>
                {index === 0 ? (
                  <div className="art-terminal">
                    <span>~/arhua/world</span>
                    <p>
                      &gt; hello, universe
                      <span className="cursor-block" />
                    </p>
                    <i />
                    <i />
                  </div>
                ) : null}
                {index === 1 ? (
                  <div className="art-react">
                    <i />
                    <i />
                    <i />
                    <span />
                  </div>
                ) : null}
                {index === 2 ? (
                  <div className="art-network">
                    <i />
                    <i />
                    <i />
                    <i />
                    <span />
                  </div>
                ) : null}
                <span className="art-index">EXPLORATION / 0{index + 1}</span>
                <span className="project-arrow">↗</span>
              </div>
              <div className="project-info">
                <span className="eyebrow">
                  {
                    [
                      "NEXT.JS · OPENAI",
                      "REACT · KNOWLEDGE SHARING",
                      "GRAPHQL · ACCESS CONTROL",
                    ][index]
                  }
                </span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="contact-strip">
        <div>
          <p className="eyebrow">THE NEXT CONNECTION</p>
          <h2>下一個好想法，從對話開始。</h2>
        </div>
        <a className="action-link" href={`mailto:${resume.contact.email}`}>
          一起聊聊 <ArrowOutwardIcon fontSize="small" />
        </a>
      </section>
    </div>
  );
}
