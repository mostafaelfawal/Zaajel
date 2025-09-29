import { FaArrowLeft, FaUser } from "react-icons/fa";
import StateCircle from "../../StateCircle";

export default function UserInfo({
  name,
  state,
  avatar,
  setInChat,
}: {
  name: string;
  state: boolean;
  avatar: string;
  setInChat: VoidFunction;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={setInChat}
        className="md:hidden block p-2 hover:bg-white/10 rounded-full transition duration-200"
      >
        <FaArrowLeft />
      </button>
      <div className="relative">
        {avatar ? (
          <img
            className="outline-3 outline-zaajel-primary w-12 h-12 rounded-full object-cover border-2 border-white"
            src={avatar}
          />
        ) : (
          <FaUser className="outline-3 outline-zaajel-primary text-zaajel-secondary w-12 h-12 rounded-full object-cover border-2 border-white" />
        )}
        <StateCircle state={state} />
      </div>
      <div className="leading-tight">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-zaajel-text-secondary text-sm">
          {state ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}
