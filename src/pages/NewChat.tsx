import { useNavigate } from "react-router";
import ChatInput from "../components/ui/ChatInput";

export default function NewChat() {
  const navigate = useNavigate();
  const sendMessage = (message: string, model: string) => {
    const conversationId = self.crypto.randomUUID();
    navigate(`/chat/${conversationId}`, {
      state: { message, model },
    });
  };
  return (
    <div className="justiry-center flex h-screen items-center">
      <div className="max-w-wl flex w-full flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">test-userさん</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
