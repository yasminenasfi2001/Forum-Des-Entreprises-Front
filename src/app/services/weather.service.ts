import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '5b491eb9b69dd529d5cb765278c52609'; // Replace this with your actual API key

  constructor(private http: HttpClient) { }

  getWeather(): Observable<any> {
    const url = `${this.apiUrl}?q=Tunisia&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get(url);
  }

}
