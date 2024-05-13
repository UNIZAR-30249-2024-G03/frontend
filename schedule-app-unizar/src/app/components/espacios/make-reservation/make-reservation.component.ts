import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
})
export class MakeReservationComponent {
  reservationData: Reserva;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private reservaService: ReservaService
  ) {
    const defaultUser = this.authService.getLoggedPersonInfo();
    this.reservationData = {
      idUsario: defaultUser.email,
      person: {
        nombre: defaultUser.nombre,
        email: defaultUser.email,
        roles: defaultUser.roles,
        departamento: defaultUser.departamento,
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
  }

  reserve(): void {
    if (this.exceedsMaxCapacity()) {
      return;
    }

    this.reservaService.addReserva(this.reservationData).subscribe(
      (reserva) => {
        console.log('Reservation successful:', reserva);
      },
      (error) => {
        console.error('Reservation error:', error);
      }
    );
  }

  exceedsMaxCapacity(): boolean {
    return (
      this.reservationData.infoReserva.numMaxPersonas >
      this.reservationData.espacio.numMaxOcupantes
    );
  }
}
