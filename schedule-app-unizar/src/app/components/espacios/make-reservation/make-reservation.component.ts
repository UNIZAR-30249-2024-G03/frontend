import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
})
export class MakeReservationComponent {
  reservationData!: Reserva;
  showSpinner: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private reservaService: ReservaService,
    private dialogRef: MatDialogRef<MakeReservationComponent>,
    private snackbarService: SnackbarService,
    private _snackBar: MatSnackBar
  ) {
    const defaultUser = this.authService.getLoggedPersonInfo();
    if (defaultUser) {
      this.reservationData = {
        id: '',
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
    } else {
      this.getError('Logged user info not found.');
    }
  }

  reserve(): void {
    this.showSpinner = true;
    if (this.exceedsMaxCapacity()) {
      return;
    }

    this.reservaService.addReserva(this.reservationData).subscribe(
      (res: any) => {
        this.showSpinner = true;
        console.log('Reservation successful:', res);
        this.getSuccess(res || 'Reservation successful');
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

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);

    this.showSpinner = false;
    this.dialogRef.close(true);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);

    this.showSpinner = false;
  }
}
