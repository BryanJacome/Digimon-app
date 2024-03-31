import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth, // Inyecta AngularFireAuth
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(map(user => {
      if (!user) {
        // El usuario no está autenticado, se queda en la página de inicio de sesión
        return true;
      } else {
        // El usuario está autenticado, permite la navegación
        this.router.navigate(['/home']);// Cambia '/home' por la ruta de tu página de inicio de sesión
        return false;
      }
    }));
  }

}
