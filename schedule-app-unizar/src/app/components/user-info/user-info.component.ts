import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;

  constructor(
    private personService: PersonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
}
