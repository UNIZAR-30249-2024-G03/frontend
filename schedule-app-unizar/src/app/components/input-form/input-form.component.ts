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

  constructor(
    private personService: PersonService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    console.log('login try');
    this.personService.getUserInfobyEmail(this.user.email).subscribe({
      next: (data) => {
        this.authService.setLoggedPersonInfo(data);
        this.user = data;
        this.router.navigateByUrl('/map');
        console.log('Logged user data:' + this.authService.getLoggedPersonInfo()); // todo get user data.
      },
      error: (error) => {
        console.error(error);
        this.snackbarService.createSnackBar(
          'error',
          'An error occurred. Please try again later.'
        );
      },
    });
  }
}
