import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  isLoggedIn: boolean = false;
  

  constructor() {}

  setUserLoggedIn(user: User): void {
    this.user = user;
  }

  isUserLoggedIn(): boolean {
    return this.user !== null;
  }

  logout(): void {
    this.user = null;
  }

  getLoggedPersonInfo(): User | null {
    return this.user;
  }

  getLoggedInPersonEmail(): string | null {
    return this.user ? this.user.email : null;
  }

  setLoggedInPersonEmail(mail: string) {
    if (this.user) {
      this.user.email = mail;
    }
  }
}
