import {Component, OnInit} from '@angular/core';
import {OffreService} from "../../services/offre.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {Observable} from "rxjs";
import {CandidatureService} from "../../services/candidature.service";
import {Offre} from "../../models/offre.model";
import {Candidature} from "../../models/candidature.model";
import * as Tesseract from 'tesseract.js';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private condidatureService:CandidatureService,private offreService:OffreService,private aroute: ActivatedRoute,private tokenStorageService: StorageService,private router:Router) { }

  id:any;
  offre:any;
  roleConnected:any;
  candidaturess:Candidature[]=[];

  ngOnInit(): void {

    this.roleConnected = this.tokenStorageService.getUser().role;
    this.aroute.params.subscribe(data =>{
      this.id=this.aroute.snapshot.params['idOffre'];
    })
    this.offreService.getOffre(this.id).subscribe(
        data=>{
            this.offre=data
          console.log(this.offre)
        }
    )
    this.condidatureService.getByCandidatureByIdOffre(this.id).subscribe(
      reponse=>{
        this.candidaturess=reponse
        console.log(this.candidaturess)
      }
    )
  }
  downloadLettreMotivation(candidature: any): void {
    const nomCandidat = candidature.user.username;
    const nomFichier = `${nomCandidat}_lettre_motivation.png`;
    const link = document.createElement('a');
    link.href = candidature.lettreDeMotivation;
    link.download = nomFichier;
    link.click();
  }
  detailsAdmin(idCandidature:any){
    this.router.navigate(['detailscan/' + idCandidature]);
  }
  detailsExposant(idCandidature:any){
    this.router.navigate(['detailscand/' + idCandidature]);
  }
  modifierExposant(idCandidature:any){
    this.router.navigate(['editcandi/' + idCandidature]);
  }
  deleteCand(idCandidature:any){
    this.condidatureService.removeCandidature(idCandidature).subscribe(
      data=>{
        window.location.reload();
      }
    )
  }

}
