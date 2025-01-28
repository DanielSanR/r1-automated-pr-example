
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LangChain, LLMResult } from 'langchain';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangChainService {
  private langChain: LangChain;

  constructor() {
    this.langChain = new LangChain({
      model: environment.langChainModel,
      modelApiKey: environment.apiKey,
      modelOptions: {
        maxTokens: 2000,
        temperature: 0.7
      }
    });
  }

  generateResponse(prompt: string): Observable<string> {
    return new Observable(observer => {
      this.langChain.agenerate([prompt])
        .then((response: LLMResult) => {
          observer.next(response.generations[0].text());
          observer.complete();
        })
        .catch(error => {
          observer.error('Failed to generate response');
        });
    });
  }
}
      