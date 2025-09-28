import Message from "../Message";

export default function MessageSection({
  messages,
  message,
  messagesEndRef,
}: {
  messages: { title: string; date: string; userSide: boolean }[];
  message: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.map((m, idx) => (
        <Message
          key={idx}
          title={m.title}
          date={m.date}
          userSide={m.userSide}
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

      {/* 👇 الـ ref يفضل ثابت هنا آخر الـ main */}
      <div ref={messagesEndRef} />
    </main>
  );
}
