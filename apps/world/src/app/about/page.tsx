import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSX } from "@/frontend/hooks/theme/useSX";

export default function About(): JSX.Element {
  const typographySx = useSX(
    () => ({ wordBreak: "break-word", paddingBottom: 1, paddingTop: 1 }),
    [],
  );

  return (
    <Box padding={3}>
      <Typography component="p" sx={typographySx}>
        我是阿華，全端工程師，擁有五年開發專案經，喜歡追劇、音樂、大自然🐛🐝👟⚾🌳🌲🍀🍁🌿🌾🌵🪴
      </Typography>
      <Typography component="p" sx={typographySx}>
        常用的技術或工具有 :
        React、Next、TypeScript、Express、GraphQL、Prisma、Git、MySQL、
      </Typography>

      <Divider />

      <Typography component="p" sx={typographySx}>
        React 前端網頁開發 :
        <List dense>
          <ListItem>1. 熟悉 JavaScript、TypeScript</ListItem>
          <ListItem>2. 熟悉 React、Next.js </ListItem>
          <ListItem>
            3. 能使用 React Router、MUI、React Hook
            Form、SWR、Yup、zustand、date-fns-tz、dnd-kit、styled-components、Storybook、Eslint等套件
          </ListItem>
          <ListItem>4. 能串接 RESTful API、GraphQL API、WebSocket</ListItem>
          <ListItem>5. 熟悉Git版本控制工具</ListItem>
          <ListItem>6. 熟悉npm / yarn 套件管理工具</ListItem>
          <ListItem>7. 了解Babel、Webpack 編譯打包工具</ListItem>
        </List>
      </Typography>

      <Divider />

      <Typography component="p" sx={typographySx}>
        後端開發技術 :
        <List dense>
          <ListItem>1. 熟悉Node.js撰寫GraphQL API</ListItem>
          <ListItem>2. 了解Node.js撰寫RESTful API、WebSocket</ListItem>
          <ListItem>3. 了解 .Net Core 撰寫 Web API</ListItem>
          <ListItem>4. 了解 .Net Framework 撰寫 MVC 專案</ListItem>
          <ListItem>5. 了解MySQL、Microsoft SQL Server</ListItem>
          <ListItem>6.了解資料表規劃</ListItem>
        </List>
      </Typography>

      <Divider />

      <Typography component="p" sx={typographySx}>
        版本管控與CI/CD :
        <List dense>
          <ListItem>1. 熟悉 Git 、Git flow</ListItem>
          <ListItem>2. 了解搭建GitLab Git Server、GitLab Runner</ListItem>
          <ListItem>3. 了解 GCP 、Vercel Deploy 專案</ListItem>
          <ListItem>6.了解資料表規劃</ListItem>
        </List>
      </Typography>

      <Divider />
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.NEXT_PUBLIC_ONE_ZERO_FOUR_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🖥️ 104 制式履歷連結 💻
        </a>
      </Typography>
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🖥️ GitHub連結 💻
        </a>
      </Typography>
      <Divider />
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.NEXT_PUBLIC_WS_GAME_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🎲🕹️ 來玩個小遊戲認識一下 (❁´◡`❁) 🎰🎮
        </a>
      </Typography>
    </Box>
  );
}
