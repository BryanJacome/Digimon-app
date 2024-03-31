import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.form.value.email)
        .then(res => {
          this.utilsSvc.presentToas({
            message: "Revisa tu correo para restablecer la contraseña",
            duration: 2500,
            color: "warning",
            position: "top",
            icon: "mail-outline"
          });
          this.utilsSvc.routerLink('/auth');
          this.form.reset();
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
