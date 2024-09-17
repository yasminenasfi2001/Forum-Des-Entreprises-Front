import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Offre} from "../models/offre.model";
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})

export class OffreService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Offre[]> {
    return this.http.get<Offre[]>('http://localhost:8075/api/v1/auth/getAllO' );
  }

  getMyAll(id:any): Observable<Offre[]> {
    return this.http.get<Offre[]>("http://localhost:8075/api/v1/auth/getMyOffres/" + id);
  }
  addOffre(idUser:any,data:any,idSession:any):Observable<any>{
    return this.http.post("http://localhost:8075/api/v1/auth/addOffreAndAssignToUserAndToSession/" +idUser + "/" + idSession,data);
  }
  modifOffre(data:any):Observable<any>{
    return this.http.put("http://localhost:8075/api/v1/auth/modifierOffre",data);
  }
  getOffre(idOffre:any): Observable<Offre[]> {
    return this.http.get<Offre[]>("http://localhost:8075/api/v1/auth/getOffre/" + idOffre);
  }
  deleteOffre(idOffre:any):Observable<any>{
    return this.http.delete('http://localhost:8075/api/v1/auth/supprimerOffre/' + idOffre)
  }
  public parseCsvFileFromUrl(filePath: string): Observable<any> {
    return new Observable((observer) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (result) => {
          observer.next(result.data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }
}
