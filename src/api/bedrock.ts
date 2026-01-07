import { apiClient } from "./client";

export const callBedrockChat = async (modelId: string, prompt: string) => {
  try {
    const response = await apiClient.queries.BedrockChat({
      modelId,
      prompt,
    });
    return response.data;
  } catch (error) {
    console.error("チャットの送信リクエストでエラーが発生しました:", error);
    throw new Error("チャットの送信に失敗しました。");
  }
};
