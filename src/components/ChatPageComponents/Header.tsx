import ActionButtons from "./headerComponents/ActionButtons";
import UserInfo from "./headerComponents/UserInfo";

export default function Header({
  name,
  state,
  avatar,
}: {
  name: string;
  state: boolean;
  avatar: string;
}) {
  return (
    <header className="h-fit w-full flex items-center px-6 py-3 bg-zaajel-primary text-white shadow-md justify-between">
      {/* User Info */}
      <UserInfo name={name} state={state} avatar={avatar} />
      {/* Action Buttons */}
      <ActionButtons />
    </header>
  );
}
