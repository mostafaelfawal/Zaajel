import { FaPlus, FaSearch } from "react-icons/fa";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { useEffect } from "react";
import type { UserType } from "../../types/userType";
import { auth, db, rtdb } from "../../firebase";
import Tooltips from "../Tooltips";
import { ref, onValue } from "firebase/database";

export default function SearchAdd({
  openModal,
  setModalType,
  modalType,
  setZaajelUsers,
}: {
  openModal: () => void;
  setModalType: () => void;
  modalType: string;
  setZaajelUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}) {
  useEffect(() => {
    if (modalType !== "conversation") return;

    async function getUsers() {
      const usersRef = collection(db, "users");

      // نجيب 7 مستخدمين من Firestore
      const usersQuery = query(usersRef, limit(7));
      const snapshot = await getDocs(usersQuery);

      const usersData: UserType[] = snapshot.docs
        .filter((doc) => doc.id !== auth.currentUser?.uid)
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UserType, "id">),
        }));

      // أول مرة نحطهم من غير state
      setZaajelUsers(usersData);

      // نسمع لحالة كل مستخدم من RTDB
      usersData.forEach((user) => {
        const statusRef = ref(rtdb, `status/${user.id}`);
        onValue(statusRef, (snap) => {
          const data = snap.val();

          setZaajelUsers((prev: UserType[]) =>
            prev.map((u: UserType) =>
              u.id === user.id ? { ...u, state: data?.state ?? false } : u
            )
          );
        });
      });
    }

    getUsers();
  }, [modalType, setZaajelUsers]);

  const modal = () => {
    openModal();
    setModalType();
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <label htmlFor="search" className="sr-only">
          Search conversations
        </label>
        <input
          id="search"
          placeholder="Search conversations..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zaajel-primary/20 focus:border-zaajel-primary"
        />
        <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
      </div>
      <Tooltips side="right" label="Add new conversation">
        <button
          onClick={modal}
          className="w-12 h-12 bg-zaajel-primary text-white rounded-xl flex items-center justify-center hover:bg-zaajel-secondary transition-colors"
        >
          <FaPlus size={18} />
        </button>
      </Tooltips>
    </div>
  );
}
