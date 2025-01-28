
export type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

export type ChatHistory = Message[];
      