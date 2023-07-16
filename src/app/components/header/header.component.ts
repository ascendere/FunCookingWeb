import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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

  constructor(private router: Router, private msalSevc: MsalService) {
    // console.log(this.isLoggedIn())
  }

  redirectToURL(url: string) {
    this.router.navigate([url]);
  }

  isLoggedIn() {
    return this.msalSevc.instance.getActiveAccount() != null;
  }

  logout() {
    this.msalSevc.loginRedirect();
  }
}
