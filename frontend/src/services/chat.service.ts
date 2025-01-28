
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { LangChainService } from './langchain.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private conversationSubject = new BehaviorSubject<MessageModel[]>([]);
  public conversation$ = this.conversationSubject.asObservable();
  public isLoading = new Subject<boolean>(false);
  public error = new Subject<string | null>(null);

  constructor(private langChainService: LangChainService) { }

  loadHistory(): void {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      this.conversationSubject.next(JSON.parse(savedHistory));
    }
  }

  sendMessage(messageText: string): void {
    this.isLoading.next(true);
    this.error.next(null);

    const userMessage = new MessageModel(messageText, 'user');
    this.addMessageToHistory(userMessage);

    this.langChainService.generateResponse(userMessage.text)
      .subscribe({
        next: (response: string) => {
          const botMessage = new MessageModel(response, 'bot');
          this.addMessageToHistory(botMessage);
          this.isLoading.next(false);
        },
        error: (err: any) => {
          this.error.next('Failed to get response from LangChain');
          this.isLoading.next(false);
        }
      });
  }

  private addMessageToHistory(message: MessageModel): void {
    const currentHistory = this.conversationSubject.getValue();
    this.conversationSubject.next([...currentHistory, message]);
    localStorage.setItem('chatHistory', JSON.stringify([...currentHistory, message]));
  }
}
      