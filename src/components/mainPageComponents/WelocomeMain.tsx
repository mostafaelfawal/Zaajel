import { FaDove } from "react-icons/fa";

export default function WelcomeMain() {
  return (
    <main className="flex-1 hidden md:flex flex-col justify-center items-center gap-5 bg-gray-100 text-center px-6">
      <div className="flex justify-center items-center w-24 h-24 rounded-full bg-zaajel-primary/20">
        <FaDove className="text-zaajel-primary text-4xl" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-800">Hello Zaajel</h2>
      <p className="text-gray-600 mb-8 max-w-xl font-semibold">
        Select a conversation from the sidebar to start chatting, or create a
        new conversation to connect with Zaajel users.
      </p>
    </main>
  );
}
