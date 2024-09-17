import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feedback} from "../models/feedback.model";
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>("http://localhost:8075/api/auth/getAllF");
  }
}
