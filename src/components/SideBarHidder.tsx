import { FaDove, FaSignOutAlt } from "react-icons/fa";
import Tooltips from "./Tooltips";

export default function SideBarHidder({
  openModal,
  setModalType,
}: {
  openModal: () => void;
  setModalType: () => void;
}) {
  const modal = () => {
    setModalType();
    openModal();
  };
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex gap-2 items-center">
        <FaDove
          className="text-white bg-zaajel-primary p-2 size-10 rounded-xl"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold text-gray-800">Zaajel</h1>
      </div>
      <Tooltips side="right" label="Log out">
        <button
          onClick={modal}
          aria-label="Log out"
          className="p-2 flex justify-center items-center rounded-lg hover:bg-red-100 text-red-500 transition"
        >
          <FaSignOutAlt size={20} />
        </button>
      </Tooltips>
    </header>
  );
}
