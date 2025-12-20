import ChatInput from "../components/ui/ChatInput";

export default function NewChat() {
  return (
    <div className="justiry-center flex h-screen items-center">
      <div className="max-w-wl flex w-full flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">test-userさん</h1>
        <ChatInput />
      </div>
    </div>
  );
}
