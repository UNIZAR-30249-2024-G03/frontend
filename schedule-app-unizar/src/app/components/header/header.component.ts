import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  logout() {
    this.authService.logout();
    this.authService.isLoggedIn = false;
    this.router.navigateByUrl('/');
    this.getSuccess('Logout successful.');
  }

  get isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message);
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
  }
}
