import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OffreService } from "../../services/offre.service";
import { Offre } from "../../models/offre.model";

@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent implements OnInit {
  id: any;
  offre: any;
  //offre: Offre = new Offre();

  formErrors: any = {};

  constructor(private offreService: OffreService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idOffre'];
    this.offreService.getOffre(this.id).subscribe(
      data => {
        this.offre  =data;
        console.log(this.offre.intitule);
      }
    )
  }

  update(): void {
    if (this.isFormValid()) {
      this.offreService.modifOffre(this.offre).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }
  isFormValid(): boolean {
    this.formErrors = {};
    if (this.offre.intitule && this.offre.intitule.length < 10) {
      this.formErrors.intitule = 'Minimum 10 caractères requis.';
    }
    return Object.keys(this.formErrors).length === 0;
  }
}
