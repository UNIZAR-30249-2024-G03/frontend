import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user!: User;

  constructor() {}

  setLoggedPersonInfo(user: User): void {
    this.user = user;
  }

  getLoggedInPersonEmail(): string {
    return this.user.email;
  }
}
