import { useParams } from "react-router";

export default function ChatConversation() {
  const { conversationId } = useParams();
  return (
    <div>
      <h1>チャット画面</h1>
      <p>Conversation ID: {conversationId}</p>
    </div>
  );
}
