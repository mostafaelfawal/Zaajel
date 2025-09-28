import { useState, useRef, useEffect } from "react";
// Components
import Footer from "../components/ChatPageComponents/Footer";
//Types
import type { ChatMessage } from "../types/ChatMessage";
import type { EmojiClickData } from "emoji-picker-react";
import MessageSection from "../components/ChatPageComponents/MessageSection";
import Header from "../components/ChatPageComponents/Header";

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
      <Header />

      {/* Message Section */}
      <MessageSection
        messages={messages}
        message={message}
        messagesEndRef={messagesEndRef}
      />

      {/* Footer Input */}
      <Footer
        message={message}
        setMessage={setMessage}
        addMessage={addMessage}
        setShowEmoji={setShowEmoji}
        showEmoji={showEmoji}
        handleEmojiClick={handleEmojiClick}
      />
    </div>
  );
}
