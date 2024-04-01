import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl: string = 'http://localhost:3001/openaiAssistant/sendMessage';

  constructor(private http: HttpClient) { }

  async getBotResponse(messageContent: string): Promise<string[]> {
    const params = new HttpParams().set('messageContent', messageContent);
    const response = await lastValueFrom(
      this.http.get<{ messageArray: string[] }>(this.apiUrl, { params })
    );
    return response.messageArray;
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class OpenaiService {
//   private apiUrl: string = 'http://localhost:3001/openaiAssistant/sendMessage';

//   constructor(private http: HttpClient) { }

//   sendMessage(messageContent: string): Observable<{ messageArray: string[] }> {
//     const params = new HttpParams().set('messageContent', messageContent);
//     return this.http.get<{ messageArray: string[] }>(this.apiUrl, { params });
//   }
// }


