import {Component, OnInit} from '@angular/core';
import {MaterielService} from '../services/materiel.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {
  intitule: any;
  totalSelectedPrice: number = 0;
  qrCodeUrls: { [id: number]: string } = {};

  constructor(
    private service: MaterielService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  fournisseurs: any = {};
  textBus = '';

  ngOnInit(): void {
    this.service.getMateriel().subscribe((data) => {
      this.fournisseurs = data;
      this.calculateTotalPrice();
      this.generateQRCodeForFournisseurs();
    });
  }

  async generateQRCodeForFournisseurs(): Promise<void> {
    for (const fournisseur of this.fournisseurs) {
      const details = {
        id: fournisseur.id,
        intitule: fournisseur.intitule,
        prix: fournisseur.prix,
      };

      try {
        const url = await QRCode.toDataURL(JSON.stringify(details));
        this.qrCodeUrls[fournisseur.id] = url;
      } catch (error) {
        console.error(
          'Erreur lors de la génération du code QR pour le fournisseur',
          fournisseur.id,
          ':',
          error
        );
      }
    }
  }

  // Méthode pour calculer le totalSelectedPrice
  calculateTotalPrice() {
    this.totalSelectedPrice = this.fournisseurs.reduce(
      (total: number, fournisseur: any) => {
        return total + fournisseur.prix; // Supposant que le prix est stocké dans une propriété 'prix'
      },
      0
    );
  }


  // Méthode pour supprimer une session
  deleteSession(id: any) {
    this.service.deleteMateriel(id).subscribe(
      (res) => {
        // Traitez la réponse en conséquence
        console.log('Session supprimée avec succès');
      },
      (error) => console.log(error)
    );
  }

  // Méthode pour supprimer un fournisseur
  delete(i: any) {
    this.fournisseurs.splice(i, 1);
  }

  // Méthode pour modifier un fournisseur
  modify(id: any) {
    this.router.navigate(['update-mat', id]);
  }

  // Méthode pour rechercher
  Search() {
    if (this.intitule == '') {
      this.ngOnInit();
    } else {
      this.fournisseurs = this.fournisseurs.filter(
        (res: { intitule: string }) => {
          return res.intitule
            .toLocaleLowerCase()
            .match(this.intitule.toLocaleLowerCase());
        }
      );
    }
  }

  // Méthode pour afficher/masquer la barre latérale
  toggleSidebar() {
    let sidebar: any = document.querySelector('.sidebar');
    let btn: any = document.querySelector('#btn');
    sidebar.classList.toggle('active');
    if (btn.classList.contains('bx-menu')) {
      btn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      btn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }

  // Méthode pour effectuer le paiement


}
