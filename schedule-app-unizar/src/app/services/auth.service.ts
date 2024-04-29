import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInPersonId!: number;

  constructor() {}

  setLoggedInPersonId(personId: number): void {
    this.loggedInPersonId = personId;
  }

  getLoggedInPersonId(): number {
    return this.loggedInPersonId;
  }
}
