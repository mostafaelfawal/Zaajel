import type { Timestamp } from "firebase/firestore";

export type ChatMessage = {
  from: string;
  to: string;
  title: string;
  createdAt: Timestamp;
  Fseen: boolean;
  Tseen: boolean;
};
