import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    public authService: AuthService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    const loggedUser = this.authService.getLoggedPersonInfo();
    if (loggedUser) {
      const userEmail = loggedUser.email;
      this.reservaService.getReservas(userEmail).subscribe((reservas) => {
        this.reservas = reservas;
        console.log('Reservas:', this.reservas);
      });
    } else {
      this.getError('Logged user info not found.');
    }
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSuccess('Reservation created successfully.');
      } else {
        this.getError('Reservation failed.');
      }
    });
  }

  navigateToMap(): void {
    window.location.href = '/map';
  }
}
