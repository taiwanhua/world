import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div className="not-found-page">
      <p className="eyebrow">SIGNAL LOST / UNKNOWN COORDINATES</p>
      <h1>404</h1>
      <p>這片宇宙還沒有留下座標。</p>
      <Link className="action-link" href="/">
        返回控制台 ↗
      </Link>
    </div>
  );
}
