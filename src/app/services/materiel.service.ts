import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  constructor(private http: HttpClient) { }
  getMateriel(){
    return this.http.get('http://localhost:8075/materiels/getAll')
  }
  updateMateriel(id:any,user:any){

    return this.http.put('http://localhost:8075/materiels/update/'+id,user)
  }

  addMateriel(user:any){
    return this.http.post('http://localhost:8075/materiels/add',user)
  }


  deleteMateriel(id:any){

    return this.http.delete('http://localhost:8075/materiels/delete/'+id)
  }

  materielDetails(id:any){

    return this.http.get('http://localhost:8075/materiels/get/'+id)
  }

}
