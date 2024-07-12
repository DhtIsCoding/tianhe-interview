export interface MessgaeDto {
  role: "user";
  // 要总结的文本内容
  content: string;
}

export interface SummarizerDto {
  messages: Array<MessgaeDto>;
  model: "model-6b/model-100b";
  // 文档没有SSE地址咋启用啊？
  stream: boolean;
}

export interface SummarizerResponse {
  role: "assistant";
  content: string;
}

export async function summarizer(params: SummarizerDto) {
  const res = await fetch(
    "https://llm-summarizer.ga.skyvault.cn:30443/api/summarizer/text",
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data as SummarizerResponse;
}
