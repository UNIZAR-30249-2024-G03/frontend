import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserInfoModalComponent } from './user-info-modal/user-info-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  user=this.authService.getLoggedPersonInfo();

  ngOnInit(): void {
    this.getLoggedUserInfo();
  }

  getUserInfo(): void {
    const userEmail = this.authService.getLoggedInPersonEmail();
    if (userEmail) {
      this.personService.getUserInfo(userEmail).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('Logged user email not found.');
    }
  }

  getLoggedUserInfo(): void {
    const loggedUser = this.authService.getLoggedPersonInfo();
    if (loggedUser) {
      this.user = loggedUser;
    } else {
      console.error('Logged user info not found.');
    }
  }

  editUser(): void {
    const dialogRef = this.dialog.open(UserInfoModalComponent, {
      width: '500px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
