import { Injectable } from '@angular/core';
import { User } from '../../models/users/users.models';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'session_token';

  /**
   * Attempts to log in the user.
   * @param credentials - User credentials containing email and password.
   * @returns Observable with login response.
   */
  login(credentials: User): Observable<any> {
    try {
      const responseBody = this.authenticate(credentials);

      // Simulate a successful response with a delay of 1 second
      return of(responseBody).pipe(delay(1000));
    } catch (error) {
      // Throw an error for invalid credentials
      return throwError(() => error);
    }
  }

  /**
   * Logs out the user by removing the stored session token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Authenticates user credentials.
   * @param credentials - User credentials containing email and password.
   * @returns Object with a token and status code.
   * @throws Error for invalid credentials.
   */
  private authenticate(credentials: User): any {
    let responseBody = {
      token: '',
      statusCode: 0,
    };

    // Validate credentials (e.g., compare with hardcoded data)
    if (this.isValidCredentials(credentials)) {
      responseBody = {
        token: 'testtoken12345',
        statusCode: 200,
      };
      this.storeToken(responseBody.token);
    } else {
      throw new Error('Invalid credentials, try again');
    }

    return responseBody;
  }

  /**
   * Checks if provided credentials are valid.
   * @param credentials - User credentials containing email and password.
   * @returns True if credentials are valid, false otherwise.
   */
  private isValidCredentials(credentials: User): boolean {
    return credentials.email === 'demo@demo.com' && credentials.password === 'demo12345';
  }
}
