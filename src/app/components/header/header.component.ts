import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
          name: 'Cocteles',
          route: 'cocina/mundobebidas/cocteles',
        },
        {
          name: 'Bebidas naturales',
          route: 'cocina/mundobebidas/bebidasnaturales',
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  redirectToURL(url: string) {
    this.router.navigateByUrl(url);
  }
}
