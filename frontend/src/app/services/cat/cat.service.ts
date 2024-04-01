import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class CatService {
  private apiUrl: string = environment.catApiUrl; 

  constructor(private http: HttpClient) { }

  async getBotResponse(messageContent: string): Promise<string[]> {
    const params = new HttpParams().set('messageContent', messageContent);
    const response = await lastValueFrom(
      this.http.get<{ catArray: any[] }>(this.apiUrl, { params })
    );
    return response.catArray.map(cat => cat.url);
  }
}
