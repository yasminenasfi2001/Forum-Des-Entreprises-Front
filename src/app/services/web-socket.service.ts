import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import {StorageService} from "./storage.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private rxStomp: RxStomp;
  private readonly baseUrl = 'ws://localhost:8075/ws';
  private messageSubject: Subject<any> = new Subject<any>();
  private userId: any;

  constructor(private tokenStorageService:StorageService,private toastr: ToastrService) {
    this.rxStomp = new RxStomp();
    this.userId = this.tokenStorageService.getUser()?.id ?? null;
  }

  connect(): void {
    this.rxStomp.configure({
      brokerURL: this.baseUrl,
      connectHeaders: {},
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 200,
      debug: (msg: string) => {
        console.log(msg); // Log WebSocket debug messages
      }
    });

    this.rxStomp.activate();
    this.rxStomp.watch(`/specific/user/${(this.userId)}`).subscribe((message) => {
      const notificationMessage = `
            ${message.body}
                <br/>
                <a href="/detailsoffre/1">Va voir !</a>
  `;
      this.toastr.info(notificationMessage, 'Nouvelle Candidature', { enableHtml: true });
    });


    this.rxStomp.activate();
    this.rxStomp.watch(`/admin/${this.userId}`).subscribe((message) => {
      const notificationMessage = `
    ${message.body}
    <br/>
    <a href="/reclamations">Click here for more details</a>
  `;
      this.toastr.success(notificationMessage, 'Réclamation Reçue', { enableHtml: true });
    });


    this.rxStomp.watch('/all/messages').subscribe((message) => {
      console.log('Received message:', message.body);
      this.messageSubject.next(JSON.parse(message.body));
    });
  }

  sendMessage(message: any): void {
    if (!this.rxStomp.connected()) {
      console.error('WebSocket not connected!');
      return;
    }

    const messageText = JSON.stringify(message);
    console.log('Sending message:', messageText); // Log sent message
    this.rxStomp.publish({
      destination: '/app/application',
      body: messageText
    });
  }
  sendMessageToCandiatureOwner(message: any): void {
    if (!this.rxStomp.connected()) {
      console.error('WebSocket not connected!');
      return;
    }

    const messageText = JSON.stringify(message);
    console.log('Sending message:', messageText); // Log sent message
    this.rxStomp.publish({
      destination: '/app/applications',
      body: messageText
    });
  }

  sendNotifToAdmin(message: any): void {
    if (!this.rxStomp.connected()) {
      console.error('WebSocket not connected!');
      return;
    }

    const messageText = JSON.stringify(message);
    console.log('Sending message:', messageText); // Log sent message
    this.rxStomp.publish({
      destination: '/app/appli',
      body: messageText
    });
  }

  receiveMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.rxStomp.deactivate();
  }
}
