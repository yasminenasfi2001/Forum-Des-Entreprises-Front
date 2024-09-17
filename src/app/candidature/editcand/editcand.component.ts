import { Component, OnInit } from '@angular/core';
import { OffreService } from "../../services/offre.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CandidatureService } from "../../services/candidature.service";
import { StorageService } from "../../services/storage.service";
import {checkCommonJSModules} from "@angular-devkit/build-angular/src/builders/browser-esbuild/commonjs-checker";
import {Candidature} from "../../models/candidature.model";

@Component({
  selector: 'app-editcand',
  templateUrl: './editcand.component.html',
  styleUrls: ['./editcand.component.css']
})
export class EditcandComponent implements OnInit {
  id: any;
  cand: any;
  cand1: any;
  connectedRole: any;
  offre: any;
  candidaturess: any;
  nombreCandidaturesAcceptees: any;
  placesDispo: any;

  constructor(private storageService: StorageService, private candidatureService: CandidatureService,
              private router: Router, public route: ActivatedRoute, private offreService: OffreService) { }

  ngOnInit(): void {
    this.connectedRole = this.storageService.getUser().role;
    this.id = this.route.snapshot.params['idCandidature'];
    this.candidatureService.getByCandidatureId(this.id).subscribe(
      data => {
        this.cand = data;
        this.cand1 = data;
        this.offreService.getOffre(this.cand.offre.idOffre).subscribe(
          offreData => {
            this.offre = offreData;
            this.candidatureService.getNombreCandidaturesAcceptees(this.cand.offre.idOffre).subscribe(
              nbCandidaturesAcceptees => {
                this.nombreCandidaturesAcceptees = nbCandidaturesAcceptees;
                this.placesDispo = this.offre.nbPlaces - this.nombreCandidaturesAcceptees;
                console.log("Nombre de places disponibles :", this.placesDispo);
              },
              error => {
                console.error("Erreur lors de la récupération du nombre de candidatures acceptées :", error);
              }
            );
          },
          error => {
            console.error("Erreur lors de la récupération de l'offre :", error);
          }
        );
      },
      error => {
        console.error("Erreur lors de la récupération de la candidature :", error);
      }
    );
    this.candidatureService.getByCandidatureByIdOffre(this.id).subscribe(
      response => {
        this.candidaturess = response.candidatures;
        console.log("Candidatures associées à l'offre :", this.candidaturess);
      },
      error => {
        console.error("Erreur lors de la récupération des autres candidatures associées à l'offre :", error);
      }
    );
  }

  update() {
    this.candidatureService.editCandidature(this.cand).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    this.router.navigate(['mescandidatures']);
  }

  update1() {
    if (this.placesDispo === 0) {
      console.log("Impossible de modifier : le nombre de places disponibles est épuisé.");
      if (this.cand1.status == 'Refusee') {
        this.cand1.datedeRefus = new Date();
        this.cand1.dateDAcceptance = null;

        this.candidatureService.editCandidature(this.cand1).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      return;
    }
    if (this.cand1.status === 'Traitee') {
      this.cand1.dateDeMiseEnTrt = new Date();
      this.cand1.datedeRefus = null;
      this.cand1.dateDAcceptance = null;

      const roomName = "shared-room-" + Math.random().toString(36).substring(7);
      this.cand1.meetLink = "https://meet.jit.si/" + roomName;

    } else if (this.cand1.status === 'Refusee') {
      this.cand1.datedeRefus = new Date();
      this.cand1.dateDAcceptance = null;
    } else if (this.cand1.status === 'Acceptee') {
      this.cand1.datedeRefus = null;
      this.cand1.dateDAcceptance = new Date();

    }
    this.candidatureService.editCandidature(this.cand1).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showRemarque = false;

  onStatusChange() {
    this.showRemarque = this.cand1.status === 'Refusee';
  }
}
