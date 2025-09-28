import { FaArrowLeft } from "react-icons/fa";
import StateCircle from "../../StateCircle";

export default function UserInfo() {
  return (
    <div className="flex items-center gap-3">
      <button className="md:hidden block p-2 hover:bg-white/10 rounded-full transition duration-200">
        <FaArrowLeft />
      </button>
      <div className="relative">
        <img
          src="/assets/avatar-2.jpg"
          alt="user profile"
          className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
        />
        <StateCircle state />
      </div>
      <div className="leading-tight">
        <h2 className="font-semibold text-lg">Mike Chen</h2>
        <p className="text-zaajel-text-secondary text-sm">Online</p>
      </div>
    </div>
  );
}
