
        import { Injectable } from '@angular/core';
        import { HttpClient, HttpHeaders } from '@angular/common/http';
        import { environment } from '../../environments/environment';
        import { Observable, catchError } from 'rxjs';

        @Injectable({
          providedIn: 'root'
        })
        export class LangChainService {
          private headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${environment.langChainApiKey}`
          });

          constructor(private http: HttpClient) { }

          createChatCompletion(prompt: string): Observable<string> {
            const body = {
              model: environment.langChainModel || 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'user',
                  content: prompt
                }
              ]
            };

            return this.http.post<string>(
              `${environment.langChainBaseUrl || 'https://api.langchain.dev/http'}`,
              body,
              { headers: this.headers }
            ).pipe(
              catchError(error => {
                console.error('LangChain API error:', error);
                throw error;
              })
            );
          }
        }
      