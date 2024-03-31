import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User)
        .then(async res => {
          await this.firebaseSvc.updateUser(this.form.value.name);
          await this.firebaseSvc.sendVerificationEmil()
            .then(res => {
              this.utilsSvc.presentToas({
                message: "Verifique su Email para completar el registor",
                duration: 2500,
                color: "warning",
                position: "top",
                icon: "alert-circle-outline"
              })
              this.utilsSvc.routerLink('/auth');
            })
            .catch(error => {
              this.utilsSvc.presentToas({
                message: error.message,
                duration: 2500,
                color: "danger",
                position: "top",
                icon: "alert-circle-outline"
              })
            });
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