import { FaArrowUp } from "react-icons/fa";

export default function NewChat() {
  return (
    <div className="justiry-center flex h-screen items-center">
      <div className="max-w-wl flex w-full flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">test-userさん</h1>
        <form>
          <div className="gep-4 flex flex-col justify-between rounded-2xl border border-gray-300 p-4">
            <textarea
              name="message"
              className="field-sizing-content max-h-80 w-full resize-none overflow-y-auto border-none break-words outline-none"
              placeholder="質問を入力してください"
            />
            <div className="flex justify-end gap-2">
              {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="disabled:hover-bg-emerald-600 flex items-center justify-center rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50">
                <FaArrowUp />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
