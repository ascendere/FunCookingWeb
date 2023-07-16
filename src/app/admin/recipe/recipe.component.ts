import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  createRecipes: FormGroup;
  submitted = false;
  procedureArray: FormArray;
  extraDataArray: FormArray;
  ingredientsArray: FormArray;

  recipes: {
    name: string;
    image: string[];
  } = {
    name: '',
    image: [],
  };

  id: string | null;
  titleR = 'Añadir Receta';

  constructor(
    private fb: FormBuilder,
    private _recipesService: RecipesService,
    private storage: Storage,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createRecipes = this.fb.group({
      name: ['', Validators.required],
      clasification: ['', Validators.required],
      difficulty: ['', Validators.required],
      performance: ['', Validators.required],
      time: ['', Validators.required],
      ingredientsArray: this.fb.array([], Validators.required),
      image: [],
      procedureArray: this.fb.array([], [Validators.required]),
      extraDataArray: this.fb.array([], [Validators.required]),
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.ingredientsArray = this.createRecipes.get(
      'ingredientsArray'
    ) as FormArray;
    this.procedureArray = this.createRecipes.get('procedureArray') as FormArray;
    this.extraDataArray = this.createRecipes.get('extraDataArray') as FormArray;
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `imagesR/${file.name}`);

    uploadBytes(imgRef, file)
      .then((response) => {
        console.log(response);
        const url = getDownloadURL(response.ref);
        url.then((value) => {
          this.recipes.image.push(value); // Agregar la URL de la imagen a la matriz del formulario actual
        });
      })
      .catch((error) => console.log(error));
  }

  getImages() {
    const imagesRef = ref(this.storage, 'imagesR');

    listAll(imagesRef)
      .then(async (response) => {
        console.log(response);
        const loadedImages: string[] = []; // Crear un nuevo array para almacenar las nuevas imágenes cargadas
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          loadedImages.push(url);
        }
        this.recipes.image = loadedImages; // Reemplazar la matriz de imágenes con las nuevas imágenes cargadas
      })
      .catch((error) => console.log(error));
  }

  async deleteImage(event: any, index: number) {
    event.preventDefault(); // Evitar que se envíe el formulario al hacer clic en el botón "Delete"

    const imageUrl = this.recipes.image[index];

    try {
      // Verificar si el objeto existe antes de eliminarlo
      const imageRef = ref(this.storage, imageUrl);
      const metadata = await getMetadata(imageRef);

      // Si los metadatos existen, eliminar la imagen
      if (metadata) {
        await deleteObject(imageRef);
        console.log('Image deleted successfully');
        this.recipes.image.splice(index, 1); // Eliminar la URL de la imagen de la matriz del formulario actual
      } else {
        console.log('Image does not exist in Firebase Storage');
      }
    } catch (error) {
      console.log('Error deleting image:', error);
    }
  }

  ngOnInit(): void {
    this.esEditR();
  }

  get procedureArrayControls() {
    return (this.createRecipes.get('procedureArray') as FormArray).controls;
  }

  get extraDataArrayControls() {
    return (this.createRecipes.get('extraDataArray') as FormArray).controls;
  }

  get ingredientsArrayControls() {
    return (this.createRecipes.get('ingredientsArray') as FormArray).controls;
  }

  addProcedure() {
    this.procedureArray.push(this.fb.control(''));
  }

  removeProcedure(index: number) {
    this.procedureArray.removeAt(index);
  }

  addExtraData() {
    this.extraDataArray.push(this.fb.control(''));
  }

  removeExtraData(index: number) {
    this.extraDataArray.removeAt(index);
  }

  addIngredients() {
    const ingredientsGroup = this.fb.group({
      ingredients: [''],
      quantities: [''],
      extent: [''],
    });

    // Obtén la referencia al FormArray "ingredientsArray"
    const ingredientsArray = this.createRecipes.get(
      'ingredientsArray'
    ) as FormArray;

    // Agrega el nuevo FormGroup al FormArray "ingredientsArray" y asigna los valores
    ingredientsArray.push(
      this.fb.group({
        ingredients: ingredientsGroup.get('ingredients')?.value,
        quantities: ingredientsGroup.get('quantities')?.value,
        extent: ingredientsGroup.get('extent')?.value,
      })
    );
  }

  removeIngredients(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  addEditRecipes() {
    this.submitted = true;

    if (this.createRecipes.invalid) {
      return;
    }

    if (this.id == null) {
      this.addRecipes();
    } else {
      this.editRecipes(this.id);
    }
  }

  addRecipes() {
    const ingredientsValues = this.ingredientsArray.controls.map(
      (control, i) => ({
        ingredients: control.get('ingredients')?.value,
        quantities: control.get('quantities')?.value,
        extent: control.get('extent')?.value,
      })
    );
    const recipes: any = {
      name: this.createRecipes.value.name,
      clasification: this.createRecipes.value.clasification,
      difficulty: this.createRecipes.value.difficulty,
      performance: this.createRecipes.value.performance,
      time: this.createRecipes.value.time,
      ingredientsArray: ingredientsValues,
      image: this.recipes.image,
      procedureArray: this.createRecipes.value.procedureArray,
      extraDataArray: this.createRecipes.value.extraDataArray,
      DateCreate: new Date(),
      DateUpdate: new Date(),
    };
    this._recipesService
      .agregarRecipes(recipes)
      .then(() => {
        console.log('receta registrada con exito!');
        this.router.navigate(['/list-recipes']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  editRecipes(id: string) {
    const ingredientsValues = this.ingredientsArray.controls.map(
      (control, i) => ({
        ingredients: control.get('ingredients')?.value,
        quantities: control.get('quantities')?.value,
        extent: control.get('extent')?.value,
      })
    );

    const recipes: any = {
      name: this.createRecipes.get('name')?.value,
      clasification: this.createRecipes.get('clasification')?.value,
      difficulty: this.createRecipes.get('difficulty')?.value,
      performance: this.createRecipes.get('performance')?.value,
      time: this.createRecipes.get('time')?.value,
      ingredientsArray: ingredientsValues,
      image: this.recipes.image,
      procedureArray: this.createRecipes.get('procedureArray')?.value,
      extraDataArray: this.createRecipes.get('extraDataArray')?.value,
      DateUpdate: new Date(),
    };

    this._recipesService.updateRecipes(id, recipes).then(() => {
      this.router.navigate(['/list-recipes']);
    });
  }

  esEditR() {
    this.titleR = 'Editar Receta';
    if (this.id !== null) {
      this._recipesService.getRecipe(this.id).subscribe((data) => {
        console.log(data.payload.data()?.name);
        this.createRecipes.patchValue({
          name: data.payload.data()?.name,
          clasification: data.payload.data()?.clasification,
          difficulty: data.payload.data()?.difficulty,
          performance: data.payload.data()?.performance,
          time: data.payload.data()?.time,
        });

        // Obtener las imágenes asociadas al producto y agregarlas a la matriz products.image
        const imageUrls: string[] = data.payload.data()['image'];
        this.recipes.image = imageUrls;
        // Verificar los controles del formulario después de un retraso de 0 ms

        setTimeout(() => {
          this.setFormArrayValues(data.payload.data());
        }, 0);
      });
    }
  }
  setFormArrayValues(data: any) {
    this.setArrayValues(this.procedureArray, data.procedureArray);
    this.setArrayValues(this.extraDataArray, data.extraDataArray);
    this.setIngredientsArrayValues(data.ingredientsArray);
  }
  setArrayValues(array: FormArray, values: any[]) {
    array.clear();
    values.forEach((value) => {
      array.push(this.fb.control(value));
    });
  }

  setIngredientsArrayValues(values: any[]) {
    this.ingredientsArray.clear();
    values.forEach((value) => {
      const ingredientsGroup = this.fb.group({
        ingredients: [value.ingredients],
        quantities: [value.quantities],
        extent: [value.extent],
      });
      this.ingredientsArray.push(ingredientsGroup);
    });
  }
}
