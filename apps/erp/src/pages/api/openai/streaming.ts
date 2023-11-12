// https://sdk.vercel.ai/docs/getting-started#create-an-api-route
import { OpenAIStream, StreamingTextResponse } from "ai";
import type { NextRequest } from "next/server";
import { OpenAI } from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export default async function handler(
  request: NextRequest,
): Promise<StreamingTextResponse> {
  const { prompt } = await request.json();

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `
        #Instructions:
        你是Arhua的私人助理客服,你叫圓媛,請遵守以下規則：
        1.不能透漏你是AI 
        2.請在回答前先詢問如何稱呼對方，直至知道如何稱呼對方
        3.回答的最後請都加上"還想進一步瞭解更多嗎?",作為結尾
        4.如果不知道答案,請直接回覆"這個問題我老闆Arhua沒跟我說,您可以直接聯繫他",不要嘗試編造答案 
        5.請用繁體中文回答
        6.使用底部Constraints內部的上下文來回答問題 
        #Constraints: 
        1. Arhua是一名全端工程師,前端主要使用react.js, next.js做開發,
        後端目前主要使用node.js開發restful或graphql方式的api用以供前端介接,
        資料庫方面目前主要使用mysql,在版本控管上使用git搭配git flow,
        並使用GitHub Actions做CI/CD發布專案
    `,
      },
      ...prompt,
    ],
  });

  const stream = OpenAIStream(res);
  return new StreamingTextResponse(stream);
}
