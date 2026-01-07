import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { callBedrockChat } from "../api/bedrock";
import ChatInput from "../components/ui/ChatInput";
import MessageList from "../components/ui/MessageList";
import { sampleConversations } from "../sampleData";
import type { Conversation, Message } from "../types/chat";
import { createChatTitle } from "../utils";

export default function ChatConversation() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { state: initChatDetail } = location;
  const initRenderRef = useRef<boolean>(true);

  const getAIResponse = async (message: string, model: string) => {
    const response = await callBedrockChat(message, model);

    const newAssistantMessage: Message = {
      id: `message-${self.crypto.randomUUID()}`,
      role: "assistant",
      content: response || "AIからの応答がありませんでした。",
      timestamp: new Date(),
    };

    setConversation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newAssistantMessage],
      };
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!conversationId) return;

    if (initChatDetail) {
      if (!initRenderRef.current) return;
      initRenderRef.current = false;
      const { message, model } = initChatDetail;
      setConversation({
        id: conversationId,
        title: createChatTitle(message),
        messages: [
          {
            id: `message-${self.crypto.randomUUID()}`,
            role: "user",
            content: message,
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      getAIResponse(message, model);
    } else {
      // TODO 実際のアプリではAPIからデータを取得する
      const foundConversation = sampleConversations.find(
        (c) => c.id === conversationId,
      );
      setConversation(foundConversation || null);
    }
  }, [conversationId, initChatDetail]);

  useEffect(() => {
    if (conversation?.messages.length) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-2xl font-bold">
          指定したIDの会話が見つかりません
        </div>
      </div>
    );
  }

  const sendMessage = async (message: string, model: string) => {
    const newUserMessage: Message = {
      id: `message-${self.crypto.randomUUID()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setConversation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newUserMessage],
      };
    });

    await getAIResponse(message, model);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl font-bold">{conversation.title}</h1>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto bg-white">
        <div className="w-3xl">
          <MessageList messages={conversation.messages} />
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="mx-auto w-3xl bg-white px-4 py-3">
        <ChatInput
          sendMessage={sendMessage}
          initialModel={initChatDetail?.model}
        />
      </div>
    </div>
  );
}
