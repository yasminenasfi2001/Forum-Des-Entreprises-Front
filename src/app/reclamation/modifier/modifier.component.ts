import { Component } from '@angular/core';
import { ReclamationService } from "../../services/reclamation.service";
import { ActivatedRoute, Router } from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent {

  constructor(private storageService:StorageService,private reclamationService: ReclamationService, private router: Router, public route: ActivatedRoute) { }
  id: any;
  reclamation: any;
  connctedRole:any;
  ngOnInit(): void {
    this.connctedRole= this.storageService.getUser().role;
    this.id = this.route.snapshot.params['idReclamation'];
    this.reclamationService.findById(this.id).subscribe(
      data => {
        this.reclamation = data;
      }
    )
  }

  saveeditEtud(): void {
    this.reclamationService.editReclamation(this.reclamation).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/mesreclamation']);
      },
      error => {
        console.log(error);
      });
  }
  saveeditExpo(): void {
    this.reclamationService.editReclamation(this.reclamation).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/mesreclamatios']);
        },
        error => {
          console.log(error);
        });
  }
}
