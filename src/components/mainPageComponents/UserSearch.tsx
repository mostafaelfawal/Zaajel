import { FaUser } from "react-icons/fa";
import Tooltips from "../Tooltips";
import StateCircle from "../StateCircle";

type UserSearchProps = {
  name: string;
  email: string;
  avatar: string;
  isActive?: boolean;
};

export default function UserSearch({
  name,
  email,
  avatar,
  isActive,
}: UserSearchProps) {
  return (
    <Tooltips label={`Start new chat whit ${name}`} side="right">
      <article className="flex gap-3 cursor-pointer hover:bg-gray-100 duration-300 p-2 rounded-xl items-center border border-zaajel-secondary bg-white mb-2">
        <div className="relative">
          {avatar ? (
            <img
              className="w-12 h-12 rounded-full object-cover border-zaajel-primary"
              src={avatar}
              alt={`${name} avatar`}
            />
          ) : (
            <FaUser className="text-blue-400 w-12 h-12 rounded-full object-cover border-2 border-zaajel-primary" />
          )}
          <StateCircle state={isActive!} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate">{email}</p>
        </div>
      </article>
    </Tooltips>
  );
}
