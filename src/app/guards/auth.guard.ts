import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}
//bloqueo de acceso si no hay un usuario autenticado si no hay un usuario
// autenticado, se redirige a la página de login y se limpian los datos de localStorage
  canActivate() {
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (authState) {
          return true;
        } else {
          localStorage.clear();
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
