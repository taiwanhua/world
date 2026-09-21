import { resume } from "@/content/resume";

interface FooterProps {
  motionPaused: boolean;
  onToggleMotion: () => void;
}

export default function Footer({
  motionPaused,
  onToggleMotion,
}: FooterProps): JSX.Element {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} ARHUA HO{" "}
        <span className="footer-divider">/</span> BUILT WITH CURIOSITY.
      </span>
      <div>
        <button
          aria-pressed={motionPaused}
          onClick={onToggleMotion}
          type="button"
        >
          動畫：{motionPaused ? "已暫停" : "開啟中"}
        </button>
        <a href={resume.links.github} rel="noopener noreferrer" target="_blank">
          GITHUB ↗
        </a>
        <span className="location-dot">TAIWAN · UTC+8</span>
      </div>
    </footer>
  );
}
