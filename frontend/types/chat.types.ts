
        export interface Message {
          id: string;
          content: string;
          timestamp: Date;
          isUser: boolean;
        }

        export interface ChatContext {
          messages: Message[];
          isLoading: boolean;
          error: string | null;
          currentMessage: string;
        }
      