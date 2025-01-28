
import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  message = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
      