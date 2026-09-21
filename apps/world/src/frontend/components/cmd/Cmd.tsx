"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import TerminalIcon from "@mui/icons-material/Terminal";
import { resume } from "@/content/resume";
import { posts } from "@/frontend/components/cmd/outputs/results/Post";
import { useCmdInputHistoryStore } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";

const commandList = [
  { command: "about", label: "關於我" },
  { command: "experience", label: "工作經歷" },
  { command: "skills", label: "技術能力" },
  { command: "projects", label: "作品" },
  { command: "post", label: "文章" },
  { command: "need-ai", label: "AI 助理" },
  { command: "help", label: "指令說明" },
  { command: "clear", label: "清除畫面" },
];

function Output({ command }: { command: string }): JSX.Element {
  if (command === "about")
    return (
      <div className="terminal-about">
        <p className="output-label">
          PROFILE LOADED <span>· 何家華 / ANDY HO</span>
        </p>
        <h2>
          你好，我是阿華<span className="accent">。</span>
        </h2>
        <p className="terminal-role">
          資深全端工程師 <span>/</span> 7+ 年軟體開發經驗
        </p>
        <p className="terminal-description">{resume.summary}</p>
        <div className="terminal-tags">
          {["React / Next.js", "Node.js / GraphQL", "AI / LLM", "SaaS"].map(
            (tag) => (
              <span key={tag}>{tag}</span>
            ),
          )}
        </div>
        <Link className="terminal-text-link" href="/about">
          閱讀完整履歷 <NorthEastIcon sx={{ fontSize: 14 }} />
        </Link>
      </div>
    );
  if (command === "help")
    return (
      <div className="terminal-help">
        {commandList.map((item) => (
          <div key={item.command}>
            <code>{item.command}</code>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  if (command === "experience")
    return (
      <div className="terminal-entries">
        {resume.jobs.map((job) => (
          <div key={job.company}>
            <span className="mono">{job.period}</span>
            <h3>{job.company}</h3>
            <p>{job.title}</p>
          </div>
        ))}
        <Link href="/about#experience">閱讀完整工作職責 ↗</Link>
      </div>
    );
  if (command === "skills")
    return (
      <div className="terminal-entries">
        {resume.skills.map((skill) => (
          <div key={skill.title}>
            <h3>{skill.title}</h3>
            <ul>
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  if (command === "projects")
    return (
      <div className="terminal-entries">
        {resume.projects.map((project) => (
          <div key={project.name}>
            <a href={project.url} rel="noopener noreferrer" target="_blank">
              {project.name} ↗
            </a>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    );
  if (command === "post")
    return (
      <div className="terminal-entries">
        {posts.map((post) => (
          <div key={post.url}>
            <span className="mono">{post.date}</span>
            <a href={post.url} rel="noopener noreferrer" target="_blank">
              {post.name} ↗
            </a>
          </div>
        ))}
      </div>
    );
  return (
    <p className="terminal-error">
      找不到指令「{command}」。輸入 <code>help</code> 查看可用指令。
    </p>
  );
}

export default function Cmd(): JSX.Element {
  const { cmdInputHistory, pushCmdInput, clearCmdInputHistory } =
    useCmdInputHistoryStore();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [lastCommand, setLastCommand] = useState("about");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const output = outputRef.current;
    if (!output || cmdInputHistory.length <= 1) return;
    const entries = output.querySelectorAll<HTMLElement>(".terminal-entry");
    const latest = entries[entries.length - 1];
    output.scrollTop = latest.offsetTop - output.offsetTop;
  }, [cmdInputHistory]);

  function execute(value: string): void {
    const command = value.trim().toLowerCase();
    if (!command) return;
    setInput("");
    setHistoryIndex(-1);
    setLastCommand(command);
    if (command === "clear") clearCmdInputHistory();
    else if (command === "need-ai") router.push("/need-ai");
    else pushCmdInput(command);
  }

  function submit(event: FormEvent): void {
    event.preventDefault();
    execute(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.nativeEvent.isComposing) {
      if (event.key === "Enter") event.preventDefault();
      return;
    }
    if (event.key === "Tab") {
      const matches = commandList.filter((item) =>
        item.command.startsWith(input.trim().toLowerCase()),
      );
      if (input && matches.length === 1) {
        event.preventDefault();
        setInput(matches[0].command);
      }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) setDraft(input);
      const next =
        event.key === "ArrowUp"
          ? Math.min(historyIndex + 1, cmdInputHistory.length - 1)
          : Math.max(-1, historyIndex - 1);
      setHistoryIndex(next);
      setInput(
        next === -1
          ? draft
          : cmdInputHistory[cmdInputHistory.length - 1 - next].cmdInputHistory,
      );
    }
  }

  return (
    <section aria-label="互動終端機" className="terminal panel" id="terminal">
      <div className="terminal-chrome">
        <div aria-hidden="true" className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          <TerminalIcon sx={{ fontSize: 15 }} /> arhua@world: ~
        </span>
        <span className="terminal-session">INTERACTIVE SESSION</span>
      </div>
      <div aria-label="快捷指令" className="terminal-shortcuts">
        {commandList.slice(0, 6).map(({ command, label }) => (
          <button
            className={lastCommand === command ? "selected" : ""}
            key={command}
            onClick={(): void => execute(command)}
            type="button"
          >
            <span>{command}</span>
            <small>{label}</small>
          </button>
        ))}
      </div>
      <div
        aria-label="終端機輸出"
        className="terminal-output"
        ref={outputRef}
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scroll regions need keyboard focus.
        tabIndex={0}
      >
        <div className="terminal-welcome">
          <span className="status-dot" /> ARHUA’S WORLD <span>/</span> PERSONAL
          EXPLORER
          <br />
          <span>歡迎登入我的世界。點選上方快捷鍵，或輸入指令開始探索。</span>
        </div>
        {cmdInputHistory.map(({ cmdInputHistory: command, key }) => (
          <Fragment key={key}>
            <div className="terminal-entry">
              <div className="command-echo">
                <span>
                  visitor<span className="muted">@</span>world
                </span>
                <span className="muted">:~ $</span> {command}
              </div>
              <Output command={command} />
            </div>
          </Fragment>
        ))}
        {cmdInputHistory.length === 0 && (
          <p className="terminal-empty">
            畫面已清除。輸入 help 或點選快捷指令，繼續探索。
          </p>
        )}
      </div>
      <form className="terminal-input-row" onSubmit={submit}>
        <label htmlFor="terminal-command">
          <span>visitor</span>
          <span className="muted">@world</span>
          <span className="accent"> ~ $</span>
        </label>
        <input
          autoCapitalize="none"
          autoComplete="off"
          id="terminal-command"
          maxLength={120}
          onChange={(event): void => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="輸入 help 開始探索…"
          ref={inputRef}
          spellCheck={false}
          value={input}
        />
        <button
          aria-label="執行指令"
          className="terminal-enter"
          disabled={!input.trim()}
          type="submit"
        >
          ↵
        </button>
      </form>
      <div className="terminal-status">
        <span>
          <span className="status-dot" /> READY TO EXPLORE
        </span>
        <span>
          ↑↓ 歷史指令 <span className="status-separator">/</span> TAB 自動完成
        </span>
      </div>
    </section>
  );
}
