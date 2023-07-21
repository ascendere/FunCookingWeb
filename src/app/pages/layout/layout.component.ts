import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  idCocina!: string;
  id!: string;
  data!: any;

  ruta!: string;
  idCocinas: boolean = false;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCocina = params.get('idCocina')!;
      this.id = params.get('id')!;

      if (!!this.id) {
        const world = MundosData.find((wd) => wd.id === this.idCocina);
        if (!!world) {
          this.data = world.pages?.find(
            (page: { id: string }) => page?.id === this.id
          );
        }
      } else {
        this.data = MundosData.find((wd) => wd.id === this.idCocina);
      }

      this.cdr.detectChanges();
    });
  }
}

const MundosData: any[] = [
  {
    id: 'mundosalado',
    title: 'Mundo Salado',
    pages: [
      {
        id: 'ecuatoriana',
        title: 'Ecuatoriana',
        description:
          'Comida Tipica de Ecuador, la cual se puede degustar en diferentes provincias..',
        url: 'ecuatoriana',
        img: '',
        categories: [
          {
            name: 'Sopas',
            items: [
              {
                title: 'Repe',
                description:
                  'El nombre de este plato se debe a que las antiguas generaciones lojanas se referían al guineo verde como repe.',
                img: './../../../assets/imgs-funCooking/REPE.png',
                url: '',
              },
              {
                title: 'Arveja con guineo',
                descripcion:
                  'La sopa de arvejas con guineo es una sopa tradicional lojana y se prepara con guineos o bananos verdes, arvejas (chicharos o guisantes), cebolla, ajo, comino, achiote, quesillo y cilantro.',
                img: './../../../assets/imgs-funCooking/ARVEJA-CON-GUINEO.png',
                url: '',
              },
            ],
          },
          {
            name: 'Platos fuertes',
            items: [
              {
                title: 'Cuy',
                description:
                  'No hay fiesta de pueblo sin este plato, es el invitado de honor en cualquier evento. Los indígenas y campesinos crían cuyes en sus cuartos de cocina por lo que actualmente existen granjas dedicadas a la crianza y su producción está destinada al consumo interno, pero desde varios años también se lo utiliza para la exportación.',
                img: './../../../assets/imgs-funCooking/CUY-ASADO.png',
                url: '',
              },
              {
                title: 'Fritada',
                description:
                  'Es un plato típico de Ecuador y sus orígenes se remontan a la época del colonialismo español, a principios de los años 1800.',
                img: './../../../assets/imgs-funCooking/FRITADA.png',
                url: '',
              },
              {
                title: 'Gallina Cuyada',
                description:
                  'La gallina cuyada es un plato típico lojano muy rico que surgió como una variante del cuy asado. Básicamente es un pollo asado condimentado con el marinado utilizado para el cuy, de allí sus sabores tan similares.',
                img: './../../../assets/imgs-funCooking/GALLINA-CUYADA.png',
                url: '',
              },
              {
                title: 'Tamal',
                description:
                  'Este platillo era cocinado de forma comunitaria para celebrar grandes fiestas religiosas consta de una masa de maíz y manteca de cerdo la cual se calienta para posteriormente ser envuelta en hojas de achira lo que le da su característico atractivo visual',
                img: './../../../assets/imgs-funCooking/TAMAL.png',
                url: '',
              },
              {
                title: 'Cecina',
                description:
                  'La cecina se forma de la carne de chancho la cual se corta de forma muy delgada y uniforme, se condimenta con sal y aliños, se la pone a secar al sol por tres o más horas, para posteriormente asarla en parrillas sobre el carbón.',
                img: './../../../assets/imgs-funCooking/CECINA.png',
                url: '',
              },
              {
                title: 'Chivo al hueco',
                description:
                  'Esta es una de las recetas típicas en la mesa sucrense, también la usan como comida en eventos especiales como primeras comunes, bautizos, entre otros. El chivo es un animal que lo crían básicamente con alimentos naturales de cada región.',
                img: './../../../assets/imgs-funCooking/CHIVO-AL-HUECO.png',
                url: '',
              },
              {
                title: 'Chanfaina',
                description:
                  'La chanfaina es un plato de origen español que fue introducido en el Ecuador con la conquista. Este plato está basado en vísceras picadas, que pueden ser de chancho, de borrego, de res, o de otro animal.',
                img: './../../../assets/imgs-funCooking/CHANFAINA.jpg',
                url: '',
              },
              {
                title: 'Sango de maíz',
                description:
                  'Su principal ingrediente es la harina de maíz, es un potaje espeso, esto se da por la harina combinada con agua condimentando con refrito y sal, se lo puede acompañar con huevo frito y chicharrón.',
                img: './../../../assets/imgs-funCooking/SANGO-DE-MAIZ.png',
                url: '',
              },
            ],
          },
        ],
      },
      {
        id: 'internacional',
        title: 'Internacional',
        description:
          'Comida Internacional, la cual se puede degustar en diferentes paises...',
        url: 'internacional',
        img: '',
        items: [
          {
            title: 'Cecina',
            description: '',
            img: './../../../assets/imgs-funCooking/CECINA.png',
            url: '',
          },
          {
            title: 'Cuy',
            description: '',
            img: './../../../assets/imgs-funCooking/CUY-ASADO.png',
            url: '',
          },
        ],
      },
      {
        id: 'creativa',
        title: 'Creativa',
        description:
          'Comida Creativa, la cual se puede degustar en diferentes lugares...',
        url: 'internacional',
        img: '',
        items: [
          {
            title: 'Horchata',
            description: '',
            img: './../../../assets/imgs-funCooking/HORCHATA.png',
            url: '',
          },
          {
            title: 'Jugo de Caña',
            description: '',
            img: './../../../assets/imgs-funCooking/JUGO-DE-CAÑA.png',
            url: '',
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
        id: 'panaderia-pasteleria',
        title: 'Panadería y Pastelería',
        description:
          'Panadería y pastelería que se puede degustar en diferentes lugares...',
        url: 'panaderia-pasteleria',
        img: './../../../assets/imgs-funCooking/REPOSTERIA.png',
        items: [
          {
            title: 'Bizcochuelos',
            description: '',
            img: './../../../assets/imgs-funCooking/BIZCOCHUELOS.png',
            url: '',
          },
          {
            title: 'Roscones',
            description: '',
            img: './../../../assets/imgs-funCooking/ROSCONES.png',
            url: '',
          },
          {
            title: 'Quimbolitos',
            description: '',
            img: './../../../assets/imgs-funCooking/QUIMBOLITOS.png',
            url: '',
          },
          {
            title: 'Humitas',
            description: '',
            img: './../../../assets/imgs-funCooking/HUMITAS.png',
            url: '',
          },
        ],
      },
      {
        id: 'heladeria',
        title: 'Heladería',
        description:
          'Heladería la cual se puede degustar en diferentes lugares...',
        url: 'heladeria',
        img: './../../../assets/imgs-funCooking/HELADERIA.png',
        items: [
          {
            title: 'Helados Artesanales ',
            description: 'Helados de paila',
            img: './../../../assets/imgs-funCooking/HELADOS-DE-PAILA.png',
            url: '',
          },
          {
            title: 'Helados de Salcedo',
            descripcion:
              'La sopa de arvejas con guineo es una sopa tradicional lojana y se prepara con guineos o bananos verdes, arvejas (chicharos o guisantes), cebolla, ajo, comino, achiote, quesillo y cilantro.',
            img: './../../../assets/imgs-funCooking/HELADOS-DE-SALCEDO.png',
            url: '',
          },
        ],
      },
    ],
  },
  {
    id: 'mundobebidas',
    title: 'Mundo Bebidas',
    pages: [
      {
        id: 'vinos',
        title: 'Vinos',
        description:
          'Vinos los cuales se pueden degustar en diferentes sitios...',
        url: 'vinos',
        img: '',
        items: [
          {
            title: 'Horchata',
            description:
              'La horchata de Ecuador es una bebida de color rojo o rosado, que se prepara con diferentes hierbas aromáticas como manzanilla, menta, cedrón, hierba luisa y toronjil, y flores como esencia de rosas, violetas, begonias, claveles, etc.',
            img: './../../../assets/imgs-funCooking/HORCHATA.png',

            url: '',
          },
          {
            title: 'Jugo de caña',
            description:
              'Se consume como bebida en muchos lugares, especialmente donde la caña de azúcar se cultiva comercialmente.',
            img: './../../../assets/imgs-funCooking/JUGO-DE-CAÑA.png',

            url: '',
          },
        ],
      },
      {
        id: 'cocteleria',
        title: 'Coctelería',
        description:
          'Cocteles los cuales se pueden degustar en diferentes sitios...',
        url: 'cocteleria',
        img: './../../../assets/imgs-funCooking/COCTELERIA.png',
        items: [
          {
            title: 'Horchata',
            description:
              'La horchata de Ecuador es una bebida de color rojo o rosado, que se prepara con diferentes hierbas aromáticas como manzanilla, menta, cedrón, hierba luisa y toronjil, y flores como esencia de rosas, violetas, begonias, claveles, etc.',
            img: './../../../assets/imgs-funCooking/HORCHATA.png',
            url: '',
          },
          {
            title: 'Jugo de caña',
            description:
              'Se consume como bebida en muchos lugares, especialmente donde la caña de azúcar se cultiva comercialmente.',
            img: './../../../assets/imgs-funCooking/JUGO-DE-CAÑA.png',
            url: '',
          },
          {
            title: 'Morocho',
            description:
              'Con su singular aroma y exquisito sabor se ha popularizado en todo Ecuador. Se elabora con maíz morocho, leche, panela y canela y se suele servir con pan de yuca.',
            img: './../../../assets/imgs-funCooking/MOROCHO.jpg',
            url: '',
          },
        ],
      },
      {
        id: 'naturales',
        title: 'Naturales',
        description:
          'Bebidas naturales las cuales se pueden degustar en diferentes sitios...',
        url: 'naturales',
        img: './../../../assets/imgs-funCooking/BEBIDAS-TRADICIONALES.png',

        items: [
          {
            title: 'Horchata',
            description:
              'La horchata de Ecuador es una bebida de color rojo o rosado, que se prepara con diferentes hierbas aromáticas como manzanilla, menta, cedrón, hierba luisa y toronjil, y flores como esencia de rosas, violetas, begonias, claveles, etc.',
            img: './../../../assets/imgs-funCooking/HORCHATA.png',
            url: '',
          },
          {
            title: 'Jugo de caña',
            description:
              'Se consume como bebida en muchos lugares, especialmente donde la caña de azúcar se cultiva comercialmente.',
            img: './../../../assets/imgs-funCooking/JUGO-DE-CAÑA.png',

            url: '',
          },
          {
            title: 'Morocho',
            description:
              'Con su singular aroma y exquisito sabor se ha popularizado en todo Ecuador. Se elabora con maíz morocho, leche, panela y canela y se suele servir con pan de yuca.',
            img: '',

            url: '',
          },
        ],
      },
    ],
  },
];
