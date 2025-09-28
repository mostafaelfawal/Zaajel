import { FaCog, FaComment } from "react-icons/fa";
import Tooltips from "../Tooltips";

export default function ChatsSettings() {
  return (
    <nav
      aria-label="Sidebar Navigation"
      className="py-4 flex flex-col gap-2 border-t border-t-gray-200"
    >
      <Tooltips side="right" label="View your chats">
            <button className="active w-full font-semibold gap-3 flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <FaComment />
              <span>Chats</span>
            </button>
      </Tooltips>
      <Tooltips side="right" label="Change app settings">
            <button className="w-full font-semibold gap-3 flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <FaCog />
              <span>Settings</span>
            </button>
      </Tooltips>
    </nav>
  );
}
