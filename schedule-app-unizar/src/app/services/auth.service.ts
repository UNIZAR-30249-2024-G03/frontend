import { Injectable, Inject } from '@angular/core';
import { User } from '../models/user';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  isLoggedIn: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadUserFromLocalStorage();
  }

  setUserLoggedIn(user: User): void {
    this.user = user;
    this.saveUserToLocalStorage();
  }

  isUserLoggedIn(): boolean {
    return this.user !== null;
  }

  logout(): void {
    this.user = null;
    this.removeUserFromLocalStorage();
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
      this.saveUserToLocalStorage();
    }
  }

  private loadUserFromLocalStorage() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  private saveUserToLocalStorage() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
  }

  private removeUserFromLocalStorage() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      localStorage.removeItem('currentUser');
    }
  }
}
