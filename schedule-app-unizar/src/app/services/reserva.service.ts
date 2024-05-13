import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getReservas(email: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(
      `${this.apiUrl}/reservas?idUsuario=${email}`
    );
  }

  addReserva(reservationData: Reserva): Observable<Reserva> {
    const idUsuario = reservationData.person.email;

    // idUsuario parametresini URL'ye eklemek için HttpParams kullanalım
    let params = new HttpParams();
    params = params.set('idUsuario', idUsuario);

    // POST isteği için gerekli verileri gönderelim
    return this.http.post<any>(this.apiUrl, reservationData, { params });
  }

  updateReserva(id: string, reservationData: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(
      `${this.apiUrl}/reservas/${id}`,
      reservationData
    );
  }

  deleteReserva(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reservas/${id}`);
  }
}
