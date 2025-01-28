
        import { Component, Input } from '@angular/core';
        import { MessageModel } from '../../models/message.model';

        @Component({
          selector: 'app-message-bubble',
          templateUrl: './message-bubble.component.html',
          styleUrls: ['./message-bubble.component.scss']
        })
        export class MessageBubbleComponent {
          @Input() message: MessageModel;
        }
      