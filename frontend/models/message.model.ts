
        import { Message } from '../types/chat.types';

        export class MessageModel {
          constructor(
    public id: string,
    public content: string,
    public timestamp: Date,
    public isUser: boolean
          ) {}

          static createFromResponse(content: string): MessageModel {
            return new MessageModel(
              Math.random().toString(36).substr(2, 9),
              content,
              new Date(),
              false
            );
          }

          static createFromUser(content: string): MessageModel {
            return new MessageModel(
              Math.random().toString(36).substr(2, 9),
              content,
              new Date(),
              true
            );
          }
        }
      