import {Component,OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {WebSocketService} from "../services/web-socket.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  roleConnected:any;
  image:any;
  nom:any;
  ngOnInit(): void {
    this.roleConnected = this.tokenStorageService.getUser().role;
    this.image = this.tokenStorageService.getUser().image;
    this.nom = this.tokenStorageService.getUser().username
  }
  constructor(private toastr:ToastrService,private webSocketService:WebSocketService,private tokenStorageService:StorageService) {
    /*this.webSocketService.receiveMessages().subscribe((notification) => {
      console.log('Received notification:', notification);
    });*/

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  isUserVerified(): boolean {
    const user = this.tokenStorageService.getUser();
    return user && user.verificationCode === user.verificationCodeCheck;
  }

}
