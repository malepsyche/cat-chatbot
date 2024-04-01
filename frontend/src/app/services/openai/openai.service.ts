// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export interface Message {
//   content: string;
//   from: 'user' | 'bot';
// }

// @Injectable({
//   providedIn: 'root',
// })

// export class OpenaiService {
//   private apiUrl = 'http://localhost:3001/openaiAssistant/sendMessage';
//   private messagesSubject = new BehaviorSubject<Message[]>([]); // Holds the current message list
//   public messages$ = this.messagesSubject.asObservable(); // Exposed as an observable for components to subscribe

//   constructor(private http: HttpClient) { }

//   getMessages(): void {
//     this.http.get<Message[]>(this.apiUrl).subscribe(messages => {
//       this.messagesSubject.next(messages); // Update the BehaviorSubject with the latest messages
//     });
//   }

//   sendMessage(userInput: string): Observable<Message[]> {
//     return this.http.post<Message[]>(this.apiUrl, { content: userInput, from: 'user' }).pipe(
//       tap(messages => {
//         this.messagesSubject.next(messages); // Update the BehaviorSubject with the latest messages including the new one
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private baseUrl: string = 'http://localhost:3001/openaiAssistant/sendMessage?messageContent=';

  constructor(private http: HttpClient) {}

  sendMessage(messageContent: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}${encodeURIComponent(messageContent)}`);
  }
}
