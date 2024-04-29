import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInPersonId: string | null = null;

  constructor() {}

  setLoggedInPersonId(personId: string): void {
    this.loggedInPersonId = personId;
  }

  getLoggedInPersonId(): string | null {
    return this.loggedInPersonId;
  }

}
