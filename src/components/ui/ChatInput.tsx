import { type FormEvent, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ChatInputProps {
  sendMessage: (message: string, model: string) => void;
  initialModel?: string;
}

export default function ChatInput({
  sendMessage,
  initialModel,
}: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedModel) return;
    sendMessage(message, selectedModel);
    setMessage("");
  };
  const models = [
    {
      id: "1",
      name: "Claude 4.5 Haiku v1",
    },
    {
      id: "2",
      name: "Claude Sonnet 4.5 v1",
    },
    {
      id: "3",
      name: "Amazon Nova Pro 1.0",
    },
  ];
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    initialModel || models[0].id,
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="gep-4 flex flex-col justify-between rounded-2xl border border-gray-300 p-4">
        <textarea
          name="message"
          className="field-sizing-content max-h-80 w-full resize-none overflow-y-auto border-none break-words outline-none"
          placeholder="質問を入力してください"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const form = e.currentTarget.closest("form");
              if (form) form.requestSubmit();
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <div className="jusity-center flex items-center rounded-md text-sm">
            <select
              className="w-full rounded-md p-2"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              name="model"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={message.trim() === ""}
            className="disabled:hover-bg-emerald-600 flex items-center justify-center rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </form>
  );
}
