import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Candidature} from "../models/candidature.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  constructor(private http: HttpClient) {}
  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>("http://localhost:8075/api/auth/getAllC");

  }
  removeCandidature(idCandidature: any): Observable<any> {
    return this.http.delete('http://localhost:8075/api/auth/supprimerCandidature/' + idCandidature);
  }
  getCandidaturesForUser(userId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>("http://localhost:8075/api/auth/getCandidaturesByUserId/" + userId);
  }
  editCandidatureSSt( selectedCandidature: any,idOffre:any,status:any): Observable<any> {
    return this.http.put('http://localhost:8075/api/auth/modifierCandidatureaaa/' +idOffre + '/' + status, selectedCandidature);
  }
  editCandidature( selectedCandidature: any): Observable<any> {
    return this.http.put('http://localhost:8075/api/auth/modifierCandidature' , selectedCandidature);

  }
  getStatusByCandidatureId(idCandidature: any): Observable<any> {
    return this.http.get('http://localhost:8075/api/auth/getStatusByCandidId/' + idCandidature);
  }
  getByCandidatureId(idCandidature: any): Observable<any> {
    return this.http.get('http://localhost:8075/api/auth/getCandidaturesById/' + idCandidature);
  }
  getByCandidatureByIdOffre(idOffre: any): Observable<any> {
    return this.http.get('http://localhost:8075/api/auth/CandidatureByIdOffre/' + idOffre);
  }
  addCondidatureToUseretToOffre(idUser:any,idOffre:any,data:any): Observable<any>{
    return this.http.post('http://localhost:8075/api/auth/addCandidatureAndAssignToOffer/' + idUser + '/' + idOffre,data);
  }
  getNombreCandidaturesAcceptees(idOffre: number): Observable<number> {
    return this.http.get<number>('http://localhost:8075/api/auth/getNombreCandidaturesAcceptees/' + idOffre);
  }
}
