import { FaDove } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-tl from-white to-zaajel-text-secondary">
      <FaDove className="text-zaajel-primary text-6xl animate-bounce" />
      <h1 className="font-extrabold text-4xl">
        <span className="text-zaajel-primary">Zaajel</span> has been sent
        ,please wait...
      </h1>
    </div>
  );
}
