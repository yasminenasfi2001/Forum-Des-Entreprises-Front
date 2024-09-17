import { Component, OnInit,Renderer2 } from '@angular/core';
import { CandidatureService } from "../../services/candidature.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { Review } from "../../models/review.model";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  review:Review={
    nbS:0
  }

  constructor(private storageService:StorageService,private reviewService:ReviewService,private renderer: Renderer2,private condidatureService: CandidatureService, private aroute: ActivatedRoute, private tokenStorageService: StorageService, private router: Router) {

  }
  id: any;
  cand: any;
  rev:any;
  ngOnInit(): void {


    this.aroute.params.subscribe(data => {
      this.id = this.aroute.snapshot.params['idCandidature'];
    })
    this.condidatureService.getByCandidatureId(this.id).subscribe(
      data => {
        this.cand = data;
        if (this.cand.status === 'Traitee') {
          this.generateSharedRoomLink();
        }
        this.reviewService.displayMyReview(this.storageService.getUser().id,this.cand.offre.idOffre).subscribe(
          data2=>{
            this.rev=data2;
          }
        )
      }
    )
  }

  protected readonly status = status;

  value:any;

  handleRatingClick(event: MouseEvent) {
     this.review.nbS = parseInt((event.target as HTMLInputElement).value, 10);
      this.reviewService.addReview(this.storageService.getUser().id,this.review,this.cand.offre.idOffre).subscribe(
        data => {
          console.log(data);},
        error => {
          console.error("Error adding review:", error);
        }

      )
  }
  calculateStarDisplay(): number {
    return Math.round(this.rev?.nbS * 2) / 2;
  }
  sharedRoomLink: any;
  protected readonly Math = Math;
  generateSharedRoomLink(): void {
    const roomName = "Entretien" + this.id;
    this.sharedRoomLink = "https://meet.jit.si/" + roomName;
  }

  // Méthode pour rediriger vers la salle de réunion partagée
  goToSharedRoom() {
    if (this.sharedRoomLink) {
      window.open(this.sharedRoomLink, "_blank"); // Ouvrir le lien dans un nouvel onglet
    }
  }
}
