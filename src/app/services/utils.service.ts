import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  /***** Loading *****/
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  /***** Toas *****/
  async presentToas(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  /***** Enrutamiento *****/
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
}

