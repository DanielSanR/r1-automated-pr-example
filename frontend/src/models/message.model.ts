
export class MessageModel implements Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;

  constructor(text: string, sender: 'user' | 'bot') {
    this.id = Math.random().toString(36).substr(2, 9);
    this.text = text;
    this.sender = sender;
    this.timestamp = new Date();
  }
}
      