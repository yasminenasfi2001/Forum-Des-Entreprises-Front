import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  getSession(){
    return this.http.get('http://localhost:8075/getAll')
  }
  updateSession(id:any,user:any){

    return this.http.put('http://localhost:8075/update/'+id,user)
  }

  addSession(user:any){
    return this.http.post('http://localhost:8075/add',user)
  }


  deleteSession(id:any){

    return this.http.delete('http://localhost:8075/delete/'+id)
  }

  sessionDetails(id:any){

    return this.http.get('http://localhost:8075/session/'+id)
  }

  assignMaterialToSession(idSession: number, pack: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8075/${idSession}/assign-material?pack=${pack}`, {});
  }
}
