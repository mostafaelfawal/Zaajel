import { FaDove, FaMicrophone, FaPaperclip, FaSmile } from "react-icons/fa";
import Tooltips from "../Tooltips";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

export default function Footer({
  message,
  setMessage,
  addMessage,
  setShowEmoji,
  showEmoji,
  handleEmojiClick,
}: {
  message: string;
  setMessage: (msg: string) => void;
  addMessage: (msg: string) => void;
  setShowEmoji: (show: boolean) => void;
  showEmoji: boolean;
  handleEmojiClick: (emojiData: EmojiClickData, event: MouseEvent) => void;
}) {
  return (
    <footer className="px-6 py-4 bg-white border-t border-gray-200 flex gap-2 items-center">
      <Tooltips side="top" label="Attach file">
        <button className="p-2 text-gray-500 hover:text-zaajel-secondary transition-colors">
          <FaPaperclip size={20} />
        </button>
      </Tooltips>

      <Tooltips side="top" label="Voice message">
        <button className="p-2 text-gray-500 hover:text-zaajel-secondary transition-colors">
          <FaMicrophone size={20} />
        </button>
      </Tooltips>

      <div className="w-full relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addMessage(message);
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="w-full px-4 py-3 pr-12 border rounded-full border-gray-200
              focus:border-transparent focus:outline-none focus:ring-2
              focus:ring-zaajel-primary focus:bg-white transition-all resize-none overflow-hidden"
        />

        <Tooltips side="top" label="Emoji">
          <span>
            <FaSmile
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-xl absolute right-5 top-4 text-gray-500 hover:text-zaajel-secondary cursor-pointer duration-200"
            />
          </span>
        </Tooltips>

        {showEmoji && (
          <div className="absolute bottom-14 right-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <Tooltips side="top" label="Send">
        <button
          onClick={() => addMessage(message)}
          className="w-10 h-10 rounded-full bg-zaajel-primary hover:bg-zaajel-secondary duration-300 min-w-10 flex justify-center items-center text-white"
        >
          <FaDove />
        </button>
      </Tooltips>
    </footer>
  );
}
