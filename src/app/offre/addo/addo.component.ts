import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offre } from '../../models/offre.model';
import { StorageService } from '../../services/storage.service';
import { OffreService } from '../../services/offre.service';
import {ActivatedRoute, Router} from '@angular/router';
//import Date from "$GLOBAL$";

@Component({
  selector: 'app-addo',
  templateUrl: './addo.component.html',
  styleUrls: ['./addo.component.css'],
})
export class AddoComponent implements OnInit{
  offreForm: FormGroup;
  submitted = false;
  id:any;

  ngOnInit(): void {
    this.aroute.params.subscribe(data =>{
      this.id=this.aroute.snapshot.params['idSession'];
    })
  }

  constructor(
      private router: Router,
      private aroute:ActivatedRoute,
      private offerService: OffreService,
      private tokenStorageService: StorageService,
      private fb: FormBuilder
  ) {
    this.offreForm = this.fb.group({
      intitule: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      nbPlaces: [undefined, Validators.required],
    });
  }

  saveOffre(): void {
    if (this.offreForm.valid) {
      const offre: Offre = {
        description: this.offreForm.value.description,
        intitule: this.offreForm.value.intitule,
        nbPlaces: this.offreForm.value.nbPlaces,
        image:this.tokenStorageService.getUser().image,
        dateDeCreation:new Date()
      };

      this.offerService
          .addOffre(this.tokenStorageService.getUser().id, offre, this.id)
          .subscribe((data) => {
            this.submitted = true;
          });

      this.router.navigate(['mesoffres']);
    } else {

      this.offreForm.markAllAsTouched();
    }
  }

}
