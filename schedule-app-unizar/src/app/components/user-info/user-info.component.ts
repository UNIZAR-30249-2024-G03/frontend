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
  user!: User;

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLoggedUserInfo();
  }

  getUserInfo(): void {
    this.personService
      .getUserInfo(this.authService.getLoggedInPersonEmail())
      .subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
  }

  getLoggedUserInfo(): void {
    this.user = this.authService.getLoggedPersonInfo();
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
