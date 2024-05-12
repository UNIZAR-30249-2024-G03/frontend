import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
})
export class MakeReservationComponent {
  user!: User;
  reservationData: Reserva = {
    id: '',
    person: {
      nombre: '',
      email: '',
      roles: [],
      departamento: '',
    },
    espacio: {
      id: this.data.id,
      tamano: this.data.tamano,
      categoriaReserva: this.data.categoriaReserva,
      numMaxOcupantes: this.data.capacidadMaxima,
      planta: 0,
      reservable: this.data.reservable,
    },
    infoReserva: {
      numMaxPersonas: 0,
      fechaInicio: '',
      fechaFinal: '',
      descripcion: '',
      tipoUsoReserva: '',
    },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private reservaService: ReservaService
  ) {
    this.user.email = this.authService.getLoggedInPersonEmail();
  }

  reserve(): void {
    this.reservaService.addReserva(this.reservationData).subscribe(
      (reserva) => {
        console.log('Reservation successful:', reserva);
      },
      (error) => {
        console.error('Reservation error:', error);
      }
    );
  }
}
