// https://sdk.vercel.ai/docs/getting-started#create-an-api-route
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { resume } from "@/content/resume";

export const runtime = "edge";

function errorResponse(message: string, status: number): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default async function handler(request: NextRequest): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return errorResponse(
      "AI 助理尚未設定 API 金鑰，請網站管理者設定 OPENAI_API_KEY。",
      503,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("請求格式錯誤，請重新整理後再試。", 400);
  }
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    !messages.every((message: unknown) => {
      if (typeof message !== "object" || message === null) return false;
      const entry = message as { role?: unknown; content?: unknown };
      return (
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string"
      );
    })
  ) {
    return errorResponse("對話格式錯誤，請提供有效的訊息。", 400);
  }

  try {
    const openai = new OpenAI({ apiKey });

    const res = await openai.chat.completions.create({
      model: "gpt-5.5",
      stream: true,
      messages: [
        {
          role: "system",
          content: `
你是何家華（阿華）的 AI 履歷助理，名字叫圓媛。請使用繁體中文，友善且精確地回答。
1. 只根據下方履歷資料回答經歷、技能、作品與聯絡方式，不要編造未記載的資訊。
2. 年資以 experience 為準，現職以 jobs 第一筆的有日期工作經歷為準，其餘為過去職務。
3. 不要自行推算額外年資、薪資、到職日或將過去專案描述為現職工作。
4. 未記載的問題請說明資料不足，並提供履歷中的聯絡信箱讓對方直接聯絡阿華。
5. 若被問到身分，請如實表明自己是 AI 履歷助理。
6. 可以友善詢問對方如何稱呼，但不必等待姓名才回答履歷問題。
7. 回答結尾加上「還想瞭解更多嗎？」。
履歷資料：
${JSON.stringify(resume)}
`,
        },
        ...messages,
      ],
    });

    const stream = OpenAIStream(res);
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Never return the provider's raw message: authentication errors can contain key fragments.
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return errorResponse(
          "AI 服務的 API 金鑰驗證失敗，請網站管理者更新 OPENAI_API_KEY 後重新啟動服務。",
          503,
        );
      }
      if (error.status === 429) {
        const quotaExceeded =
          error.type === "insufficient_quota" ||
          error.code === "insufficient_quota" ||
          error.code === "credit_balance_exhausted";
        return errorResponse(
          quotaExceeded
            ? "AI 服務的 API 餘額或額度不足，請網站管理者檢查 API 帳務、儲值與用量限制。"
            : "AI 服務目前請求過多，請稍後再試。",
          429,
        );
      }
      if (error.code === "context_length_exceeded") {
        return errorResponse(
          "對話內容過長，請重新整理頁面後開始新的對話。",
          400,
        );
      }
      if (error.status === 403 || error.status === 404) {
        return errorResponse(
          "AI 模型目前無法使用，請網站管理者檢查模型設定與 API 權限。",
          503,
        );
      }
    }
    return errorResponse("暫時無法連線至 AI 服務，請稍後再試。", 502);
  }
}
