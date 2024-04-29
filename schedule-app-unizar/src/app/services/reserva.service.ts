import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getReservas(userId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}?idUsuario=${userId}`);
  }

  addReserva(reservaData: any): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}`, reservaData);
  }

  deleteReserva(reservaId: string, userId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${reservaId}?idUsuario=${userId}`
    );
  }
}
