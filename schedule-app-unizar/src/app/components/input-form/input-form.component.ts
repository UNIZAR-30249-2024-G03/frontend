import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  personId!: string;

  constructor(
    private personService: PersonService,
    private snackbarService: SnackbarService,
    private authService: AuthService // AuthService'ı bileşene enjekte et
  ) {}

  submit() {
    console.log('submit try');
    this.personService.checkPersonId(this.personId).subscribe(
      (response) => {
        let message = '';
        if (response.type === 'email') {
          message = 'The person ID is an email address.';
        } else if (response.type === 'number') {
          message = 'The person ID is a number.';
        } else {
          message = 'The type of person ID could not be determined.';
        }

        this.snackbarService.createSnackBar('info', message);
        this.authService.setLoggedInPersonId(this.personId);
      },
      (error) => {
        console.error(error);
        this.snackbarService.createSnackBar(
          'error',
          'An error occurred. Please try again later.'
        );
      }
    );
  }
}
