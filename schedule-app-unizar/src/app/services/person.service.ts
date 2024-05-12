import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  apiUrl = '/api';

  constructor(private http: HttpClient) {}

  checkPersonId(personId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personas/`, { personId });
  }

  getUserInfo(email: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/personas/' + email);
  }

  getUserInfobyEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/personas/${email}`);
  }
}
