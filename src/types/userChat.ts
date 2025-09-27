export type UserChatType = {
  name: string;
  message: string;
  time: string;
  avatar: string;
  isRead: boolean;
  isActive: boolean;
  openChat?: () => void;
};
