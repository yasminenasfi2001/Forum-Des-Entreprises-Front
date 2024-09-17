import {Component, OnInit} from '@angular/core';
import {Candidature} from "../../models/candidature.model";
import {CandidatureService} from "../../services/candidature.service";
import {StorageService} from "../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../models/status.enum";
import {OffreService} from "../../services/offre.service";
import {Offre} from "../../models/offre.model";
import {WebSocketService} from "../../services/web-socket.service";

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit{
  id:any;
  To=new Offre();
  ngOnInit() {
    this.aroute.params.subscribe(params => {
      this.id = params['idOffre'];
      this.loadOffre(this.id);
      this.loadOffreAndCalculatePlacesDispo()
    });
  }
  loadOffre(id: any) {
    this.offreService.getOffre(id).subscribe(
      (data: Offre | Offre[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.To = data[0];
          console.log(this.To)
          console.log(this.To.user?.id);
          this.calculatePlacesDispo();
        } else if (!Array.isArray(data)) {
          this.To = data as Offre;
          console.log(this.To)
          console.log(this.To.user?.id);
          this.calculatePlacesDispo();
        } else {
          console.error("Empty or invalid data returned from getOffre");
        }
      },
      error => {
        console.error("Error fetching Offre:", error);
      }
    );
  }

  loadOffreAndCalculatePlacesDispo() {
    this.offreService.getOffre(this.id).subscribe(
      offreData => {
        this.offre = offreData;
        this.calculatePlacesDispo();
      },
      error => {
        console.error("Erreur lors de la récupération de l'offre :", error);
      }
    );
  }
  calculatePlacesDispo() {
    this.candidatureService.getNombreCandidaturesAcceptees(this.id).subscribe(
      nbCandidaturesAcceptees => {

        this.placesDispo = this.offre.nbPlaces - nbCandidaturesAcceptees;
        console.log("Nombre de places disponibles :", this.placesDispo);
      },
      error => {
        console.error("Erreur lors de la récupération du nombre de candidatures acceptées :", error);
      }
    );
  }

  constructor(private webSocketService:WebSocketService,private offreService:OffreService,private router:Router,private aroute: ActivatedRoute,private tokenStorageService:StorageService,private candidatureService:CandidatureService) {
    this.webSocketService.connect();

  }
  candidature: Candidature = {
    experience: '',
    competence: '',
    dateDeCandidature: new Date(),
    langues:'',
    formation: '',
    status:Status.Encours,
    lettreDeMotivation: ''
  };
  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (this.candidature) {
          this.candidature.lettreDeMotivation = '/assets/' + file.name;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  save(): void {
    this.candidature.competence = this.selectedCompetences.join(',');
    this.candidature.langues = this.selectedLangues.join(',');
    this.onFileChange(event);

   this.candidatureService.addCondidatureToUseretToOffre(this.tokenStorageService.getUser().id, this.id,this.candidature).subscribe(
      data => {
        console.log(data);
        const notificationMessage = {
          userId: this.To.user?.id,
          message: 'New application received for your offer'
        };
        this.webSocketService.sendMessageToCandiatureOwner(notificationMessage);
        //this.router.navigate(['mescandidatures']);
      },
      error => {
        console.error("Error adding postulation:", error);
      }
    );

  }
  availableCompetences: string[] = ['JavaScript', 'Angular', 'HTML', 'CSS', 'Node.js'];
  availableLangues: string[] = ['Français', 'Anglais', 'Espagnol', 'Allemand'];
  selectedCompetences: string[] = [];
  selectedLangues: string[] = [];
  placesDispo: any;
  offre: any;
  newCompetence: string = ''; // Nouvelle compétence saisie par l'utilisateur
  newLangue: string = ''; // Nouvelle langue saisie par l'utilisateur
  addCompetence(competence: string) {
    if (!this.selectedCompetences.includes(competence)) {
      this.selectedCompetences.push(competence);
    }
  }

  removeCompetence(competence: string) {
    const index = this.selectedCompetences.indexOf(competence);
    if (index !== -1) {
      this.selectedCompetences.splice(index, 1);
    }
  }

  addLangue(langue: string) {
    if (!this.selectedLangues.includes(langue)) {
      this.selectedLangues.push(langue);
      console.log("Langues sélectionnées :", this.selectedLangues);
    }
  }

  removeLangue(langue: string) {
    const index = this.selectedLangues.indexOf(langue);
    if (index !== -1) {
      this.selectedLangues.splice(index, 1);
    }
  }
  addNewCompetence(): void {
    if (this.newCompetence && !this.selectedCompetences.includes(this.newCompetence)) {
      this.selectedCompetences.push(this.newCompetence);
      this.newCompetence = ''; // Réinitialiser le champ d'entrée pour la nouvelle compétence
    }
  }

  addNewLangue(): void {
    if (this.newLangue && !this.selectedLangues.includes(this.newLangue)) {
      this.selectedLangues.push(this.newLangue);
      this.newLangue = ''; // Réinitialiser le champ d'entrée pour la nouvelle langue
    }
  }
}
