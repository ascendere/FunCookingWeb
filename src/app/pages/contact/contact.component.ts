import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  users: any[] = [
    {
      name: 'Diego Leiva',
      cargo: 'Gerente',
      img: './../../../assets/users/users/DiegoLeiva.png',
      frase:
        'Como gerente de Ecua Taste me complace que este proyecto pueda ayudar a la población lojana a seguir disfrutando estos platos típicos',
      tel: '0987612137',
      correo: 'djleiva@utpl.edu.ec',
    },
    {
      name: 'Anthonny Espinosa',
      cargo: 'Equipo de Desarrollo',
      img: './../../../assets/users/users/AntonnyEspinosa.png',
      frase:
        'Me enorgullece formar parte de este gran proyecto con el cual ayudar a mantener vivas nuestras tan grandiosa gastronomía Lojana',
      tel: '0978684407',
      correo: 'adespinosa5@utpl.edu.ec',
    },
    {
      name: 'Carlos Castillo',
      cargo: 'Equipo de Desarrollo',
      img: './../../../assets/users/users/CarlosCastillo.png',
      frase:
        'El servir a las personas siempre va a ser algo fundamental, todos dependemos de todos, pero se debe hacer con justicia y amor.',
      tel: '0985042528',
      correo: 'cacastillo34@utpl.edu.ec',
    },
    {
      name: 'Isaías Silva',
      cargo: 'Equipo de Desarrollo',
      img: './../../../assets/users/users/IsaíasSilva.png',
      frase:
        'La función de un buen software es hacer que lo complejo aparente ser simple',
      tel: '09876346137',
      correo: 'jisilva1@utpl.edu.ec',
    },
  ];
}
