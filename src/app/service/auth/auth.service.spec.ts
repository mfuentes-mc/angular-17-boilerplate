import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../models/users/users.models';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should authenticate and store token on successful login', fakeAsync(() => {
    const credentials: User = {
      email: 'demo@demo.com',
      password: 'demo12345',
    };

    authService.login(credentials).subscribe(response => {
      expect(response.statusCode).toBe(200);
      expect(authService.isAuthenticated()).toBeTruthy();
      expect(authService.getToken()).toEqual('testtoken12345');
    });

    // Tick to simulate the delay in the login observable
    tick(1000);
  }));

  it('should throw an error on invalid login', fakeAsync(() => {
    const credentials: User = {
      email: 'invalid@user.com',
      password: 'invalidpassword',
    };

    authService.login(credentials).subscribe(
      () => fail('Expected an error, but login succeeded'),
      error => {
        expect(error.message).toBe('Invalid credentials, try again');
        expect(authService.isAuthenticated()).toBeFalsy();
        expect(authService.getToken()).toBeNull();
      }
    );

    // Tick to simulate the delay in the login observable
    tick(1000);
  }));

  it('should logout and remove the stored token', () => {
    // Assuming that the user is logged in initially
    authService.isAuthenticated(); // This should be true before logout

    authService.logout();

    expect(authService.isAuthenticated()).toBeFalsy();
    expect(authService.getToken()).toBeNull();
  });
});
