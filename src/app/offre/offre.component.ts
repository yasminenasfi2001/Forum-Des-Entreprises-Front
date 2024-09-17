import {Component, OnInit} from '@angular/core';
import {OffreService} from "../services/offre.service";
import {Router} from "@angular/router";
import { PagingConfig } from '../models/paging-config.model';
import {Offre} from "../models/offre.model";
import {StorageService} from "../services/storage.service";
import {add} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit{


  filteredOffers: Offre[] = [];
  filterText: string = '';
  constructor(private offreService:OffreService,private router:Router,private tokenStorageService:StorageService){
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  ToShow:Offre[]=[];
  currentPage:number  = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;



  pagingConfig: PagingConfig = {} as PagingConfig;
  sortOffersByAverageReview() {
    this.filteredOffers.sort((a: any, b: any) => {
      return b.averageReview - a.averageReview; // Trie en ordre décroissant
    });
  }

  loadOffres() {
    this.offreService.getAll().subscribe(
      (data: any[]) => {
        this.ToShow = data;
        this.filteredOffers = this.ToShow;
        this.filteredOffers.forEach((offre: any) => {
          let totalReviews = 0;
          offre.reviews.forEach((review: any) => {
            totalReviews += review.nbS;
          });
          if (offre.reviews.length > 0) {
            offre.averageReview = totalReviews / offre.reviews.length;
          } else {
            offre.averageReview = 0; // ou une valeur par défaut si aucun avis n'est disponible
          }
        });
        this.sortOffers()
        this.sortOffersByAverageReview();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  sortOffers() {
    this.filteredOffers.sort((a, b) => {
      // Step 1: Sort by number of reviews
      const reviewsComparison = b.reviews.length - a.reviews.length;
      if (reviewsComparison !== 0) {
        return reviewsComparison;
      }

      // Step 2: Sort by average review
      if (a.averageReview !== undefined && b.averageReview !== undefined) {
        if (a.averageReview < b.averageReview) {
          return 1;
        } else if (a.averageReview > b.averageReview) {
          return -1;
        }
      } else if (a.averageReview === undefined && b.averageReview !== undefined) {
        return 1;
      } else if (a.averageReview !== undefined && b.averageReview === undefined) {
        return -1;
      }

      // Step 3: Sort by number of places
      const placesComparison = (b.nbPlaces || 0) - (a.nbPlaces || 0);
      if (placesComparison !== 0) {
        return placesComparison;
      }

      // Step 4: Sort by date of creation
      const dateA = a.dateDeCreation ? new Date(a.dateDeCreation) : null;
      const dateB = b.dateDeCreation ? new Date(b.dateDeCreation) : null;
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      } else if (dateA === null && dateB !== null) {
        return 1;
      } else if (dateA !== null && dateB === null) {
        return -1;
      }

      return 0; // If all criteria are the same
    });
  }


  calculateStarDisplay(x:any): number {
    return Math.round(x * 2) / 2;
  }
  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.loadOffres();
  }



  roleConnected:any;
  ngOnInit(): void {

    this.loadOffres();
    this.roleConnected = this.tokenStorageService.getUser().role
  }
   /* goToAdd(){
      this.router.navigate(['addoffre']);
    }*/
  edit(idOffre: any) {
    this.router.navigate(['modifoff/' + idOffre]);
  }
  delete(idOffre: any) {
    this.offreService.deleteOffre(idOffre).subscribe(
        data=>{
          window.location.reload();
        }
        )
  }
  detailsAdmin(idOffre:any){
    this.router.navigate(['detailsoffre/' + idOffre]);
  }
  filterOffers() {
    this.filteredOffers = this.ToShow.filter(offer =>
      offer.intitule && offer.intitule.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }


  detailsEtudiant(idOffre:any){
    this.router.navigate(['detailsoffree/' + idOffre]);
  }
  postuler(idOffre:any){
    this.router.navigate(['postuler/' + idOffre]);
  }


  protected readonly add = add;


  wishlistKey = 'wishlist';

  isInWishlist(offer: any): boolean {
    const wishlist = JSON.parse(sessionStorage.getItem(this.wishlistKey) || '[]');
    return wishlist.some((item: any) => item.idOffre === offer.idOffre);
  }
  addToWishlist(offer: any): void {
    let wishlist = JSON.parse(sessionStorage.getItem(this.wishlistKey) || '[]');
    const index = wishlist.findIndex((item: any) => item.idOffre === offer.idOffre);

    if (index === -1) {
      wishlist.push(offer);
    } else {
      wishlist.splice(index, 1);
    }
    sessionStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }

  protected readonly Math = Math;
}
