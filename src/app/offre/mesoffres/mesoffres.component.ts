import {Component, OnInit} from '@angular/core';
import {Offre} from "../../models/offre.model";
import {OffreService} from "../../services/offre.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mesoffres',
  templateUrl: './mesoffres.component.html',
  styleUrls: ['./mesoffres.component.css']
})
export class MesoffresComponent implements OnInit{
  constructor(private offreService:OffreService,private tokenStorageService:StorageService,private router:Router){}
  ToShow:Offre[]=[];
  loadMesOffres() {
    this.offreService.getMyAll(this.tokenStorageService.getUser().id).subscribe(
        (data) => {
          this.ToShow = data;
        }
    );
  }
  ngOnInit(): void {
    this.loadMesOffres();
  }

  edit(idOffre: any) {
    this.router.navigate(['modifoff/' + idOffre]);
  }
  delete(idOffre: any) {
    this.offreService.deleteOffre(idOffre).subscribe(
        data=>{
          window.location.reload();
        }
    )
  }
  details(idOffre:any){
    this.router.navigate(['detailsoffre/' + idOffre]);
  }


}
