import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/users/users.models';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signinForm = this.createSignInForm();
  }

  ngOnInit(): void {
    // Additional initialization logic can be placed here if needed
  }

  /**
   * Creates the SignInForm with defined fields and validators.
   * @returns Initialized SignInForm.
   */
  private createSignInForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    console.log("paso pora qui");
    if (this.signinForm.valid) {
      this.isLoading = true;

      const credentials: User = this.signinForm.value;

      this.authService.login(credentials).subscribe({
        next: (response: any) => {
          console.log("Response", response);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.handleLoginError(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Handles the error during login.
   * @param error - The error object received from the login attempt.
   */
  private handleLoginError(error: any): void {
    if (error.status === 403) {
      this.errorMessage = 'Invalid credentials. Please verify your username and password.';
    } else {
      this.errorMessage = 'An error occurred. Please try again later.';
    }
  }
}