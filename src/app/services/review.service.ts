import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  addReview(idUser:any,data:any,idOffre:any):Observable<any>{
    return this.http.post("http://localhost:8075/api/v1/auth/addReviewAndAssignToUserAndToOffre/" +idUser + "/" + idOffre,data);
  }
  displayMyReview(idUser:any,idOffre:any):Observable<any>{
    return this.http.get("http://localhost:8075/api/v1/auth/reviews/" +idOffre + "/" + idUser);
  }
}
