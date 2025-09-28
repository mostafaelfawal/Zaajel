import Message from "../Message";
import type { ChatMessage } from "../../types/ChatMessage";
import { auth } from "../../firebase";

export default function MessageSection({
  messages,
  message,
  messagesEndRef,
}: {
  messages: ChatMessage[];
  message: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.map((m, idx) => (
        <Message
          key={idx}
          title={m.title}
          createdAt={m.createdAt}
          userSide={m.from === auth.currentUser?.uid}
        />
      ))}

      {/* Typing Indicator */}
      {message.trim().length > 0 && (
        <div className="w-fit bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </main>
  );
}
