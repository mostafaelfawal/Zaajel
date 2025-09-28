import type { UserChatType } from "../../types/userChat";
import StateCircle from "../StateCircle";
import Tooltips from "../Tooltips";

export default function UserChat({
  name,
  message,
  time,
  avatar,
  isRead,
  isActive,
  openChat,
}: UserChatType) {
  return (
    <Tooltips label={message} side="right">
      <li
        onClick={openChat}
        className="flex gap-3 cursor-pointer hover:bg-gray-100 duration-300 p-2 rounded-xl items-center"
      >
        <div className="relative">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={avatar}
            alt={`${name} avatar`}
          />
          <StateCircle state={isActive} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
            <time className="text-xs text-gray-500">{time}</time>
          </div>
          <p className="text-sm text-gray-600 truncate">{message}</p>
        </div>
        {isRead && (
          <span
            className="w-2 h-2 bg-zaajel-primary rounded-full"
            aria-hidden="true"
          ></span>
        )}
      </li>
    </Tooltips>
  );
}
