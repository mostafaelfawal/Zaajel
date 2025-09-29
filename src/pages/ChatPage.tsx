import { useState, useRef, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
// Components
import Footer from "../components/ChatPageComponents/Footer";
//Types
import type { ChatMessage } from "../types/ChatMessage";
import type { EmojiClickData } from "emoji-picker-react";
import MessageSection from "../components/ChatPageComponents/MessageSection";
import Header from "../components/ChatPageComponents/Header";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, rtdb } from "../firebase";
import toast from "react-hot-toast";

export default function ChatPage({ CID, uid, setInChat }: { CID: string; uid: string; setInChat: VoidFunction }) {
  const [message, setMessage] = useState<string>(""); // Input message
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const sendSound = new Audio("/sounds/send.mp3");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userTo, setUserTo] = useState<{
    name: string;
    state: boolean;
    avatar: string;
  }>({ name: "", state: false, avatar: "" });

  useEffect(() => {
    if (!CID || !uid) return;

    const fetchChatData = async () => {
      // 👤 جلب بيانات المستخدم الأساسية
      const toRef = doc(db, "users", uid);
      const toUserData = await getDoc(toRef);

      if (toUserData.exists()) {
        const userData = toUserData.data();

        // 🔄 مراقبة الحالة أولاً
        const statusRef = ref(rtdb, `status/${uid}`);
        const unsubStatus = onValue(statusRef, (snapshot) => {
          const statusData = snapshot.val();

          setUserTo({
            name: userData.name,
            state: statusData?.state ?? false,
            avatar: userData.avatar || "",
          });
        });

        // 💬 مراقبة الرسائل
        const messagesRef = collection(db, "chats", CID, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubMessages = onSnapshot(q, (snapshot) => {
          const msgs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as ChatMessage),
          }));
          setMessages(msgs);
        });

        // دالة التنظيف
        return () => {
          off(statusRef, "value", unsubStatus);
          unsubMessages();
        };
      }
    };

    const cleanup = fetchChatData();

    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn());
    };
  }, [CID, uid]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const addMessage = async (newMessage: string) => {
    if (!newMessage.trim() || !CID || !auth.currentUser) return;
    sendSound.play();

    // ✅ استخدم serverTimestamp بشكل صحيح
    const msg = {
      from: auth.currentUser.uid,
      to: uid,
      title: newMessage,
      createdAt: serverTimestamp(),
      Fseen: false,
      Tseen: false,
    };

    try {
      setMessage("");
      setShowEmoji(false);
      await addDoc(collection(db, "chats", CID, "messages"), msg);
    } catch (error) {
      toast.error("Error sending message: " + error);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="flex flex-col w-full">
      <Header setInChat={setInChat} name={userTo.name} state={userTo.state} avatar={userTo.avatar} />{" "}
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
