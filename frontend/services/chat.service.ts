
        import { Injectable } from '@angular/core';
        import { Observable, Subject, tap, catchError, map } from 'rxjs';
        import { MessageModel } from '../models/message.model';
        import { LangChainService } from './langchain.service';
        import { ChatContext } from '../types/chat.types';

        @Injectable({
          providedIn: 'root'
        })
        export class ChatService {
          private messagesSubject = new Subject<MessageModel[]>();
          private isLoadingSubject = new Subject<boolean>();
          private errorSubject = new Subject<string | null>();

          messages$ = this.messagesSubject.asObservable();
          isLoading$ = this.isLoadingSubject.asObservable();
          error$ = this.errorSubject.asObservable();

          constructor(private langChainService: LangChainService) { }

          addMessage(message: string): void {
            const userMessage = MessageModel.createFromUser(message);
            this.messagesSubject.next([...this.messagesSubject.getValue(), userMessage]);
            
            this.isLoadingSubject.next(true);
            this.errorSubject.next(null);

            this.langChainService
              .createChatCompletion(userMessage.content)
              .pipe(
                map((response: string) => {
                  const botMessage = MessageModel.createFromResponse(response);
                  return [...this.messagesSubject.getValue(), botMessage];
                }),
                tap({
                  next: (messages) => {
                    this.messagesSubject.next(messages);
                    this.isLoadingSubject.next(false);
                  },
                  error: (error) => {
                    this.isLoadingSubject.next(false);
                    this.errorSubject.next(error.message);
                  }
                })
              )
              .subscribe();
          }
        }
      