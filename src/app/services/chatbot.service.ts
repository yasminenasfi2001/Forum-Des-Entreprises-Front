import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:8075/bot/chat';
  constructor(private http: HttpClient) { }
  chat(prompt: string): Observable<string> {
      return this.http.get<string>(`${this.apiUrl}?prompt=${prompt}`);
  }
}
