import { Component, OnInit } from '@angular/core';
import { inicioData, slidesData } from 'src/app/models/worldsData';
import { ProductsService } from 'src/app/services/products.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: any = slidesData;
  items: any = inicioData;

  productos!: any[];
  recipes!: any[];


  constructor(
    private  _productsService: ProductsService,
    private _recipesService: RecipesService
  ) {}

  ngOnInit() {
    /* this._productsService.getProducts().subscribe((data: any) => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      // console.log(this.productos);
    });
    this._recipesService.getRecipes().subscribe((data) => {
      this.recipes = [];
      data.forEach((element: any) => {
        this.recipes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.recipes);
    }); */
  }
}
