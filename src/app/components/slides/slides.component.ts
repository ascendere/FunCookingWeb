import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
})
export class SlidesComponent {
  // @Input() data: any;
  data: any[] = [
    {
      title: 'Cantaclaro',
      text: 'Es un aguardiente refinado y elaborado con el zumo puro de caña de azúcar de altura cultivadas en los valles de Vilcabamba, Malacatos y Quinara, mejorando en su calidad y pureza con la mundialmente “cachaca” brasilera lo cual garantiza un producto superior de características únicas.',
      img: './../../../assets/imgs-funCooking/CANTACLARO.png',
    },
    {
      title: 'Comida Típica en Ecuador',
      text: 'Arveja con guineo, repe, sango, cuy asado, gallina cuyada, cecina de cerdo, horchata, miel con quesillo… son algunos platos típicos que identifican a la capital lojana. Estos son degustados por los 950 000 turistas nacionales y extranjeros que llegan cada año a la ciudad.',
      img: './../../../assets/Inicio/Comida Ecuatoriana.jpg',
    },
    {
      title: 'Cecina',
      text: 'La Cecina se prepara a base de carne de cerdo fileteada de forma muy delgada y uniforme, es adobada con sal y aliño para posteriormente ponerla a secar al sol por tres horas luego se la cocina sobre el ahumado de leña.',
      img: './../../../assets/imgs-funCooking/CECINA.png',
    },
    {
      title: 'Salón Lolita',
      text: 'Ubicado en la Salvador Bustamante Celi y Guayaquil Salón Lolita es un restaurante especializado en comida típica Lojana con varios años de trayectoria satisfaciendo los paladares lojanos con su exquisita sazón.',
      img: './../../../assets/imgs-funCooking/SALON-LOLITA.png',
    },
    {
      title: 'Miel con Quesillo',
      text: 'Un postre sencillo pero delicioso consiste en derretir la panela en agua, donde hierve hasta coger cierta consistencia; una vez fría se le agrega quesillo en pedazos.',
      img: './../../../assets/imgs-funCooking/MIEL-CON-QUESILLO.png',
    },
  ];
}
