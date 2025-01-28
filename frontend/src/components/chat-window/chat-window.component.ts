
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnDestroy {
  messages: MessageModel[] = [];
  isLoading = false;
  error = '';
  private subscriptions: Subscription[] = [];

  constructor(private chatService: ChatService) {
    this.subscriptions.push(
      this.chatService.conversation$.subscribe(messages => {
        this.messages = messages;
      }),
      this.chatService.isLoading.subscribe(loading => {
        this.isLoading = loading;
      }),
      this.chatService.error.subscribe(err => {
        this.error = err || '';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
      