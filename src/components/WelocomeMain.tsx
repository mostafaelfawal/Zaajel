import * as Tooltip from "@radix-ui/react-tooltip";
import { FaDove } from "react-icons/fa";

export default function WelcomeMain() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-5 bg-gray-100 text-center px-6">
      <div className="flex justify-center items-center w-24 h-24 rounded-full bg-zaajel-primary/20">
        <FaDove className="text-zaajel-primary text-4xl" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-extrabold text-gray-800">
        Welcome to Zaajel
      </h2>
      <p className="text-gray-600 mb-8 max-w-xl font-semibold">
        Select a conversation from the sidebar to start chatting, or create a
        new conversation to connect with your contacts.
      </p>

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="bg-zaajel-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-zaajel-primary/90 transition-colors">
            Start New Chat
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
        >
          Start a new chat
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Root>
    </main>
  );
}
