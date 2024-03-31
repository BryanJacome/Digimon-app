import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.signIn(this.form.value as User)
        .then(res => {
          if (res.user.emailVerified) this.utilsSvc.routerLink('/home');
          else {
            this.firebaseSvc.singOut();
            this.utilsSvc.presentToas({
              message: "Debe verificar su email para poder iniciar sesión",
              duration: 2500,
              color: "danger",
              position: "top",
              icon: "alert-circle-outline"
            })
          }
        })
        .catch(error => {
          this.utilsSvc.presentToas({
            message: error.message,
            duration: 2500,
            color: "danger",
            position: "top",
            icon: "alert-circle-outline"
          })
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

}

