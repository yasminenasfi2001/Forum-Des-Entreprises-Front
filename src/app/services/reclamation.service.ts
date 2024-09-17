import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reclamation} from "../models/reclamation.model";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>("http://localhost:8075/api/auth/getAllr");
  }

  addReclamation(idUser: any, data: any): Observable<any> {
    return this.http.post("http://localhost:8075/api/auth/addReclamationAndAssignReclamationToUser/" + idUser, data);
  }

  editReclamation(data: any): Observable<any> {
    return this.http.put("http://localhost:8075/api/auth/modifierReclamation", data);
  }

  removeReclamation(idReclamation: any): Observable<any> {
    return this.http.delete('http://localhost:8075/api/auth/supprimerReclamation/' + idReclamation);
  }

  findById(idReclamation: any): Observable<any> {
    return this.http.get("http://localhost:8075/api/auth/getReclamation/" + idReclamation);
  }

  getmyAll(idUser:any): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>("http://localhost:8075/api/auth/getMyRecalamations/" +idUser);
  }

}
