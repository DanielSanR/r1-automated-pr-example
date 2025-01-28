
        import { Component, OnDestroy } from '@angular/core';
        import { ChatService } from '../../services/chat.service';
        import { MessageModel } from '../../models/message.model';
        import { Subscription } from 'rxjs';

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

          constructor(private chatService: ChatService) { }

          ngOnInit(): void {
            this.subscriptions.push(
              this.chatService.messages$.subscribe(messages => this.messages = messages),
              this.chatService.isLoading$.subscribe(loading => this.isLoading = loading),
              this.chatService.error$.subscribe(error => this.error = error)
            );
          }

          ngOnDestroy(): void {
            this.subscriptions.forEach(sub => sub.unsubscribe());
          }

          scrollToBottom(): void {
            window.scroll({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }
        }
      