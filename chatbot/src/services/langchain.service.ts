
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Message } from '../models/message.model';
import { LangChain, LLMResult } from 'langchain';
import { OpenAI } from 'langchain-http';

@Injectable({
  providedIn: 'root'
})
export class LangChainService {
  private model: any;

  constructor() {
    this.model = new OpenAI({
      openAI: {
        apiKey: environment.OPENAI_API_KEY,
        model: 'gpt-3.5-turbo'
      }
    });

    this.llm = new LangChain(this.model);
  }

  async getResponse(prompt: string): Promise<Message> {
    try {
      const result: LLMResult = await this.llm.agenerate({
        prompt: prompt,
        maxTokens: 2000
      });

      return {
        id: Date.now().toString(),
        text: result.generations[0][0].text,
        isBot: true,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error in LangChain service:', error);
      return {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
    }
  }
}
      