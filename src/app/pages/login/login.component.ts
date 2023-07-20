import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) {
    this.appComponent.isLogin = true;
  }


  /* Loging start */
  isLoggedIn() {
    return this.msalSevc.instance.getActiveAccount() != null;
  }

  login_msal() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('products');
    } else {
      this.msalSevc.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalSevc.instance.setActiveAccount(response.account);
        this.router.navigateByUrl('products');
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
