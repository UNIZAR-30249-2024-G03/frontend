import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  user: User = {
    nombre: '',
    email: '',
    roles: [],
    departamento: '',
  };
  selectedDepartment: string = 'Informatica_e_Ingenieria_de_sistemas';
  showSpinner: boolean = false;

  constructor(
    private personService: PersonService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.showSpinner = true;

    this.personService.getUserInfobyEmail(this.user.email).subscribe({
      next: (data) => {
        this.authService.setUserLoggedIn(data);
        this.authService.setLoggedInPersonEmail(this.user.email)
        this.user = data;
        this.authService.isLoggedIn = true;
        this.router.navigateByUrl('/map');
        this.getSuccess('Login successful.');
      },
      error: (error) => {
        console.error(error);
        this.getError('An error occurred. Please try again later.');
      },
    });
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
  }
}
