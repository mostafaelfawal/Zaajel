export default function StateCircle({ state }: { state: boolean }) {
  return (
    <span
      className={`${
        state ? "bg-green-500" : "bg-gray-400"
      } rounded-full w-3.5 h-3.5 absolute bottom-0 right-0 border-2 border-white`}
    ></span>
  );
}
