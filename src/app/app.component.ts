import { Component,OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import {WebSocketService} from "./services/web-socket.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn = false;
  username?: string;
  wishlistKey = 'wishlist';
  wishlistItems: any[] = [];
  roleConnected:any;
  constructor(private toastr: ToastrService,private webSocketService:WebSocketService,private storageService: StorageService) {
    this.loadWishlist()
  }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
    this.roleConnected = this.storageService.getUser()?.role ?? null;
  }

  loadWishlist(): void {
    const wishlist = JSON.parse(sessionStorage.getItem(this.wishlistKey) || '[]');
    //console.log('Retrieved Wishlist:', wishlist);
    this.wishlistItems = wishlist;
  }

  showWishlist(): void {
    this.loadWishlist();
  }
  removeFromWishlist(item: any): void {
    let wishlist = JSON.parse(sessionStorage.getItem(this.wishlistKey) || '[]');
    wishlist = wishlist.filter((wishlistItem: any) => wishlistItem.idOffre !== item.idOffre);
    sessionStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this.loadWishlist();
  }
}
