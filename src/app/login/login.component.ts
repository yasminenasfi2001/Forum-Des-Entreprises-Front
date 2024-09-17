import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    tel: null,
    image: null,
    twoFactorCode: null
  };
  constructor(private userService: UserService, private storageService: StorageService, private router: Router) { }
  isLoggedIn = false;
  roles: string[] = [];

  signUpForm: any = {
    username: null,
    password: null,
    twoFactorCode: null // Add twoFactorCode property
  };
  exposantForm: any = {
    username: null,
    email: null,
    password: null,
    tel: null,
    image: null,
    twoFactorCode: null // Add twoFactorCode property
  };
  exposantRegistrationVisible = false;
  test = true;
  isLoginFailed = false;
  errorMessage = '';
  password: any;
  test1=true;

  onSignUp(): void {
    const { username, password, twoFactorCode } = this.signUpForm;

    this.userService.login(username, password, twoFactorCode).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.userService.handleLoginResponse(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  onClick():void{
    this.test=!this.test;
  }
  onClick1():void{
    this.test1=!this.test1;
  }
  onClickExposant() {
    this.exposantRegistrationVisible = true;
  }

  onSubmit(): void {
    this.onFileChange(event);

    const { username, email, password, tel, image } = this.form;
    this.userService.register(username, email, password, tel, image).subscribe({
      next: data => {

        console.log('Registration successful:', data);


        this.test=!this.test;
      },
      error: err => {

        console.error('Registration error:', err);
      }
    });
  }
  registerExposant(): void {
    const { username, email, password, tel, image } = this.exposantForm;
    this.userService.registerExposant(username, email, password, tel, image).subscribe({
      next: data => {
        console.log('Exposant registration successful:', data);
        // You can perform additional actions or navigate to a different page upon successful registration.
      },
      error: err => {
        console.error('Exposant registration error:', err);
        // Handle the error, show a message, or perform other actions.
      }
    });
  }
  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {

        if (this.form) {
          this.form.image = '/assets/' + file.name;
        }
      };

      reader.readAsDataURL(file);
    }
  }
  showForgotPasswordForm = false;
  forgotPasswordForm: any = {
    email: null
  };
  forgotPasswordClicked(): void {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
    if (!this.showForgotPasswordForm) {
      this.forgotPasswordForm.email = null;
    }
  }

  sendResetPasswordEmail(): void {
    const { email } = this.forgotPasswordForm;

    this.userService.forgotPassword(email).subscribe(
      () => {
        console.log('Reset password email sent successfully!');

      },
      (error) => {
        console.error('Error sending reset password email:', error);

      }
    );
  }

  registerWithGoogle(): void {
    this.userService.registerWithGoogle().subscribe({
      next: (data: any) => {
        console.log('Registration with Google successful:', data);
        // Handle successful registration with Google, e.g., navigate to another page
      },
      error: (error: any) => {
        console.error('Error registering with Google:', error);
        // Handle error, show a message, or perform other actions
      }
    });
  }
}
