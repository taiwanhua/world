"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { resume } from "@/content/resume";

const navigation = [
  { href: "/", number: "01", label: "控制台", english: "CONSOLE" },
  { href: "/about", number: "02", label: "關於我", english: "PROFILE" },
  { href: "/post", number: "03", label: "文章", english: "LOGBOOK" },
  { href: "/need-ai", number: "04", label: "AI 助理", english: "AI LINK" },
];

export default function Header(): JSX.Element {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link aria-label="Arhua's World 首頁" className="brand" href="/">
        <span aria-hidden="true" className="brand-mark">
          a<span>h</span>
          <i />
        </span>
        <span className="brand-copy">
          ARHUA<span>PERSONAL SPACE</span>
        </span>
      </Link>
      <nav aria-label="主要導覽" className="main-nav">
        {navigation.map(({ href, number, label, english }) => (
          <Link
            aria-current={pathname === href ? "page" : undefined}
            className={pathname === href ? "nav-item active" : "nav-item"}
            href={href}
            key={href}
          >
            <span className="nav-number">{number}</span>
            <span>
              {label}
              <small>{english}</small>
            </span>
          </Link>
        ))}
      </nav>
      <a className="header-contact" href={`mailto:${resume.contact.email}`}>
        LET’S CONNECT <ArrowOutwardIcon fontSize="small" />
      </a>
    </header>
  );
}
