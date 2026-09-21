"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import { resume } from "@/content/resume";

const sections = [
  ["experience", "工作經歷"],
  ["achievements", "專案成就"],
  ["skills", "專長"],
  ["education", "學歷與語言"],
  ["projects", "個人作品"],
  ["preferences", "求職條件"],
  ["biography", "自傳"],
  ["biography-en", "English Biography"],
];

function DetailList({ items }: { items: string[] }): JSX.Element {
  return (
    <List
      component="ol"
      dense
      sx={{ paddingLeft: 3, listStyleType: "decimal" }}
    >
      {items.map((item) => (
        <ListItem
          key={item}
          sx={{ display: "list-item", paddingLeft: 0, lineHeight: 1.8 }}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
}

export default function ResumeContent({
  compact = false,
}: {
  compact?: boolean;
}): JSX.Element {
  const currentJob = resume.jobs[0];

  return (
    <Box
      className={compact ? "" : "resume-content"}
      sx={{
        overflowWrap: "anywhere",
        "& > * + *": { marginTop: 3 },
        "& section": { scrollMarginTop: 2 },
        "& p": { lineHeight: 1.9 },
        "& a": { textDecoration: "underline", textUnderlineOffset: "0.2em" },
      }}
    >
      <Typography component="h2" variant="h5">
        {resume.name}（{resume.englishName}）｜{resume.title}
      </Typography>
      <Typography>{resume.summary}</Typography>
      <Typography color="text.secondary">
        現職：{currentJob.company} · {currentJob.title} · {currentJob.period}
      </Typography>
      <Typography>
        {compact ? resume.technologies.join("、") : resume.approach}
      </Typography>
      {compact ? (
        <>
          <Box component="section">
            <Typography component="h3" variant="h6">
              重點成果
            </Typography>
            <DetailList items={resume.highlights} />
          </Box>
          <Typography>
            <Link href="/about">
              閱讀完整履歷：工作經歷、專案成就、專長與中英文自傳 →
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Box
            aria-label="履歷章節"
            component="nav"
            sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            {sections.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </Box>
          <Divider />
          <Box component="section" id="experience">
            <Typography component="h2" variant="h5">
              工作經歷
            </Typography>
            <Typography color="text.secondary">{resume.experience}</Typography>
            {resume.jobs.map((job) => (
              <Box key={job.company} marginTop={3}>
                <Typography component="h3" variant="h6">
                  {job.company}｜{job.title}
                </Typography>
                <Typography color="text.secondary">{job.period}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {job.context}
                </Typography>
                <DetailList items={job.details} />
              </Box>
            ))}
          </Box>
          <Divider />
          <Box component="section" id="achievements">
            <Typography component="h2" variant="h5">
              專案成就
            </Typography>
            {resume.achievements.map((project) => (
              <Box key={project.name} marginTop={3}>
                <Typography component="h3" variant="h6">
                  {project.name}
                </Typography>
                <Typography color="text.secondary">{project.period}</Typography>
                <Typography>{project.description}</Typography>
                <DetailList items={project.details} />
              </Box>
            ))}
          </Box>
          <Divider />
          <Box component="section" id="skills">
            <Typography component="h2" variant="h5">
              專長
            </Typography>
            {resume.skills.map((skill) => (
              <Box key={skill.title} marginTop={3}>
                <Typography component="h3" variant="h6">
                  {skill.title}
                </Typography>
                <DetailList items={skill.items} />
              </Box>
            ))}
          </Box>
          <Divider />
          <Box component="section" id="education">
            <Typography component="h2" variant="h5">
              學歷與語言能力
            </Typography>
            <Typography>{resume.education}</Typography>
            <DetailList items={resume.languages} />
          </Box>
        </>
      )}
      <Divider />
      <Box component="section" id={compact ? undefined : "projects"}>
        <Typography
          component={compact ? "h3" : "h2"}
          variant={compact ? "h6" : "h5"}
        >
          個人作品
        </Typography>
        {!compact && (
          <Typography color="text.secondary">
            {resume.personalProjectsPeriod}
          </Typography>
        )}
        <List dense>
          {resume.projects.map((project) => (
            <ListItem
              key={project.name}
              sx={{ display: "block", paddingLeft: 0 }}
            >
              <a href={project.url} rel="noopener noreferrer" target="_blank">
                {project.name}
              </a>
              {!compact && <Typography>{project.description}</Typography>}
            </ListItem>
          ))}
        </List>
      </Box>
      {!compact && (
        <>
          <Divider />
          <Box component="section" id="preferences">
            <Typography component="h2" variant="h5">
              求職條件
            </Typography>
            <Box
              component="dl"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "7rem 1fr" },
                gap: 1,
              }}
            >
              {resume.preferences.map(({ label, value }) => (
                <Box key={label} sx={{ display: "contents" }}>
                  <Typography component="dt" fontWeight="bold">
                    {label}
                  </Typography>
                  <Typography component="dd" sx={{ margin: 0 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Divider />
          <Box component="section" id="biography">
            <Typography component="h2" variant="h5">
              自傳
            </Typography>
            {resume.biography.map((paragraph) => (
              <Typography key={paragraph} marginTop={2}>
                {paragraph}
              </Typography>
            ))}
          </Box>
          <Divider />
          <Box component="section" id="biography-en" lang="en">
            <Typography component="h2" variant="h5">
              English Biography
            </Typography>
            {resume.biographyEnglish.map((paragraph) => (
              <Typography key={paragraph} marginTop={2}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        </>
      )}
      <Divider />
      <Typography>
        <a href={resume.links.resume} rel="noopener noreferrer" target="_blank">
          104 完整履歷
        </a>
        {" · "}
        <a href={resume.links.github} rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
      </Typography>
      <Typography>
        聯絡信箱：
        <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
      </Typography>
      {!compact && (
        <Typography>
          聯絡電話：
          <a href={`tel:${resume.contact.phone.replaceAll("-", "")}`}>
            {resume.contact.phone}
          </a>
          （{resume.contact.hours}）
        </Typography>
      )}
    </Box>
  );
}
