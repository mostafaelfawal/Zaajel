import type { ChatMessage } from "../types/ChatMessage";

export default function Message({ title, date, userSide }: ChatMessage) {
  return (
    <div
      className={`w-full flex ${userSide ? "justify-start" : "justify-end"}`}
    >
      <div className="max-w-[70%]">
        <article
          className={`px-4 py-2 rounded-2xl shadow-sm max-w-[calc(100vw/2)] w-fit break-words ${
            userSide
              ? "bg-white text-gray-800 rounded-bl-md"
              : "bg-zaajel-secondary text-white rounded-br-md"
          }`}
        >
          <p>{title}</p>
        </article>
        <p
          className={`text-xs text-gray-500 mt-1 ${
            userSide ? "ml-1" : "text-right mr-1"
          }`}
        >
          {date}
        </p>
      </div>
    </div>
  );
}
