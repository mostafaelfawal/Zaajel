import { useState, useRef, useEffect } from "react";
import {
  FaArrowLeft,
  FaDove,
  FaEllipsisV,
  FaMicrophone,
  FaPaperclip,
  FaPhoneAlt,
  FaSmile,
  FaVideo,
} from "react-icons/fa";
import Tooltips from "../components/Tooltips";
import Message from "../components/Message";
import type { ChatMessage } from "../types/ChatMessage";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import StateCircle from "../components/StateCircle";

export default function ChatPage() {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const sendSound = new Audio("/sounds/send.mp3");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      title: "Hey! How are you doing today?",
      date: "10:30 AM",
      userSide: true,
    },
    {
      title:
        "I'm doing great! Just finished my morning workout. How about you?",
      date: "10:32 AM",
      userSide: false,
    },
    {
      title:
        "That's awesome! I'm planning to hit the gym later today. Any recommendations for a good workout routine?",
      date: "10:35 AM",
      userSide: true,
    },
    {
      title:
        "Sure! I'd recommend starting with some cardio and then moving to strength training. Want me to send you my routine?",
      date: "10:37 AM",
      userSide: false,
    },
    {
      title: "That would be perfect! Thank you so much 🙏",
      date: "10:39 AM",
      userSide: true,
    },
    {
      title:
        "No problem! I'll send it over in a few minutes. Also, don't forget to warm up properly before starting 💪",
      date: "10:41 AM",
      userSide: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const addMessage = (newMessage: string) => {
    if (!newMessage.trim()) return;
    sendSound.play();
    const newMsg: ChatMessage = {
      title: newMessage,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      userSide: true,
    };
    setMessages([...messages, newMsg]);
    setMessage("");
    setShowEmoji(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };
  return (
    <div className="flex flex-col w-full">
      <header className="h-fit w-full flex items-center px-6 py-3 bg-zaajel-primary text-white shadow-md justify-between">
        {/* User Info */}
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

        {/* Action Buttons */}
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
      </header>

      {/* Message Section */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((m, idx) => (
          <Message
            key={idx}
            title={m.title}
            date={m.date}
            userSide={m.userSide}
          />
        ))}

        {/* Typing Indicator */}
        {message.trim().length > 0 && (
          <div className="w-fit bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}

        {/* 👇 الـ ref يفضل ثابت هنا آخر الـ main */}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer Input */}
      <footer className="px-6 py-4 bg-white border-t border-gray-200 flex gap-2 items-center">
        <Tooltips side="top" label="Attach file">
          <button className="p-2 text-gray-500 hover:text-zaajel-secondary transition-colors">
            <FaPaperclip size={20} />
          </button>
        </Tooltips>

        <Tooltips side="top" label="Voice message">
          <button className="p-2 text-gray-500 hover:text-zaajel-secondary transition-colors">
            <FaMicrophone size={20} />
          </button>
        </Tooltips>

        <div className="w-full relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addMessage(message);
              }
            }}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-3 pr-12 border rounded-full border-gray-200
              focus:border-transparent focus:outline-none focus:ring-2
              focus:ring-zaajel-primary focus:bg-white transition-all resize-none overflow-hidden"
          />

          <Tooltips side="top" label="Emoji">
            <span>
              <FaSmile
                onClick={() => setShowEmoji(!showEmoji)}
                className="text-xl absolute right-5 top-4 text-gray-500 hover:text-zaajel-secondary cursor-pointer duration-200"
              />
            </span>
          </Tooltips>

          {showEmoji && (
            <div className="absolute bottom-14 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <Tooltips side="top" label="Send">
          <button
            onClick={() => addMessage(message)}
            className="w-10 h-10 rounded-full bg-zaajel-primary hover:bg-zaajel-secondary duration-300 min-w-10 flex justify-center items-center text-white"
          >
            <FaDove />
          </button>
        </Tooltips>
      </footer>
    </div>
  );
}
