import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'src/app/services/auth.service';

import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  givenName: string | undefined;
  rutas = [
    {
      name: 'Mundo Salado',
      route: 'cocina/mundosalado',
      sub_rutas: [
        {
          name: 'Ecuatoriana',
          route: 'cocina/mundosalado/ecuatoriana',
        },
        {
          name: 'Internacional',
          route: 'cocina/mundosalado/internacional',
        },
        {
          name: 'Creativa',
          route: 'cocina/mundosalado/creativa',
        },
      ],
    },
    {
      name: 'Mundo Dulce',
      route: 'cocina/mundodulce',
      sub_rutas: [
        {
          name: 'Panadería/pastelería',
          route: 'cocina/mundodulce/panaderia-pasteleria',
        },
        {
          name: 'Heladería',
          route: 'cocina/mundodulce/heladeria',
        },
      ],
    },
    {
      name: 'Mundo Bebidas',
      route: 'cocina/mundobebidas',
      sub_rutas: [
        {
          name: 'Vinos',
          route: 'cocina/mundobebidas/vinos',
        },
        {
          name: 'Coctelería',
          route: 'cocina/mundobebidas/cocteleria',
        },
        {
          name: 'Bebidas naturales',
          route: 'cocina/mundobebidas/naturales',
        },
      ],
    },
  ];

  isAdmin:boolean= false;

  constructor(
    private router: Router,
    private msalSevc: MsalService,
    private authService: AuthService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((data)=>{
      this.authService.getDataUser(data).subscribe((data2:any)=>{
        this.isAdmin = data2.isAdmin
      })
    })
    this.auth.currentUser.then(data=>{
      console.log(data)
    })
  // return true;//
    this.authService.getCurrentUser().then(data=>{
      console.log(data)

    })
  }

  redirectToURL(url: string) {
    this.router.navigate([url]);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  isLoggedFirebase(): boolean {
    return this.auth.authState != null;
  }

  isAdministrador(){
  //console.log(this.auth.currentUser);
  // return true;//
    // return true;
   /*  console.log(this.authService.encontrarRol(this.authService.getEmail()))
    if (String(this.authService.encontrarRol(this.authService.getEmail())) === 'administrador'){
      return false;
    }
    else{
      return true;
    } */
  }

  logout() {
    if (this.msalSevc.instance.getActiveAccount() != null) {
      this.msalSevc.logoutRedirect();
    } else {
      this.authService.logout();
    }
  }
}
