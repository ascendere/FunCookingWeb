import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorldsData } from 'src/app/models/worldsData';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  idCocina!: string;
  id!: string;
  data!: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void { //Funcion que se ejecuta antes que se carge el componente
    this.idCocina = this.route.snapshot.params['idCocina'];
    this.id = this.route.snapshot.params['id'];
    // console.log('Funciona', 'idCocina: ', this.idCocina, 'id', this.id);

    if (!!this.id){
      const world = WorldsData.find(wd => wd.id === this.idCocina);
      if (!!world) {
        this.data = world.pages?.find(page => page?.id === this.id);
      }
    } else {
      this.data = WorldsData.find(wd => wd.id === this.idCocina);
    }
  }
}
