"use client";

import { posts } from "@/frontend/components/cmd/outputs/results/Post";

export default function Post(): JSX.Element {
  return (
    <div className="logbook-page">
      <div className="page-heading reveal">
        <p className="eyebrow">03 / EXPLORATION LOGBOOK</p>
        <h1>
          探索筆記<span>THOUGHTS & FINDINGS</span>
        </h1>
        <p>
          把學習過程中的發現，整理成可以分享的知識。
          <br />
          關於 JavaScript、TypeScript，以及開發路上的每一次探索。
        </p>
      </div>
      <div className="section-label">
        <span>TRANSMISSIONS / {String(posts.length).padStart(2, "0")}</span>
        <span>由新到舊排列</span>
      </div>
      <ol className="logbook-list reveal delay-one">
        {posts.map((post, index) => (
          <li key={post.url}>
            <a
              className="article-link"
              href={post.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="article-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="eyebrow">
                  {post.name.includes("TypeScript")
                    ? "TYPESCRIPT / DEVELOPMENT"
                    : "JAVASCRIPT / FUNDAMENTALS"}
                </p>
                <h2>{post.name}</h2>
              </div>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true" className="article-arrow">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
