
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { tap, catchError } from 'rxjs/operators';
import { LangChainService } from './langchain.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  
  constructor(private langChainService: LangChainService) {}

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }

  addMessage(message: Message): void {
    const currentMessages = this.messages$.getValue();
    this.messages$.next([...currentMessages, message]);
  }

  sendMessage(userMessage: string): Observable<Message> {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isBot: false,
      timestamp: new Date()
    };

    this.addMessage(newMessage);

    return this.langChainService.getResponse(userMessage).pipe(
      tap((response: Message) => {
        this.addMessage(response);
      }),
      catchError(error => {
        console.error('Error in chat service:', error);
        return [];
      })
    );
  }
}
      