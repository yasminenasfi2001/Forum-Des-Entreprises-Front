import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {Candidature} from "../models/candidature.model";
import {CandidatureService} from "../services/candidature.service";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit{
  filteredCandidatures: Candidature[] = [];
  searchText: string = '';

  constructor(private candidatureServce:CandidatureService,private router:Router,private tokenStorageService:StorageService){}
  ToShow:Candidature[]=[];
  loadCandidatures() {
    this.candidatureServce.getAll().subscribe(
      (data) => {
        this.ToShow = data;
        this.filteredCandidatures = this.ToShow;
      }

    );
  }
  ngOnInit(): void {
    this.loadCandidatures();
  }
  downloadLettreMotivation(candidature: any): void {
    const nomCandidat = candidature.user.username;
    const nomFichier = `${nomCandidat}_lettre_motivation.png`;
    const link = document.createElement('a');
    link.href = candidature.lettreDeMotivation;
    link.download = nomFichier;
    link.click();
  }
  filterCandidatures() {
    this.filteredCandidatures = this.ToShow.filter(
      (candidature) =>
        candidature.user?.username
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }
}
