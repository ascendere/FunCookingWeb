import { Component, OnDestroy } from '@angular/core';
import { list } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';

  constructor(
    private appComponent: AppComponent,
    private msalSevc: MsalService,
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private ProductsService: ProductsService
  ) {
    this.appComponent.isLogin = true;
    // console.log(this.msalSevc.instance.getActiveAccount())
    console.log(
      this.auth.authState
        .pipe(
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
        )
        .subscribe()
    );
  }

  /* Loging start */
  isLoggedIn() {
    return this.msalSevc.instance.getActiveAccount() != null;
  }

  login_msal() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('inicio');
    } else {
      this.authService.signInMicrosoft().then((data) => {
        if (data.additionalUserInfo?.isNewUser) {
          // Una vez que el usuario se ha autenticado con Microsoft, guardamos los datos en Firebase
          this.authService
            .userFirebase(data)
            .then(() => {
              console.log(
                'Datos de usuario guardados correctamente en Firebase.'
              );
              // Luego de guardar los datos, redirige a la página deseada
              this.router.navigateByUrl('inicio');
            })
            .catch((error) => {
              console.error(
                'Error al guardar los datos de usuario en Firebase:',
                error
              );
            });
        }else{
          this.router.navigateByUrl('inicio');
        }
      });
    }
  }

  logout() {
    this.msalSevc.loginRedirect();
  }
  /* Loging end */

  // login

  login() {
    if (this.email.length == 0 || this.password.length == 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un correo y contraseña',
        icon: 'error',
      });
      return;
    }

    this.authService
      .loginEmailPassword(this.email, this.password)
      .then((res) => {
        this.router.navigateByUrl('/products');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo o la constraseña son incorrectos',
        });
      });
  }
  ngOnDestroy(): void {
    this.appComponent.isLogin = false;
  }
}
