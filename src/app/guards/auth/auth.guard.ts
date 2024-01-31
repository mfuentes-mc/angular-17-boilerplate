import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = (route, state) => {
  // Inyecta el store y el servicio de autenticación
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService) {
    throw new Error('Store o AuthService no está disponible. Asegúrate de haberlo inyectado correctamente.');
  }
  // Utiliza el store para obtener el estado de autenticación
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Si no ha iniciado sesión, redirige a la página de inicio de sesión
    router.navigate(['/unauthorized']);
    return false;
  }
};
export default authGuard;