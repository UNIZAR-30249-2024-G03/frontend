import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';

@Injectable({
  providedIn: 'root',
})
export class EspaciosService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getEspacios(params: any): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(`${this.apiUrl}`, { params });
  }

  updateEspacio(id: string, espacioData: any): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.apiUrl}/${id}`, espacioData);
  }
}
