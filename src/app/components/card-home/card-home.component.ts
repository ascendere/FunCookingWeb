import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css'],
})
export class CardHomeComponent {
  // @Input() data: any;

  data = {
    title: 'Platos típicos de Loja',
    items: [
      {
        title: 'Comida Ecuatoriana',
        text: 'La humita o huminta (del quechua: humint’a) es una comida basada en el maíz y envuelta en la misma hoja del maíz.',
        img: './../../../assets/Inicio/Comida Ecuatoriana.jpg',
      },
      {
        title: 'Comida internacional',
        text: 'La Cecina se prepara a base de carne de cerdo fileteada adobada y que se cocina sobre el ahumado de leña.',
        img: './../../../assets/imgs-funCooking/COMIDA-INTERNACIONAL.png',
      },
      {
        title: 'Repostería',
        text: 'El Repe blanco es una sopa cremosa que se base de verde, leche, quesillo lojano y cilantro.',
        img: './../../../assets/imgs-funCooking/REPOSTERIA.png',
      },
      {
        title: 'Heladería',
        text: 'El Cuy es una especie de roedor que pesa cerca de 1 kg, el cual es adobado con diferentes especies y aliños, usualmente suele ser acompañado de papa cocinada.',
        img: './../../../assets/imgs-funCooking/HELADERIA.png',
      },
      {
        title: 'Bebidas tradicionales',
        text: 'Básicamente es un pollo asado condimentado con el marinado utilizado para el cuy, de allí sus sabores tan similares.',
        img: './../../../assets/imgs-funCooking/BEBIDAS-TRADICIONALES.png',
      },
      {
        title: 'Coctelería',
        text: 'La arveja con guineo es una sopa que se prepara con guineos o bananos verdes, arvejas, cebolla, ajo, comino, achiote, quesillo y cilantro. Se la acompaña con aguacate.',
        img: './../../../assets/imgs-funCooking/COCTELERIA.png',
      },
    ],
  };
}
