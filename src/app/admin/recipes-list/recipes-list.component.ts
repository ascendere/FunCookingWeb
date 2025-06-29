import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage, deleteObject, ref } from '@angular/fire/storage';
import { RecipesService } from 'src/app/services/recipes.service';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes: any[] = [];

  constructor(
    private _recipesService: RecipesService,
    private storage: Storage,
    private router: Router,
    private logsService: LogsService // <--- Agrega esto
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this._recipesService.getRecipes().subscribe((data) => {
      this.recipes = [];
      data.forEach((element: any) => {
        this.recipes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.recipes);
    });
  }

  deleteRecipes(id: string) {
    // Obtener el producto a eliminar
    const recipeDelete = this.recipes.find((recipes) => recipes.id === id);

    // Eliminar las imágenes asociadas al producto
    recipeDelete.image.forEach((imageUrl: string) => {
      this.deleteImage(imageUrl)
        .then(() => {
          console.log('Image deleted successfully');
        })
        .catch((error) => {
          console.log('Error deleting image:', error);
        });
    });

    this._recipesService
      .deleteRecipes(id)
      .then(() => {
        this.logsService.logDeleteRecipe(id);
        console.log('receta eliminado con exito');
      })
      .catch((error) => {
        this.logsService.logErrorDeleteRecipe(id, error);
        console.log(error);
      });
  }

  async deleteImage(imageUrl: string) {
    const imageRef = ref(this.storage, imageUrl);
    await deleteObject(imageRef);
  }

  redirectToURL(url: string) {
    this.router.navigateByUrl(url);
  }
}
