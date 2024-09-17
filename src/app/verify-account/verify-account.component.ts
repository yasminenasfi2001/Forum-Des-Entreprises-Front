import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  username: string = '';
  verificationCode: string = '';
  verificationCodetel : string =''; // Assuming this variable is used for verifying the phone number

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    // Retrieve username from storage service
    this.username = this.storageService.getUser().username;
  }

  verifyVerificationCode(): void {
    this.userService.verifyVerificationCode(this.username, this.verificationCode).subscribe(
      response => {
        console.log("success");
      },
      error => {
        console.error(error);
      }
    );
  }

  verifyPhoneNumber(): void {
    // Retrieve the userId from the storage service
    const userId = this.storageService.getUser().id;

    // Check if userId is not null or undefined
    if (userId) {
      // Log the request body before making the request
      const requestBody = {
        userId: userId,
        code: this.verificationCodetel
      };
      console.log("Request Body:", requestBody);

      // Call the verifyPhoneNumber method from the userService
      this.userService.verifyPhoneNumber(userId, this.verificationCodetel).subscribe(
        response => {
          console.log("Phone number verification success");
        },
        error => {
          console.error("Phone number verification error", error);
        }
      );
    } else {
      console.error("User ID not found");
    }
  }



}
