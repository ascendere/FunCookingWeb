import { Component } from '@angular/core';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  data: any[] = [
    {
      title: 'Mama Lola',
      description: '',
      img: './../../../assets/imgs-funCooking/MAMA-LOLA.png',
      url: '',
    },
    {
      title: 'Salón Lolita',
      description: '',
      img: './../../../assets/imgs-funCooking/SALON-LOLITA.png',
      url: '',
    },
    {
      title: 'Casa Vieja',
      description: '',
      img: './../../../assets/imgs-funCooking/CASA-VIEJA.png',
      url: '',
    },
    { title: 'Huecas del Valle', description: '', img: './../../../assets/imgs-funCooking/HUECAS-DEL-VALLE.png', url: '' },
    { title: 'Cecinas la Y', description: '', img: './../../../assets/imgs-funCooking/CECINAS-LA-Y.png', url: '' },
    { title: 'El recreo', description: '', img: '', url: '' },
  ];
}
