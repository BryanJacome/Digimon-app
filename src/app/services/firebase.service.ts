import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  utilsSvc = inject(UtilsService);

  /***** Firebase Autneticacion *****/
  getAuth() {
    return getAuth();
  }

  /** Acceder **/
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  /** Crear Usuario **/
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  /** Actualizar Usuario **/
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  /** Restablecer contraseña **/
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  /** Confirmar Email **/
  sendVerificationEmil() {
    return sendEmailVerification(getAuth().currentUser);
  }

  /** Cerrar sesion **/
  async singOut() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    getAuth().signOut()
      .then(res => {
        this.utilsSvc.routerLink('/auth');
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}
