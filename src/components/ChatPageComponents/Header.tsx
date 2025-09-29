import ActionButtons from "./headerComponents/ActionButtons";
import UserInfo from "./headerComponents/UserInfo";

export default function Header({
  name,
  state,
  avatar,
  setInChat
}: {
  name: string;
  state: boolean;
  avatar: string;
  setInChat: VoidFunction
}) {
  return (
    <header className="h-fit w-full flex items-center px-6 py-3 bg-zaajel-primary text-white shadow-md justify-between">
      {/* User Info */}
      <UserInfo setInChat={setInChat} name={name} state={state} avatar={avatar} />
      {/* Action Buttons */}
      <ActionButtons />
    </header>
  );
}
