import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';

@Injectable({
  providedIn: 'root',
})
export class EspaciosService {
  apiUrl = '/api'; 

  constructor(private http: HttpClient) {}

  getEspacios(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(`${this.apiUrl}/espacios`);
  }

  updateEspacio(id: string, espacioData: any): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.apiUrl}/espacios/${id}`, espacioData);
  }

  getEspaciosWithFilters(filters: any): Observable<Espacio[]> {
    let queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.set(key, filters[key]);
      }
    });
    return this.http.get<Espacio[]>(
      `${this.apiUrl}/espacios?${queryParams.toString()}`
    );
  }

  getPlantaList(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/plantas`);
  }
}
