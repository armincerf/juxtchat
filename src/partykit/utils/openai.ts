import OpenAI from "openai";
import { OpenAIStream } from "ai";

export type AIMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

type Params = {
  env: Record<string, any>;
  messages: AIMessage[];
  onStartCallback: () => void;
  onTokenCallback: (token: string) => void;
};

export async function getChatCompletionResponse(params: Params) {
  const { env, messages, onStartCallback, onTokenCallback } = params;

  try {
    const apiKey = env.OPENAI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const openai = new OpenAI({ apiKey });

    const latestMessage = messages[messages.length - 1];
    const mentionsImage = latestMessage.content?.toString().includes("image");
    const model = mentionsImage ? "gpt-4-vision-preview" : "gpt-3.5-turbo";
    const openAIParams: OpenAI.Chat.ChatCompletionCreateParams = {
      model,
      stream: true,
      messages,
    };
    const openaiResponse = await openai.chat.completions.create(openAIParams);
    const stream = OpenAIStream(openaiResponse, {
      onStart: async () => onStartCallback(),
      onToken: async (token) => onTokenCallback(token),
    });

    // @ts-ignore
    for await (const _ of stream) {
      // no-op, just read the stream, onToken callback above will handle the tokens
    }
  } catch (e) {
    console.error("Error while executing OpenAI call", e);
    throw e;
  }

  return null;
}

export async function getImageResponse(imageb64: string, opts: Params) {
  const { env, onStartCallback, onTokenCallback } = opts;
  const apiKey = env.OPENAI_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const openai = new OpenAI({ apiKey });
  const currentMessages = opts.messages;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 1000,
    messages: [
      ...currentMessages,
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What's in this image? Use the previous messages as context only if relevent. Assume the participants in the chat are in the image or are taking the image",
          },
          {
            type: "image_url",
            image_url: {
              url: imageb64,
            },
          },
        ],
      },
    ],
  });

  const stream = OpenAIStream(response, {
    onStart: async () => onStartCallback(),
    onToken: async (token) => onTokenCallback(token),
  });
  // @ts-ignore
  for await (const _ of stream) {
    // no-op, just read the stream, onToken callback above will handle the tokens
  }
}
