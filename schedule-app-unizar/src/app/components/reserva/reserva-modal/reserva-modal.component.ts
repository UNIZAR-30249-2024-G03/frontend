import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservaService } from '../../../services/reserva.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Reserva } from '../../../models/reserva';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss'],
})
export class ReservaModalComponent implements OnInit {
  reservationForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private dialogRef: MatDialogRef<ReservaModalComponent>,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Reserva,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      personName: ['', [Validators.required, Validators.maxLength(255)]],
      spaceNumber: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  submitReservation(): void {
    this.showSpinner = true;
    this.reservaService.addReserva(this.reservationForm.value).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Reservation added successfully.');
      },
      (err: any) => {
        this.getError(
          err.message || 'An error occurred while adding reservation.'
        );
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addReserva(): void {
    this.showSpinner = true;
    this.reservaService.addReserva(this.reservationForm.value).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Reservation added successfully.');
      },
      (err: any) => {
        this.getError(
          err.message || 'An error occurred while adding the reservation.'
        );
      }
    );
  }

  updateReserva(): void {
    this.showSpinner = true;
    this.reservaService.updateReserva(this.reservationForm.value).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Reservation updated successfully.');
      },
      (err: any) => {
        this.getError(
          err.message || 'An error occurred while updating the reservation.'
        );
      }
    );
  }

  deleteReserva(): void {
    this.showSpinner = true;
    this.reservaService.deleteReserva(this.reservationForm.value.id).subscribe(
      (res: any) => {
        this.getSuccess(res || 'Reservation deleted successfully.');
      },
      (err: any) => {
        this.getError(
          err.message || 'An error occurred while deleting the reservation.'
        );
      }
    );
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);
    this.reservaService.getReservas(this.authService.getLoggedInPersonEmail());
    this.showSpinner = false;
    this.dialogRef.close(true);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
    this.showSpinner = false;
  }
}
