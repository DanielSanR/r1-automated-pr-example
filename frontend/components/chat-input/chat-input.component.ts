
        import { Component } from '@angular/core';
        import { FormControl } from '@angular/forms';
        import { ChatService } from '../../services/chat.service';

        @Component({
          selector: 'app-chat-input',
          templateUrl: './chat-input.component.html',
          styleUrls: ['./chat-input.component.scss']
        })
        export class ChatInputComponent {
          messageControl = new FormControl('', { initialValue: '' });

          constructor(private chatService: ChatService) { }

          sendMessage(): void {
            const message = this.messageControl.value.trim();
            if (message) {
              this.chatService.addMessage(message);
              this.messageControl.setValue('');
            }
          }
        }
      