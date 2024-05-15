import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  apiUrl = '/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReservas(email: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(
      `${this.apiUrl}/reservas?idUsuario=${email}`
    );
  }

  addReserva(reservationData: Reserva): Observable<any> {
    const idUsuario = this.authService.getLoggedInPersonEmail();

    // POST isteği için gerekli verileri gönderelim
    return this.http.post<any>(
      this.apiUrl +
        '/reservas?idUsuario=' +
        idUsuario +
        '&idsEspacios=' +
        reservationData.espacio.id +
        '&tipoUsoReserva=' +
        reservationData.infoReserva.tipoUsoReserva +
        '&numMaxOcupantes=' +
        reservationData.infoReserva.numMaxPersonas +
        '&fechaInicio=' +
        reservationData.infoReserva.fechaInicio +
        '&fechaFinal=' +
        reservationData.infoReserva.fechaFinal +
        '&descripcion=' +
        reservationData.infoReserva.descripcion,
      reservationData
    );
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
