import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  checkPersonId(personId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/person/checkType`, { personId });
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }
}
