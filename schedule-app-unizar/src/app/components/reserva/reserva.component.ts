import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService
      .getReservas(this.authService.getLoggedInPersonId())
      .subscribe((reservas) => {
        this.reservas = reservas;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
