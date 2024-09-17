import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../../services/candidature.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {Candidature} from "../../models/candidature.model";

@Component({
  selector: 'app-mescandidatures',
  templateUrl: './mescandidatures.component.html',
  styleUrls: ['./mescandidatures.component.css']
})
export class MescandidaturesComponent implements OnInit{
  ToShow: Candidature[] = [];
  constructor(private condidatureService:CandidatureService,private aroute: ActivatedRoute,private tokenStorageService: StorageService,private router:Router) {}
  ngOnInit(): void {
    this.loadCandidatures()
  }
  loadCandidatures() {
    this.condidatureService.getCandidaturesForUser(this.tokenStorageService.getUser().id).subscribe(
      (data) => {
        this.ToShow = data;
        console.log(data)
      }

    );
  }
  goToWorkflow(idCandidature:any){
    this.router.navigate(['workflow/' + idCandidature]);
  }
  editMyCand(idCandidature:any){
    this.router.navigate(['editcand/' + idCandidature]);
  }

}
