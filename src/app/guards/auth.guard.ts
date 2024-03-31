import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(map(user => {
      if (user) {
        // El usuario está autenticado y su correo electrónico está verificado
        return true;
      } else {
        // El usuario no está autenticado, redirige a la página de inicio de sesión
        this.router.navigate(['/auth']);
        return false;
      }
    }));
  }

}
