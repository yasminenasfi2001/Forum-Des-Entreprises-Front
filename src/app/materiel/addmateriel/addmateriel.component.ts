import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MaterielService} from 'src/app/services/materiel.service';

@Component({
  selector: 'app-addmateriel',
  templateUrl: './addmateriel.component.html',
  styleUrls: ['./addmateriel.component.css']
})
export class AddmaterielComponent implements OnInit {
  constructor(
    private service: MaterielService,
    private router: Router,
  ) {
  }

  packs = ['visioconference', 'interactif', 'branding', 'animation', 'documentation'];
  fournisseur: any = {}

  ngOnInit(): void {
  }

  ajouter(): void {
    this.service.addMateriel(this.fournisseur).subscribe(
      data => {
        this.navigate();
      }
    );
  }
  navigate() {
    this.router.navigate(['materiels'])
  }
}
