"use client";

import ChatInputHistory from "@/frontend/components/chat/ChatInputHistory";

export default function NeedAi(): JSX.Element {
  return (
    <div>
      <div className="page-heading reveal">
        <p className="eyebrow">04 / INTELLIGENCE LINK</p>
        <h1>
          與圓媛對話<span>YOUR GUIDE TO MY WORLD</span>
        </h1>
        <p>
          想知道我的技術背景、工作經歷或專案細節？
          <br />讓 AI 履歷助理圓媛，帶你認識我的世界。
        </p>
      </div>
      <div className="ai-layout reveal delay-one">
        <aside className="panel ai-info">
          <div aria-hidden="true" className="ai-symbol">
            ✳
          </div>
          <span className="eyebrow">AI RESUME ASSISTANT</span>
          <h2>你好，我是圓媛。</h2>
          <p>
            我的任務，是根據阿華的完整履歷，回答你的問題，幫你找到想了解的經歷與作品。
          </p>
          <p>你可以用自然的方式提問，就像和一位熟悉他的同事聊天。</p>
          <dl>
            <dt>資料來源</dt>
            <dd>完整履歷</dd>
            <dt>對話語言</dt>
            <dd>繁體中文</dd>
            <dt>聯絡本人</dt>
            <dd>
              <a href="mailto:a0987837233@gmail.com">電子郵件 ↗</a>
            </dd>
          </dl>
        </aside>
        <ChatInputHistory />
      </div>
    </div>
  );
}
