import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-exvalidate',
  templateUrl: './exvalidate.component.html',
  styleUrls: ['./exvalidate.component.css']
})
export class ExvalidateComponent implements OnInit {
  exposantUsers:any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.exposantUsers = data.filter(user => user.role === 'ROLE_EXPOSANT');
    });
  }

  validateExposant(userId: number): void {
    this.userService.activateExposant(userId).subscribe(response => {

      console.log('User validated:', response);
    });
  }
}
