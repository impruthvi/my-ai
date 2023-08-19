import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructions: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code commnets for explaining the code.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const isPro = await checkSubscription();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!configuration.apiKey)
      return new NextResponse("API key now configured", { status: 500 });

    if (!messages) return new NextResponse("Invalid request", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial limit reached", { status: 402 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructions, ...messages],
    });
    if (!isPro) await incrementApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (e) {
    console.log(`[CODE_ERROR] ${e}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
