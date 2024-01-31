import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  loggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router) {
    this.loggedIn = this.authService.isAuthenticated();
  }
}
