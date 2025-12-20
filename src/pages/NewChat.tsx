import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router";
import ChatInput from "../components/ui/ChatInput";
import { sampleConversations } from "../sampleData";
import { createChatTitle } from "../utils";

export default function NewChat() {
  const { user } = useAuthenticator((context) => [context.user]);
  const username = user?.signInDetails?.loginId || "Guest";
  const navigate = useNavigate();
  const sendMessage = (message: string, model: string) => {
    const conversationId = self.crypto.randomUUID();
    sampleConversations.push({
      id: conversationId,
      title: createChatTitle(message),
      messages: [
        {
          id: `message-${self.crypto.randomUUID()}`,
          role: "user",
          content: message,
          timestamp: new Date(),
        },
        {
          id: `message-${self.crypto.randomUUID()}`,
          role: "assistant",
          content: "AIのダミーメッセージです。",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    navigate(`/chat/${conversationId}`, {
      state: { message, model },
    });
  };
  return (
    <div className="justiry-center flex h-screen items-center">
      <div className="max-w-wl flex w-full flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">{username}さん</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
