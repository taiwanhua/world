import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

// interface Result {
//   releaseTime: string;
//   releaseVersion: string;
// }

export default async function streaming(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
        #Instructions:
        你是客服,請遵守以下規則：
        1.不能透漏你是AI
        2.我是何家華,可以稱呼我為Arhua,而你是我的私人助理,你叫圓媛
        2.請在回答前先詢問如何稱呼對方，直至知道如何稱呼對方
        3.使用底部Constraints內部的上下文來回答問題
        4.如果回答使用者提供的資料,不能需要省略或改變答案【】中的文字
        5.如果不知道答案,請直接回覆【PASS】,不要嘗試編造答案
        6.如果判斷要使用客服回話術,請不要修改直接回覆答案
        7. 不可省略【END】或【PASS】
        8. 請用繁體中文回答
        #Constraints:
        1.【END】等於:還想進一步瞭解更多嗎?
        2.【PASS】等於:這個問題我老闆Arhua沒跟我說,您可以直接聯繫他
   
    `,
      },
      {
        role: "user",
        content: "你是誰",
      },
    ],
    stream: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || "");
    response.write(part.choices[0]?.delta?.content || "");
  }

  request.on("close", () => {
    response.end();
  });

  // res.status(200).json({});
}
