import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { StorageService } from '../services/storage.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import {HttpClient} from "@angular/common/http";
import {MaterielService} from "../services/materiel.service";
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  intitule: any;
  roleConnected: any;
  showTodaySessionToast: boolean = false;
  chart: any;

  sess !: any[] ;
  @ViewChild('myChart') myChart!: ElementRef;

  isSessionInFuture(sessionDate: string): boolean {
    const currentDate = new Date();
    const formattedSessionDate = new Date(sessionDate);

    // Compare the current date with the session date
    return formattedSessionDate > currentDate;
  }
  constructor(
    private service: SessionService,
    private service1:MaterielService,
    private router: Router,
    private datePipe: DatePipe,
    private storageService: StorageService,
    private tostr: ToastrService,
    private http: HttpClient
  ) {}
  fournisseurs: any = {};
  textBus = '';
  ngOnInit(): void {
    this.service1.getMateriel().subscribe((data) => {
      this.fournisseurs = data;
      this.calculateTotalPrice();

    });
    this.roleConnected = this.storageService.getUser().role;
    this.service.getSession().subscribe((data:any) => {
      this.fournisseurs = data;
      this.checkSessionsToday();

      //chart
      this.sess = data;

      // Extraire les noms des foyers
      const labels = this.sess.map((s: any) => s.intitule);

      // Extraire les capacités des foyers
      const capacities = this.sess.map((s: any) => s.nbrDePlaces);

      // Créer le graphique avec les données actualisées
      this.createChart(labels, capacities);
    });

  }
  totalSelectedPrice: number = 0;
  calculateTotalPrice() {
    this.totalSelectedPrice = this.fournisseurs.reduce(
      (total: number, fournisseur: any) => {
        return total + fournisseur.prix; // Supposant que le prix est stocké dans une propriété 'prix'
      },
      0
    );
  }

  checkSessionsToday(): void {
    const currentDate = new Date();
    const today = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    this.service.getSession().subscribe((data: any) => {
      // Correction de la récupération des données
      // Assurez-vous que data est un tableau d'objets avec une propriété 'dateSession'
      data.forEach((session: any) => {
        const sessionDate = this.datePipe.transform(
          session.dateSession,
          'yyyy-MM-dd'
        );
        if (sessionDate === today) {
          this.showTodaySessionToast = true;
          this.tostr.info(
            `La session "${session.intitule}" est ouverte aujourd'hui`,
            "Session Aujourd'hui"
          );
          return;
        }
      });
    });
  }
  deleteSession(id: any) {
    this.service.deleteSession(id).subscribe(
      (res) => {
        this.fournisseurs;
      },
      (error) => console.log(error)
    );
  }

  delete(i: any) {
    this.fournisseurs.splice(i, 1);
  }

  modify(id: any) {
    this.router.navigate(['update-sess', id]);
  }
  isDatePassed(sessionDate: Date): boolean {
    const currentDate = new Date();
    return sessionDate < currentDate;
  }

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

  function() {
    let btn: any = document.querySelector('#btn');
    let sidebar: any = document.querySelector('.sidebar');
    let searchBtn = document.querySelector('.bx-search');

    sidebar.classList.toggle('active');
    if (btn.classList.contains('bx-menu')) {
      btn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      btn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
  ajouteroffre(idSession: any) {
    this.router.navigate(['addoffre/' + idSession]);
  }


  createChart(labels: string[], data: number[]) {
    const ctx = this.myChart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombres de places',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5,
        }],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
          },
        },
      },
    });
  }
  boutonVertClique = false;
  cliqueBoutonVert() {
    this.boutonVertClique = true;
    console.log('clicked');
    let data: any = {
      receiverWalletId: '661d6dc558953ef7de87704e',
      token: 'TND',
      amount: this.totalSelectedPrice * 1000,
      type: 'immediate',
      description: 'payment description',
      acceptedPaymentMethods: ['wallet', 'bank_card', 'e-DINAR'],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: true,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '22777777',
      email: 'john.doe@gmail.com',
      orderId: '1234657',
      webhook: 'https://merchant.tech/api/notification_payment',
      silentWebhook: true,
      successUrl: 'http://localhost:4200/PayementSuccess',
      failUrl: 'https://dev.konnect.network/gateway/payment-failure',
      theme: 'light',
    };
    console.log(data);
    this.http
      .post(
        'https://api.preprod.konnect.network/api/v2/payments/init-payment',
        data,
        {
          headers: {
            'x-api-key': '661d6dc558953ef7de87704a:tye2ZO3ZBdaWHzM8EG32sx1KBRi6',
          },
        }
      )
      .subscribe((response: any) => {
        console.log(response);
        // Redirect to the payment page from the response. The payUrl is available in the response
        window.open(response['payUrl'], '_blank');
      });

  }
}
