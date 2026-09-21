// Source: 何家華 (3).pdf, supplied on 2026-09-22.
// Preserve resume descriptions. Current employment follows the dated work history.
export const resume = {
  name: "何家華",
  englishName: "Andy Ho",
  nickname: "阿華",
  title: "資深全端工程師",
  experience: "7 年以上軟體開發經驗（履歷總年資：7～8 年）",
  summary:
    "資深全端工程師，具 7 年以上軟體開發經驗，熟悉 React、Next.js、TypeScript 前端開發，並具備 Node.js、GraphQL、RESTful API、WebSocket、資料表規劃、權限模型與跨系統整合經驗。曾參與金融系統、OTT 內部管理平台、長照派車系統、長照 SaaS 管理系統、金流、對帳、發票、報表與 AI 資料摘要功能開發。",
  approach:
    "擅長從業務需求與使用者流程出發，拆解功能規格、設計前後端資料流程、規劃 API 與資料模型，並交付可維護、可擴充的系統功能。在長照 SaaS 平台的經歷中，除了負責前端模組與使用者流程，也支援後端 API 串接、資料流程確認、金流與報表功能開發，並導入 AI-assisted engineering 工作流，協助團隊提升 legacy code 升級、code review、E2E 測試與版本交付效率。",
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "RESTful API",
    "WebSocket",
    "MongoDB",
    "MySQL",
    "Microsoft SQL Server",
    "LangGraph",
    "Claude AI Skill",
  ],
  highlights: [
    "導入 Claude AI Skill，建立 code review、MR 撰寫、Jira 串接與 E2E 測試輔助流程。",
    "主導 legacy code 升級，將原預估近兩年的任務縮短至約兩個月。",
    "使用 LangGraph 開發照護資料摘要，並完成信用卡金流、對帳、發票與報表功能。",
  ],
  jobs: [
    {
      company: "藍智天際顧問有限公司",
      title: "資深前端工程師",
      period: "2026/08－至今",
      context: "電腦軟體服務業｜1～30 人｜前端工程師",
      details: [
        "虛擬貨幣交易所系統維護。",
        "E2E 測試撰寫。",
        "同步舊系統需求到新系統上。",
      ],
    },
    {
      company: "智齡科技股份有限公司",
      title: "資深前端工程師",
      period: "2024/04－2026/07（2 年 4 個月）",
      context: "電腦軟體服務業｜30～100 人｜前端工程師｜新北市新店區",
      details: [
        "長日居照護 SaaS 管理系統之前端開發與維護，負責 UI 實作、元件升級、系統穩定性改善與跨模組整合。",
        "結合 Claude AI Skill 建立 code review、MR 撰寫、Jira 串接與 E2E 測試輔助工作流。",
        "主導前端 legacy code 升級，透過 AI Skill 拆解升級規則、產出初版修改，並輔助 code review 與測試補強。",
        "將原本需大量人工逐檔處理的 legacy code 升級流程，自動化為可重複執行的工作流，使原預估近兩年的任務縮短至約兩個月。",
        "使用 LangGraph 開發 AI 資料摘要功能，協助使用者快速整理照護資料，探索 LLM 在長照 SaaS 系統中的實際應用。",
        "串接信用卡金流服務，完成 SaaS 線上即時消費流程，並開發對帳、發票與報表相關功能。",
        "設計 Git Flow 與 Scrum 上版流程，協助團隊降低協作成本並提升版本發布穩定性。",
        "維護主專案後端與相關微服務，支援 API 串接、資料流程確認與跨端問題排查。",
        "協助新專案架構技術選型。",
      ],
    },
    {
      company: "台灣威亞數位科技股份有限公司",
      title: "資深工程師",
      period: "2021/11－2024/04（2 年 6 個月）",
      context: "電腦軟體服務業｜100～500 人｜全端工程師｜台北市內湖區",
      details: [
        "使用 Monorepo 為專案架構加上 React、Next.js 為主體，搭建 OTT 服務內部管理的系統。",
        "內部系統範圍涵蓋 Content、Artwork、Payment、QA 等部門頻繁使用的功能為主體。",
        "整合舊系統內容至新系統，讓功能不再分散，但按各部門需求拆分功能。",
        "規劃權限架構、資料表規劃，製作符合業務需求的 GraphQL API 並串接。",
        "搭配 Amazon S3 做大檔案 multipart upload 上傳功能，實現影片轉檔前的上傳任務。",
        "使用 Recharts 製作具統計分析意義的報表，並可以匯出 xlsx 或 csv 檔案。",
        "製作可拖曳、可排序、可維護內容的排影片 UI。",
        "隨著團隊使用兩週為一個 Sprint 的敏捷開發方式。",
      ],
    },
    {
      company: "小驢行股份有限公司",
      title: "網頁前端工程師",
      period: "2020/05－2021/08（1 年 4 個月）",
      context:
        "網際網路相關業｜1～30 人｜網頁設計師｜管理 4 人以下｜新北市板橋區",
      details: [
        "使用 React、Next.js 作為框架，開發公司多個網頁產品。",
        "重構公司舊有系統，讓使用體驗流暢起來。",
        "協助架設公司內部專用 Git server。",
        "與設計師討論畫面細節、操作流程，並製作符合業主審美的前台畫面。",
        "製作可自定義動態表單，使用者可以自由隨需求自己創建頁面表單。",
        "與後端工程師討論資料格式，並串接 RESTful API 與 WebSocket。",
        "參與規劃權限架構（使用者、角色、部門）、資料表規劃。",
        "帶領前端組內分派工作、工作進度管控。",
      ],
    },
    {
      company: "資拓宏宇國際股份有限公司",
      title: "網頁工程師",
      period: "2018/11－2020/03（1 年 5 個月）",
      context: "電腦軟體服務業｜500 人以上｜網頁設計師｜新北市板橋區",
      details: [
        "新鮮人的第一份工作，主要專案業務內容面向金融業，了解金融業業務需求後，使用 MVC 框架針對其需求做出資料表設計、API 規劃，與畫面操作流程與製作，最後交付專案。",
      ],
    },
  ],
  achievements: [
    {
      name: "長照、日照、居服照護 SaaS 管理系統",
      period: "2024/04－仍在進行（履歷所載專案期間）",
      description:
        "提供長照、日照與居服機構使用的 SaaS 管理系統，涵蓋個案資料、照護紀錄、服務流程、金流與 AI 資料摘要等功能。",
      details: [
        "負責前端功能開發、UI 實作、legacy code 升級與跨模組維護。",
        "建立 AI-assisted engineering 工作流，使用 Claude AI Skill 協助 code review、發 MR、Jira 串接與 E2E 測試。",
        "搭配 LangGraph 開發 AI 資料摘要功能，協助使用者整理照護資料並提升資訊判讀效率。",
        "串接信用卡金流，完成 SaaS 線上消費流程，並開發對帳、發票與報表功能。",
        "設計 Git Flow 與 Scrum 上版流程，支援團隊穩定交付。",
      ],
    },
    {
      name: "OTT 服務內部系統",
      period: "2021/11－2024/04",
      description:
        "提供 OTT 服務影片資訊維護、上架、會員、優惠、轉檔等管理的系統。",
      details: [
        "使用 Monorepo 為專案架構加上 React、Next.js 為主體，輔以 TypeScript、MUI、React Hook Form、Yup、zustand、date-fns-tz、dnd-kit 搭建系統。",
        "規劃權限架構、資料表規劃，使用 Next.js 的 API Routes 與 Express 製作符合業務需求的 GraphQL API 並串接。",
        "大檔案 multipart upload 上傳功能。",
        "具統計分析意義的報表展示，與可匯出 xlsx 或 csv 檔案。",
        "專案畫面 UI 製作。",
        "隨著團隊使用兩週為一個 Sprint 的敏捷開發方式。",
      ],
    },
    {
      name: "縣市政府長照派車系統",
      period: "2020/09－2021/08",
      description: "整合長照預約接送服務的系統。",
      details: [
        "使用 React 製作組件與畫面，搭配 styled-components（CSS-in-JS）作為 CSS 解決方案。",
        "與後端討論資料格式，並串接 RESTful API 與 WebSocket 實現即時搶單功能。",
        "參與規劃權限架構、資料表規劃。",
      ],
    },
    {
      name: "花旗 IISS 報表系統",
      period: "2019/10－2020/05",
      description: "為花旗銀行系統之子系統，提供審核流程並產生報表。",
      details: [
        "專案使用 .NET Framework 為框架，規劃並製作能動態新增表單功能，與表單審核機制，最後搭配 NPOI 產生分析報表。",
      ],
    },
    {
      name: "富邦新端末系統",
      period: "2018/11－2019/10",
      description: "作為新鮮人的第一份專案，台北富邦銀行的新端末系統。",
      details: [
        "使用 Java Spring Framework 為框架製作系統，使用封裝後的方法收送電文處理銀行業務。",
      ],
    },
  ],
  personalProjectsPeriod: "2023/01－仍在進行",
  projects: [
    {
      name: "有 AI 秘書的個人履歷網站",
      description:
        "以 IT 終端機風格，搭配 OpenAI 的 API 製作個人履歷網站，可以跟我的私人秘書打探我的個人資訊、文章與作品連結。",
      url: "https://world.arhuaho.com/",
    },
    {
      name: "WebSocket 益智連線小遊戲",
      description: "基於 ws 的即時連線轉轉棋遊戲，可以殺殺時間的有趣小品遊戲。",
      url:
        process.env.NEXT_PUBLIC_WS_GAME_URL ||
        "https://online-flexiq.arhuaho.com/",
    },
    {
      name: "具有權限架構的通用後台系統",
      description:
        "包含資料表規劃、GraphQL API、與有使用者、角色權限架構的後台模板，可做為後台通用模板使用。",
      url: "http://wowgo-for-demo.arhuaho.com/",
    },
    {
      name: "自製 React 介紹網站",
      description: "分享一些網站開發知識的小站台。",
      url: "https://taiwanhua.github.io/ArhuaReactCourse/docs/home/",
    },
  ],
  skills: [
    {
      title: "全端開發",
      items: [
        "熟悉 React、Next.js、TypeScript，具備中大型後台系統、SaaS 平台與內部管理系統開發經驗。",
        "具備 Node.js、GraphQL、RESTful API、WebSocket 開發與串接經驗。",
        "能依照業務需求規劃資料流程、API 規格、資料表結構與權限模型。",
        "熟悉表單、列表、報表、金流、對帳、發票、檔案上傳與跨模組資料整合等後台常見功能。",
        "具備 MongoDB、MySQL、Microsoft SQL Server 使用經驗。",
        "能處理前後端整合、API 串接、資料格式確認、跨端問題排查與系統維護。",
      ],
    },
    {
      title: "AI / LLM 應用與工程流程導入",
      items: [
        "使用 Claude AI Skill 建立 code review、MR、Jira 串接與 E2E 測試輔助流程。",
        "使用 LangGraph 開發 AI 應用與資料摘要功能。",
        "具備 OpenAI API 串接與 LLM 應用開發經驗。",
        "能將 AI 工具導入 legacy code 升級、測試撰寫與團隊開發流程。",
      ],
    },
    {
      title: "React 前端網頁開發",
      items: [
        "熟悉 JavaScript、TypeScript。",
        "熟悉 React、Next.js。",
        "能隨著專案需求尋找並使用適合套件，如 React Router、MUI、React Hook Form、SWR、Yup、zustand、date-fns-tz、dnd-kit、styled-components、Storybook、ESLint 等套件。",
        "能串接 RESTful API、GraphQL API、WebSocket。",
        "熟悉 Git 版本控制工具。",
        "熟悉 npm / yarn 套件管理工具。",
        "具備 Babel、Webpack 基礎設定與問題排查經驗。",
      ],
    },
    {
      title: "後端開發技術",
      items: [
        "熟悉 Node.js 撰寫 GraphQL API。",
        "具備 Node.js RESTful API 與 WebSocket 開發經驗。",
        "具備 .NET Core Web API 開發經驗。",
        "具備 .NET Framework MVC 專案開發經驗。",
        "具備資料表規劃與權限模型設計經驗（MongoDB、MySQL、Microsoft SQL Server）。",
      ],
    },
    {
      title: "版本管控與 CI/CD",
      items: [
        "熟悉 Git、Git Flow。",
        "具備 GitLab Git Server 與 GitLab Runner 建置經驗。",
        "具備 GCP 與 Vercel 專案部署經驗。",
      ],
    },
  ],
  education: "東吳大學｜數學系｜大學畢業｜2012/09－2018/06",
  languages: [
    "英文：聽、說、讀、寫中等",
    "中文：聽、說、讀、寫精通",
    "台語：精通",
  ],
  preferences: [
    { label: "希望性質", value: "全職工作" },
    { label: "上班時段", value: "日班" },
    { label: "可上班日", value: "錄取後隨時可上班" },
    { label: "希望待遇", value: "面議" },
    { label: "希望地點", value: "台北市、新北市、桃園市" },
    { label: "遠端工作", value: "對遠端工作有意願" },
    {
      label: "希望職稱",
      value: "資深全端工程師、資深前端工程師、全端工程師、軟體工程師",
    },
    {
      label: "希望職類",
      value: "全端工程師、前端工程師、後端工程師、軟體工程師",
    },
  ],
  biography: [
    "您好，我是何家華，目前任職於藍智天際顧問有限公司，擔任資深前端工程師，累積 7 年以上軟體開發經驗。我的主要專長為 React、Next.js、TypeScript 前端開發，同時具備 Node.js、GraphQL、RESTful API、WebSocket、資料表規劃、權限架構設計與跨系統整合經驗。過去曾參與金融系統、OTT 內部管理平台、長照派車系統、長照 SaaS 平台、金流、報表與 AI 應用等專案，能從需求釐清、系統設計、前後端開發到交付流程改善，完整參與產品開發生命週期。",
    "在智齡科技的長照 SaaS 系統中，我參與個案資料、照護紀錄、服務流程、金流、對帳、發票與報表等核心功能開發。這些功能不只是單純的畫面開發，也需要理解照護機構的實際作業流程，規劃前後端資料流、API 串接方式、權限控管與跨模組整合方式。我也支援主專案後端與相關微服務維護，協助處理 API 串接、資料流程確認與跨端問題排查，確保系統功能能穩定支援實際營運需求。",
    "過去在 OTT 內部管理系統專案中，我使用 Monorepo、React、Next.js、TypeScript 搭建內部管理平台，並參與權限架構、資料表規劃、GraphQL API 設計與串接。系統涵蓋 Content、Artwork、Payment、QA 等多個部門的日常作業，包含大檔案 multipart upload、報表統計、xlsx / csv 匯出、拖曳排序 UI 與跨部門功能整合。這段經驗讓我累積了從前端介面、後端 API、資料模型到營運流程整合的全端開發能力。",
    "除了產品功能開發，我也重視工程流程與可維護性。近期我主導 legacy code 升級流程，透過 AI Skill 拆解升級規則、產出初版修改、輔助 code review 與測試補強，將原本預估近兩年的升級任務縮短至約兩個月。我也協助建立 code review、MR 撰寫、Jira 串接與 E2E 測試輔助流程，提升團隊在大型專案中的交付效率與品質。",
    "未來我希望以資深全端工程師的角色，結合前端工程能力、後端 API 與資料流程設計經驗、系統整合能力與工程流程改善經驗，協助團隊打造穩定、可維護、可擴充，並能真正支援業務需求的產品與系統。",
  ],
  biographyEnglish: [
    "Hello, my name is Andy Ho. I am currently working as a Senior Front-End Engineer at 藍智天際顧問有限公司, with over seven years of software development experience. My core expertise is front-end development with React, Next.js, and TypeScript, and I also have hands-on experience with Node.js, GraphQL, RESTful APIs, WebSocket, database planning, permission architecture design, and cross-system integration.",
    "In my previous role at Jubo Health Technologies, I worked on a long-term care SaaS platform that covers case data, care records, service workflows, payment, reconciliation, invoices, reports, and AI-powered data summarization. These features require not only front-end implementation, but also a solid understanding of real business workflows, API integration, data flow design, permission control, and cross-module system integration. I also supported backend services and microservices by helping with API integration, data flow validation, and cross-end issue investigation.",
    "Previously, I worked on an OTT internal management platform using a monorepo architecture with React, Next.js, and TypeScript. I was involved in permission architecture design, database planning, GraphQL API development, and front-end integration. The system supported multiple departments, including Content, Artwork, Payment, and QA, and included features such as multipart file upload, reporting dashboards, xlsx / csv export, draggable content management UI, and internal workflow integration.",
    "In addition to product development, I care deeply about engineering efficiency and maintainability. Recently, I led a legacy code upgrade workflow by using AI Skills to break down migration rules, generate initial modifications, support code review, and improve test coverage. This helped shorten a project originally estimated to take nearly two years to around two months. I also helped build workflows for code review, merge request writing, Jira integration, and E2E testing.",
    "I am looking to contribute as a Senior Full Stack Engineer, combining my front-end engineering background, backend API experience, system design skills, and engineering workflow improvement experience to build stable, maintainable, and scalable products that solve real business problems.",
  ],
  contact: {
    phone: "0987-837-233",
    email: "a0987837233@gmail.com",
    hours: "09:00－21:00",
  },
  links: {
    resume:
      process.env.NEXT_PUBLIC_ONE_ZERO_FOUR_URL ||
      "https://pda.104.com.tw/profile/share/eWDeKPdNT0XjyAVhnXXpgCmgZhSg3V5k",
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ||
      "https://github.com/taiwanhua/world",
  },
};
