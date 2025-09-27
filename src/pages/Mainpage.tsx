import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import {
  FaDoorOpen,
  FaDove,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaComment,
  FaCog,
  FaEllipsisV,
} from "react-icons/fa";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { UserChatType } from "../types/userChat";
import UserChat from "../components/UserChatCard";
import WelcomeMain from "../components/WelocomeMain";
import ChatPage from "./ChatPage";

export default function Mainpage() {
  const [showModal, setModal] = useState(false);
  const [inChat, setInChat] = useState(false);

  const messages: UserChatType[] = [
    {
      name: "Mike Chen",
      message: "Thanks for the project files!",
      time: "1:45 PM",
      avatar: "/public/avatar-2.jpg",
      isRead: true,
      isActive: true,
    },
    {
      name: "Alex Rodriguez",
      message: "Perfect! Let's schedule the meeting",
      time: "1:45 PM",
      avatar: "/public/avatar-3.jpg",
      isRead: false,
      isActive: false,
    },
  ];
  async function logOut() {
    await signOut(auth);
    toast.success("Logged out successfully 😥");
    setModal(false);
  }

  return (
    <Tooltip.Provider>
      <div className="flex h-screen font-sans">
        {/* Sidebar */}
        <aside className="w-80 border-r border-gray-200 p-6 flex flex-col bg-white">
          <header className="flex justify-between items-center mb-6">
            <div className="flex gap-2 items-center">
              <FaDove
                className="text-white bg-zaajel-primary p-2 size-10 rounded-xl"
                aria-hidden="true"
              />
              <h1 className="text-2xl font-bold text-gray-800">Zaajel</h1>
            </div>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => setModal(true)}
                  aria-label="Log out"
                  className="p-2 flex justify-center items-center rounded-lg hover:bg-red-100 text-red-500 transition"
                >
                  <FaSignOutAlt size={20} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="bottom"
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
              >
                Log out
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          </header>

          {/* Search & Add */}
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

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="w-12 h-12 bg-zaajel-primary text-white rounded-xl flex items-center justify-center hover:bg-zaajel-secondary transition-colors">
                  <FaPlus size={18} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="bottom"
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
              >
                Add new conversation
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          </div>

          {/* Chats & Settings */}
          <nav
            aria-label="Sidebar Navigation"
            className="py-4 flex flex-col gap-2 border-t border-t-gray-200"
          >
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="active w-full font-semibold gap-3 flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaComment />
                  <span>Chats</span>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
              >
                View your chats
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="w-full font-semibold gap-3 flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaCog />
                  <span>Settings</span>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
              >
                Change app settings
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          </nav>

          {/* Conversation list */}
          <ul className="flex flex-col gap-2 overflow-y-auto">
            {messages.map((chat, idx) => (
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
            ))}
          </ul>

          {/* User Info */}
          <div className="mt-auto border-t border-t-gray-200 flex gap-3 px-2 pt-4 items-center">
            <img
              className="outline-3 outline-zaajel-primary w-12 h-12 rounded-full object-cover border-2 border-white"
              src="/public/avatar-1.png"
              alt="User avatar"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">
                Mostafa Hamdi
              </h3>
              <p className="text-sm text-gray-600 truncate">
                armostafa982@gmail.com
              </p>
            </div>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  aria-label="More options"
                  className="text-xs text-gray-500 hover:text-zaajel-primary p-2"
                >
                  <FaEllipsisV />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="left"
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
              >
                More options
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
        </aside>

        {/* Main Content */}
        {inChat ? <ChatPage /> : <WelcomeMain />}

        {/* Logout Modal */}
        {showModal && (
          <div
            onClick={() => setModal(false)}
            className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-80 flex flex-col items-center gap-4 shadow-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
            >
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
            </div>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  );
}
