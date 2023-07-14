import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorldsData, slidesData } from 'src/app/models/worldsData';

/* const CocinasData: any[]  = [
  {
    id: 'cocinas',title: 'Cocinas',
  }
]; */



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  idCocina!: string;
  id!: string;
  data!: any;
  slides: any = slidesData;

  ruta!: string;
  idCocinas: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //Funcion que se ejecuta antes que se carge el componente
    this.idCocina = this.route.snapshot.params['idCocina'];
    this.id = this.route.snapshot.params['id'];
    // console.log('Funciona', 'idCocina: ', this.idCocina, 'id', this.id);

    /* const url = this.router.url;
    this.ruta = url.split('/').pop()!;
 */
    /* if (this.ruta === 'cocinas') {
      this.idCocinas = true;
      // this.data
    } else */ if (!!this.id) {
      const world = WorldsData.find((wd) => wd.id === this.idCocina);
      if (!!world) {
        this.data = world.pages?.find((page) => page?.id === this.id);
      }
    } else {
      this.data = WorldsData.find((wd) => wd.id === this.idCocina);
    }
  }
}

const MundosData: any[] = [
  {
    id: 'mundodulce',
    title: 'Mundo Dulce',
    pages: [
      {
        id: 'ecuatoriana',
        title: 'Ecuatoriana',
        description: '',
        // img: './../../assets/', '/src/assets/Imágenes funCooking'
        categories: [
          {
            name: 'Sopas',
            items: [{ name: 'Repe', description: 'El nombre de este plato se debe a que las antiguas generaciones lojanas se referían al guineo verde como repe.' },
            {name: 'Arveja con guineo', descripcion: 'La sopa de arvejas con guineo es una sopa tradicional lojana y se prepara con guineos o bananos verdes, arvejas (chicharos o guisantes), cebolla, ajo, comino, achiote, quesillo y cilantro.'},
            ],
          },
          {
            name: 'Platos fuertes',
            items: [{ name: 'Cuy', description: 'No hay fiesta de pueblo sin este plato, es el invitado de honor en cualquier evento. Los indígenas y campesinos crían cuyes en sus cuartos de cocina por lo que actualmente existen granjas dedicadas a la crianza y su producción está destinada al consumo interno, pero desde varios años también se lo utiliza para la exportación.' },
            {name: 'Fritada', description: 'Es un plato típico de Ecuador y sus orígenes se remontan a la época del colonialismo español, a principios de los años 1800.'},
            {name:'Gallina Cuyada',description:'La gallina cuyada es un plato típico lojano muy rico que surgió como una variante del cuy asado. Básicamente es un pollo asado condimentado con el marinado utilizado para el cuy, de allí sus sabores tan similares.'},
            {name:'Tamal',description:'Este platillo era cocinado de forma comunitaria para celebrar grandes fiestas religiosas consta de una masa de maíz y manteca de cerdo la cual se calienta para posteriormente ser envuelta en hojas de achira lo que le da su característico atractivo visual'},
            {name:'Cecina',description:'La cecina se forma de la carne de chancho la cual se corta de forma muy delgada y uniforme, se condimenta con sal y aliños, se la pone a secar al sol por tres o más horas, para posteriormente asarla en parrillas sobre el carbón.'},
            {name:'Chivo al hueco',description:'Esta es una de las recetas típicas en la mesa sucrense, también la usan como comida en eventos especiales como primeras comunes, bautizos, entre otros. El chivo es un animal que lo crían básicamente con alimentos naturales de cada región.'},
            {name:'Chanfaina',description:'La chanfaina es un plato de origen español que fue introducido en el Ecuador con la conquista. Este plato está basado en vísceras picadas, que pueden ser de chancho, de borrego, de res, o de otro animal.'},
            {name:'Sango de maíz',description:'Su principal ingrediente es la harina de maíz, es un potaje espeso, esto se da por la harina combinada con agua condimentando con refrito y sal, se lo puede acompañar con huevo frito y chicharrón.'}
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mundodulce',
    title: 'Mundo Dulce',
    pages: [
      {
        id: 'heladeria',
        title: 'Heladería',
        description: '',
        // img: './../../assets/', '/src/assets/Imágenes funCooking'
        categories: [
          {
            name: 'Helados',
            items: [{ name: 'Helados Artesanales ', description: 'Helados de paila' },
            {name: 'Helados de Salcedo', descripcion: 'La sopa de arvejas con guineo es una sopa tradicional lojana y se prepara con guineos o bananos verdes, arvejas (chicharos o guisantes), cebolla, ajo, comino, achiote, quesillo y cilantro.'},
            ],
          },
        ],
      },
    ],
  },
];
