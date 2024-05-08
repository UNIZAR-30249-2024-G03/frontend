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
    this.user = {
      id: 1,
      username: 'Julio de Sandro',
      email: 'julio.32@gmail.com',
      roles: ['role1', 'role2', 'role3'],
      departamentoAdscrito: 'Coordinator',
    };

    this.getLoggedUserInfo();
  }

  getUserInfo(id: number): void {
    this.personService.getUserInfo(id).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  getLoggedUserInfo(): void {
    this.authService.getLoggedInPersonId();
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
