import { signOut } from "firebase/auth";
import { auth, db, rtdb } from "../firebase";
import toast from "react-hot-toast";
import { FaDoorOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { UserChatType } from "../types/userChat";
// Components
import UserChat from "../components/mainPageComponents/UserChatCard";
import WelcomeMain from "../components/mainPageComponents/WelocomeMain";
import ChatsSettings from "../components/mainPageComponents/ChatsSettings";
import SearchAdd from "../components/mainPageComponents/SearchAdd";
import UserInfo from "../components/mainPageComponents/UserInfo";
import SideBarHidder from "../components/mainPageComponents/SideBarHidder";
import Modal from "../components/Modal";
import UserSearch from "../components/mainPageComponents/UserSearch";

import ChatPage from "./ChatPage";
import {
  doc,
  getDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import type { UserType } from "../types/userType";
import { ref, set } from "firebase/database";

export default function Mainpage() {
  const [showModal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [inChat, setInChat] = useState(false);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [zaajelUsers, setZaajelUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    }
    fetchUser();
  }, []);
  const messages: UserChatType[] = [
    {
      name: "Mike Chen",
      message: "Thanks for the project files!",
      time: "1:45 PM",
      avatar: "/assets/avatar-2.jpg",
      isRead: true,
      isActive: true,
    },
    {
      name: "Alex Rodriguez",
      message: "Perfect! Let's schedule the meeting",
      time: "1:45 PM",
      avatar: "/assets/avatar-3.jpg",
      isRead: false,
      isActive: false,
    },
  ];
  async function logOut() {
    const uid = auth.currentUser?.uid;
    if (uid) {
      await set(ref(rtdb, `status/${uid}`), {
        state: false,
        lastChanged: serverTimestamp(),
      });
    }
    await signOut(auth);
    toast.success("Logged out successfully 🕊");
    setModal(false);
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside
        className={`border-r border-gray-200 p-6 md:w-80 w-screen ${
          inChat ? "hidden" : "flex"
        } flex-col bg-white`}
      >
        {/* Header */}
        <SideBarHidder
          openModal={() => setModal(true)}
          setModalType={() => setModalType("logout")}
        />

        {/* Search & Add */}
        <SearchAdd
          openModal={() => setModal(true)}
          setModalType={() => setModalType("conversation")}
          setZaajelUsers={setZaajelUsers}
          modalType={modalType}
        />

        {/* Chats & Settings */}
        <ChatsSettings />

        {/* Conversation list */}
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((chat, idx) => (
              <UserChat
                key={idx}
                name={chat.name}
                message={chat.message}
                time={chat.time}
                avatar={chat.avatar}
                isRead={chat.isRead}
                isActive={chat.isActive}
                openChat={() => setInChat(true)}
              />
            ))
          ) : (
            <li>
              <p className="text-zaajel-primary font-semibold text-lg">
                No chats have started yet.
              </p>
            </li>
          )}
        </ul>

        {/* User Info */}
        <UserInfo
          avatar={userData?.avatar}
          name={userData?.name}
          email={userData?.email}
        />
      </aside>

      {/* Main Content */}
      {inChat ? (
        <ChatPage
          setInChat={() => setInChat(false)}
          CID={selectedChat}
          uid={selectedUser}
        />
      ) : (
        <WelcomeMain />
      )}

      {/* Logout Modal */}
      {showModal && modalType === "logout" && (
        <Modal closeModal={() => setModal(false)}>
          <div className="p-4 rounded-full bg-red-500 text-white">
            <FaDoorOpen size={30} aria-hidden="true" />
          </div>
          <h3 id="logout-title" className="text-lg font-bold text-gray-800">
            Confirm Logout
          </h3>
          <p className="text-gray-600 text-center">
            Are you sure you want to log out?
          </p>
          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={logOut}
              className="flex-1 bg-zaajel-primary text-white py-2 rounded-xl hover:bg-zaajel-secondary transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setModal(false)}
              className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {/* Add New Conversation Modal */}
      {showModal && modalType === "conversation" && (
        <Modal closeModal={() => setModal(false)}>
          <div className="flex flex-col gap-4 w-full">
            {/* Search Input */}
            <input
              className="w-full px-4 py-3 pr-12 border rounded-full border-gray-200
                focus:border-transparent focus:outline-none focus:ring-2
                focus:ring-zaajel-primary focus:bg-white transition-all resize-none overflow-hidden"
              placeholder="Search by email or name..."
            />

            {/* Section Title */}
            <h2 className="font-bold text-xl text-left w-full border-b border-b-gray-300 pb-1">
              Zaajel Users
            </h2>

            {/* User List */}
            <div className="overflow-y-auto max-h-[60vh]">
              {zaajelUsers.map((user) => (
                <UserSearch
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                  isActive={user.state}
                  closeModal={() => setModal(false)}
                  setUserId={setSelectedUser}
                  setSelectedChat={setSelectedChat}
                  openChat={() => setInChat(true)}
                />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
