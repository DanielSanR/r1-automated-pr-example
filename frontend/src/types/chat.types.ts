
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Conversation {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
      