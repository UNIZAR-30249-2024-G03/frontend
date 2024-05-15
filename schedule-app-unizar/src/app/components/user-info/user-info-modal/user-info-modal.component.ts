import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { PersonService } from '../../../services/person.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
})
export class UserInfoModalComponent {
  userForm: FormGroup;
  showSpinner: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private personService: PersonService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      nombre: [data.nombre, [Validators.required, Validators.maxLength(255)]],
      email: [data.email, [Validators.required, Validators.maxLength(255)]],
      roles: [data.roles, Validators.required],
      departamento: [data.departamento, Validators.required],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  submitEditUser(): void {
    this.showSpinner = true;
    // this.personService
    //   .updateUser(this.userForm.value, this.authService.getLoggedInPersonId())
    //   .subscribe(
    //     (res: any) => {
    //       this.getSuccess(res || 'User info updated successfully.');
    //     },
    //     (err: any) => {
    //       this.getError(
    //         err.message || 'An error occurred while updating user info.'
    //       );
    //     }
    //   );
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);

    const loggedInPersonEmail = this.authService.getLoggedInPersonEmail();
    if (loggedInPersonEmail) {
      this.personService.getUserInfo(loggedInPersonEmail);
    } else {
      console.error('Logged user email not found.');
    }

    this.showSpinner = false;
    this.dialogRef.close(true);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
    this.showSpinner = false;
  }
}
