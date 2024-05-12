import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = {
    nombre: 'John Doe',
    email: 'john.doe@example.com',
    roles: ['user'],
    departamento: 'Sales',
  };

  constructor() {}

  setLoggedPersonInfo(user: User): void {
    this.user = user;
  }

  getLoggedPersonInfo(): User {
    return this.user;
  }

  getLoggedInPersonEmail(): string {
    return this.user.email;
  }
}
