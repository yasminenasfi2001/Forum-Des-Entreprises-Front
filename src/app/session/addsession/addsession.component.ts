import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services/session.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {EmailRequest} from "../../models/EmailRequest";

@Component({
  selector: 'app-addsession',
  templateUrl: './addsession.component.html',
  styleUrls: ['./addsession.component.css'],
})
export class AddsessionComponent implements OnInit {
  captchaValue: string = '';
  enteredCaptcha: string = '';
  captchaGenerated: boolean = false;

  constructor(
    private service: SessionService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  packs = [
    'visioconference',
    'interactif',
    'branding',
    'animation',
    'documentation',
  ];

  fournisseur: any = {dateSession: null};

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const possibleCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }
    this.captchaValue = captcha;
    this.captchaGenerated = true;
  }

  ajouter(): void {
    if (this.enteredCaptcha === this.captchaValue) {
      this.service.addSession(this.fournisseur).subscribe((session: any) => {
        this.assignMaterial(session.idSession, this.fournisseur.pack);
        this.navigate();
      });
    } else {
      this.toastr.error('Le captcha est incorrect.', 'Erreur');
    }
  }

  navigate() {
    this.router.navigate(['sessiona']);
  }

  assignMaterial(idSession: number, pack: string) {
    this.service
      .assignMaterialToSession(idSession, pack)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
