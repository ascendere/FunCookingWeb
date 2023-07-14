import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  email: string = "";
  password: string = "";

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private msalSevc: MsalService,
    private router: Router
  ) {
    this.appComponent.isLogin = true;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //
  }

  /* Loging start */
  isLoggedIn() {
    return this.msalSevc.instance.getActiveAccount() != null;
  }

  login() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('inicio');
    } else {
      this.msalSevc.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalSevc.instance.setActiveAccount(response.account);
        this.router.navigateByUrl('inicio');
      });
    }
  }

  logout() {
    this.msalSevc.loginRedirect();
  }
  /* Loging end */
}
