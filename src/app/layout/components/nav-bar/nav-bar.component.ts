import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  loggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router) {
    this.loggedIn = this.authService.isAuthenticated();
  }

  closeSession() {
    if (this.loggedIn) {
      this.authService.logout();
      this.router.navigate(['/']);
      this.loggedIn=false;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}