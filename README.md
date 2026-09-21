# Arhua's World

阿華的履歷與作品網站，使用 Next.js、React、TypeScript、MUI 與 npm workspaces / Turborepo。網站包含終端機介面、About、文章列表與 AI 助理。

## 本機開發

在 repository 根目錄執行：

請使用 Node.js 24.x；根目錄與 app 的 `package.json` 已指定相同版本。

```powershell
npm ci
# 僅第一次建立設定檔時執行，避免覆寫既有 .env.local：
Copy-Item apps/world/example.env apps/world/.env.local
npm run dev --workspace=apps/world
```

開啟 http://localhost:3000。現有 `apps/world/.env` 也會載入，但 `.env.local` 中同名變數優先；請避免兩份設定互相覆蓋。

## 環境變數

在 `apps/world/.env.local` 或部署平台設定以下變數：

| 變數                            | 用途                             | 需要更新的內容                           |
| ------------------------------- | -------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_ONE_ZERO_FOUR_URL` | About 頁面與終端機的履歷連結     | 最新且可公開讀取的 104 履歷分享網址      |
| `NEXT_PUBLIC_GITHUB_URL`        | About 頁面與終端機的 GitHub 連結 | 個人 GitHub 或希望展示的 repository 網址 |
| `NEXT_PUBLIC_WS_GAME_URL`       | 遊戲作品連結                     | 目前可使用的作品網址                     |
| `OPENAI_API_KEY`                | AI 助理呼叫 API                  | 自己帳戶的有效金鑰，只能留在伺服器端     |

舊的 `ONE_ZERO_FOUR_URL`、`GITHUB_URL`、`WS_GAME_URL` 必須加上 `NEXT_PUBLIC_` 前綴，程式才讀得到。公開連結在建置時寫入前端，修改後需要重新 build / redeploy，不能只重啟。

範例檔已填入本次提供的 104 履歷網址與 PDF 中的遊戲作品網址 `https://online-flexiq.arhuaho.com/`。未設定公開網址時，網站會使用 `src/content/resume.ts` 中的預設值；部署平台若仍有舊值，需一併更新才會生效。

目前程式沒有使用 `DATABASE_URL`、`CORS_WHITE_LIST_URLS`、`NEXTAUTH_URL`、`NEXTAUTH_SECRET`、`NEXTAUTH_JWT_EXPIRE_TIME`、`GOOGLE_ID`、`GOOGLE_SECRET`，部署這個網站不需要設定它們。

範例檔已移除原先的金鑰字串。如果原值是真實憑證，請撤銷並重新建立；刪除檔案中的值不會清除 Git 歷史。不要將真實金鑰提交到 Git，也不要替金鑰加上 `NEXT_PUBLIC_`。

## 部署到 Vercel

1. 將 repository 推送到 GitHub，在 Vercel 選擇 Add New → Project 並匯入。
2. Framework Preset 選擇 **Next.js**，Root Directory 設定為 **`apps/world`**，Node.js Version 設定為 **`24.x`**。若看到 Node.js 18 已停用的錯誤，請到 Settings → Build and Deployment 更新版本後重新部署；repository 的 `engines.node` 也已指定 `24.x`。
3. 開啟 **Include source files outside of the Root Directory in the Build Step**，讓建置能讀取 `packages/ui`、共用設定與根目錄 lockfile。
4. Install Command 設為 `cd ../.. && npm ci`；Build Command 設為 `npm run build`；Output Directory 保留 Next.js 預設值。
5. 在 Environment Variables 填入上表變數，依需要套用到 Production / Preview。Vercel 不會自動取得本機被 Git 忽略的 `.env`。
6. Deploy 後檢查 `/`、`/about`、`/post`、`/need-ai`，以及履歷、GitHub 與個人作品連結。更新環境變數後重新部署。

這是既有 Next.js 13 專案，尚未完成框架升級。若平台因舊版本安全政策拒絕部署，需要先升級框架並驗證相容性；成功本機建置不等於平台一定接受部署。

AI 助理需要伺服器 API，不能只把靜態 HTML 上傳到 GitHub Pages。現有模型名稱寫在 `apps/world/src/pages/api/openai/streaming.ts`，為 `gpt-5.5`，使用 Chat Completions 串流；AI 功能還需要確認帳戶模型權限與 API 額度。切換模型不需要新增環境變數，也不會解除帳戶餘額不足的限制。

## 自行架設 Node.js 伺服器

在根目錄安裝依賴、設定環境變數後：

```powershell
npm run build --workspace=apps/world
npm run start --workspace=apps/world
```

預設使用 port 3000。正式主機需另外設定持續執行的服務、HTTPS 與反向代理。

## 更新履歷內容的位置

- `apps/world/src/content/resume.ts`：統一管理自我介紹、年資、經歷、成果、技能、學歷、作品與聯絡方式；About、終端機與 AI 助理共同使用。
- `apps/world/src/frontend/components/resume/ResumeContent.tsx`：完整版與終端機精簡版的共用呈現元件。
- `apps/world/src/pages/api/openai/streaming.ts`：AI 助理回答規則，履歷背景從共用資料讀取。
- `apps/world/src/frontend/components/cmd/outputs/results/Post.tsx`：文章清單；文章原始發表日期應保留。
- `apps/world/src/app/layout.tsx`：網站標題、描述與語言。

本次依 2026-09-22 提供的《何家華 (3).pdf》更新。完整版 About 保留五段工作經歷的逐項職責、五項專案成就、四個個人作品、五類專長、學歷、語言能力、求職條件與完整中英文自傳；終端機版提供精簡介紹與完整履歷入口，AI 助理使用同一份完整資料。僅整理斷行、標點與技術名稱格式。

PDF 自傳仍稱智齡科技為現職，但工作經歷已列出 2026/08 起任職藍智天際，因此自傳現職與長照經歷的時態依工作經歷修正。未提供藍智天際的英文公司名稱，英文自傳沿用中文公司名稱。長照專案保留履歷所載的「仍在進行」，未視為仍任職智齡科技。網站未收錄住址、家用電話、年齡與役別。

## 參考文件

- [Vercel monorepo 設定](https://vercel.com/docs/monorepos/monorepo-faq)
- [Next.js 環境變數與建置時機](https://nextjs.org/docs/pages/guides/environment-variables)
