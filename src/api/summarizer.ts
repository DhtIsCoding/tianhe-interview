export interface MessgaeDto {
  role: "user";
  // 要总结的文本内容
  content: string;
}

export interface SummarizerDto {
  messages: [MessgaeDto];
  model: "model-6b";
  // 文档没有SSE地址咋启用啊？
  stream: boolean;
}

export interface SummarizerResponse {
  role: "assistant";
  content: string;
}

export default function postSummarizer(params: SummarizerDto) {
  const cancelToken = new AbortController();

  let cancelReject: ((reason?: any) => void) | null = null;

  const cancelPromise = new Promise((_, reject) => {
    cancelReject = reject;
  });

  function cancelRequest() {
    cancelToken.abort();
    cancelReject?.("取消了");
  }

  const getDataPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        "https://llm-summarizer.ga.skyvault.cn:30443/api/summarizer/text",
        {
          method: "POST",
          body: JSON.stringify(params),
          signal: cancelToken.signal,
          mode: 'no-cors',
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      resolve(data as SummarizerResponse);
      // resolve({
      //   role: "assistant",
      //   content: "这是一个总结",
      // });
    } catch (error) {
      reject(error);
    }
  });

  return {
    cancelRequest,
    request: Promise.race([getDataPromise, cancelPromise]),
  };
}
