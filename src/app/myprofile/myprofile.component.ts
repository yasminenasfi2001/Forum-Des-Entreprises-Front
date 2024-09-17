import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: any;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }
}
