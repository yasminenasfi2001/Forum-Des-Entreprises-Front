import { Component } from '@angular/core';
import {Reclamation} from "../../models/reclamation.model";
import {ReclamationService} from "../../services/reclamation.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-mesreclamation',
  templateUrl: './mesreclamation.component.html',
  styleUrls: ['./mesreclamation.component.css']
})
export class MesreclamationComponent {




  ToShow: Reclamation[] = [];

  ngOnInit(): void {
    this.loadReclamations();
    this.roleConnected = this.tokenStorageService.getUser().role;

  }
  roleConnected:any;
  goToAdd() {
    this.router.navigate(['ajouterrec']);
  }

  constructor(private reclamationService: ReclamationService, private router: Router,private tokenStorageService: StorageService) {
  }

  loadReclamations() {
    this.reclamationService.getmyAll(this.tokenStorageService.getUser().id
    ).subscribe(
      (data) => {
        this.ToShow = data;
      }
    );
  }

  delete(idReclamation: any) {
    const confirmDelete = window.confirm('Are you sure you want to delete the reclamation?');

    if (confirmDelete) {
      this.reclamationService.removeReclamation(idReclamation).subscribe(
        data => {
          console.log("Deleted");
          // Update ToShow by removing the item with the specified idReclamation
          this.ToShow = this.ToShow.filter(item => item.idReclamation !== idReclamation);
        },
        error => {
          console.error("Error deleting reclamation:", error);
        }
      );
    }
  }
  modifierEtud(idReclamation: any) {
    const confirmModifier = window.confirm('Are you sure you want to modify this reclamation?');

    if (confirmModifier) {
      this.router.navigate(['modifRec/' + idReclamation]);
    }
  }


  modifierExp(idReclamation: any) {
    const confirmModifier = window.confirm('Are you sure you want to modify this reclamation?');

    if (confirmModifier) {
      this.router.navigate(['modifRecl/' + idReclamation]);
    }
  }
  updateStatus(reclamation: Reclamation) {
    // Update the status in the database
    this.reclamationService.editReclamation(reclamation).subscribe(
      (data) => {
        console.log('Status updated successfully:', data);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
  sortByStatus() {
    this.ToShow.sort((a, b) => {
      // Handle undefined case by considering it greater than any boolean value
      const statusA = a.status !== undefined ? a.status : true;
      const statusB = b.status !== undefined ? b.status : true;

      // Compare the status values
      if (statusA && !statusB) {
        return 1;
      } else if (!statusA && statusB) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}

