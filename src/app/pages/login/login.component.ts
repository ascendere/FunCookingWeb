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
    private auth: AngularFireAuth
  ) {
    this.appComponent.isLogin = true;
    // console.log(this.msalSevc.instance.getActiveAccount())
    console.log(
      this.auth.authState.pipe(
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
      ).subscribe()
    );
  }

  /* Loging start */
  isLoggedIn() {
    return this.msalSevc.instance.getActiveAccount() != null;
  }

  login_msal() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('products');
    } else {
      this.authService.signInMicrosoft().then((data)=>{
        console.log(data.additionalUserInfo?.profile)
      })
     /*  this.msalSevc.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalSevc.instance.setActiveAccount(response.account);
        alert(JSON.stringify(response.account));
        this.router.navigateByUrl('products');
      }); */

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
