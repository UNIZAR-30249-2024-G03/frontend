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

  getReservas(email: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}?idUsuario=${email}`);
  }

  addReserva(reservaData: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl + '/reservas'}`, reservaData);
  }

  updateReserva(reservaData: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(
      `${this.apiUrl}/${reservaData.id}`,
      reservaData
    );
  }

  deleteReserva(reservaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${reservaId}`);
  }
}
