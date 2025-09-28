import { FaEllipsisV, FaPhoneAlt, FaVideo } from "react-icons/fa";
import Tooltips from "../../Tooltips";

export default function ActionButtons() {
  return (
    <div className="flex gap-3 items-center">
      <Tooltips side="bottom" label="Call">
        <button className="p-2 rounded-full hover:bg-white/10 transition duration-200">
          <FaPhoneAlt size={16} />
        </button>
      </Tooltips>
      <Tooltips side="bottom" label="Video Call">
        <button className="p-2 rounded-full hover:bg-white/10 transition duration-200">
          <FaVideo size={18} />
        </button>
      </Tooltips>
      <Tooltips side="bottom" label="More Options">
        <button className="p-2 rounded-full hover:bg-white/10 transition duration-200">
          <FaEllipsisV size={16} />
        </button>
      </Tooltips>
    </div>
  );
}
