import { FaEllipsisV, FaUser } from "react-icons/fa";
import Tooltips from "./Tooltips";
import StateCircle from "./StateCircle";

export default function UserInfo({
  avatar,
  name,
  email,
}: {
  avatar: string;
  name: string;
  email: string;
}) {
  return (
    <div className="mt-auto border-t border-t-gray-200 flex gap-3 px-2 pt-4 items-center">
      <div className="relative">
        {avatar ? (
          <img
            className="outline-3 outline-zaajel-primary w-12 h-12 rounded-full object-cover border-2 border-white"
            src={avatar}
            alt="User avatar"
          />
        ) : (
          <FaUser className="outline-3 outline-zaajel-primary text-zaajel-secondary w-12 h-12 rounded-full object-cover border-2 border-white" />
        )}
        <StateCircle state />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 truncate">{email}</p>
      </div>
      <Tooltips side="right" label="More options">
        <button
          aria-label="More options"
          className="text-xs text-gray-500 hover:text-zaajel-primary p-2"
        >
          <FaEllipsisV />
        </button>
      </Tooltips>
    </div>
  );
}
