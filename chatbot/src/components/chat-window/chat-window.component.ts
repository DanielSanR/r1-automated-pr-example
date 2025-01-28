
import { Component, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnDestroy {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private chatService: ChatService) {
    this.subscription = this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
      