import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8075/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(username: string, password: string,twofactorcode: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'authenticate',
      {
        username,
        password,
        twofactorcode,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, tel: string, image: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
        tel,
        image,
      },
      httpOptions
    );
  }
  registerExposant(username: string, email: string, password: string, tel: string, image: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'registerExposant',
      {
        username,
        email,
        password,
        tel,
        image,
      },
      httpOptions
    );
  }

  handleLoginResponse(response: any): void {
    if (response.token) {

      document.cookie = `teymour=${response.token}; path=/; HttpOnly; Secure`;

      this.storageService.saveUser(response.user);
    }
  }

  // Handle logout
  logout(): void {

    document.cookie = 'teymour=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure';

    this.storageService.clean();
  }

  verifyVerificationCode(username: string, verificationCode: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify-verification-code',
      {
        username,
        verificationCode
      },
      httpOptions
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgot-password/' + email,
      {},
      { responseType: 'text' }
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(AUTH_API + 'users');
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(AUTH_API + 'users/' + userId);
  }

  modifyUser(userId: number, user: any): Observable<any> {
    return this.http.put(AUTH_API + 'users/' + userId, user, httpOptions);
  }
  activate2FA(userId: number): Observable<any> {
    return this.http.post(
      AUTH_API + `activate-2fa/${userId}`,
      {},
      httpOptions
    );
  }
  modifyUserProfile(userId: number, userProfile: any): Observable<any> {
    return this.http.put(
      AUTH_API + 'profile/' + userId,
      userProfile,
      httpOptions
    );
  }
  activateExposant(userId: number): Observable<any> {
    return this.http.post(
      AUTH_API + `activateExposant/${userId}`,
      {},
      httpOptions
    );
  }
  registerWithGoogle(): Observable<any> {
    return this.http.post(AUTH_API + 'register-with-google', {}, {});
  }
  verifyPhoneNumber(userId: number, code: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'verify-code',
      {
        userId,
        code
      },
      httpOptions
    );
  }
}
