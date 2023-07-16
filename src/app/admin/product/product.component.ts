import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadBytes } from '@angular/fire/storage'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  createProducts: FormGroup;
  submitted = false;
  benefitsArray: FormArray;
  derivativesArray: FormArray;
  location: FormGroup;
  preparationsArray: FormArray;
  classificationArray: FormArray;
  combinationArray: FormArray;
  productList: any[] = [];

  id: string | null;
  titleP = 'Productos';
  titleR = 'Editar Producto';

  products: {
    name: string;
    image: string[];
  } = {
    name: '',
    image: [],
  };

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private _productsService: ProductsService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createProducts = this.fb.group({
      name: ['', [Validators.required]],
      image: [],
      scientific_name: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      fiber: ['', [Validators.required]],
      fats: ['', [Validators.required]],
      carbohydrates: ['', [Validators.required]],
      proteins: ['', [Validators.required]],
      lipids: ['', [Validators.required]],
      food_Group: ['', [Validators.required]],
      benefitsArray: this.fb.array([], [Validators.required]),
      derivativesArray: this.fb.array([], [Validators.required]),
      location: this.fb.group({
        ciudadArray: this.fb.array([]),
        micromercadoArray: this.fb.array([]),
        supermercadoArray: this.fb.array([]),
      }),
      preparationsArray: this.fb.array([], [Validators.required]),
      classificationArray: this.fb.array([], [Validators.required]),
      combinationArray: this.fb.array([]),
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.benefitsArray = this.createProducts.get('benefitsArray') as FormArray;
    this.derivativesArray = this.createProducts.get(
      'derivativesArray'
    ) as FormArray;
    this.location = this.createProducts.get('location') as FormGroup;
    this.preparationsArray = this.createProducts.get(
      'preparationsArray'
    ) as FormArray;
    this.classificationArray = this.createProducts.get(
      'classificationArray'
    ) as FormArray;
    this.combinationArray = this.createProducts.get(
      'combinationArray'
    ) as FormArray;
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `imagesP/${file.name}`);

    uploadBytes(imgRef, file)
      .then((response) => {
        console.log(response);
        const url = getDownloadURL(response.ref);
        url.then((value) => {
          this.products.image.push(value); // Agregar la URL de la imagen a la matriz del formulario actual
        });
      })
      .catch((error) => console.log(error));
  }

  getImages() {
    const imagesRef = ref(this.storage, 'imagesP');

    listAll(imagesRef)
      .then(async (response) => {
        console.log(response);
        const loadedImages: string[] = []; // Crear un nuevo array para almacenar las nuevas imágenes cargadas
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          loadedImages.push(url);
        }
        this.products.image = loadedImages; // Reemplazar la matriz de imágenes con las nuevas imágenes cargadas
      })
      .catch((error) => console.log(error));
  }

  async deleteImage(event: any, index: number) {
    event.preventDefault(); // Evitar que se envíe el formulario al hacer clic en el botón "Delete"

    const imageUrl = this.products.image[index];

    try {
      // Verificar si el objeto existe antes de eliminarlo
      const imageRef = ref(this.storage, imageUrl);
      const metadata = await getMetadata(imageRef);

      // Si los metadatos existen, eliminar la imagen
      if (metadata) {
        await deleteObject(imageRef);
        console.log('Image deleted successfully');
        this.products.image.splice(index, 1); // Eliminar la URL de la imagen de la matriz del formulario actual
      } else {
        console.log('Image does not exist in Firebase Storage');
      }
    } catch (error) {
      console.log('Error deleting image:', error);
    }
  }

  ngOnInit(): void {
    this.esEditP();
  }

  get benefitsArrayControls() {
    return (this.createProducts.get('benefitsArray') as FormArray).controls;
  }

  get derivativesArrayControls() {
    return (this.createProducts.get('derivativesArray') as FormArray).controls;
  }

  get preparationsArrayControls() {
    return (this.createProducts.get('preparationsArray') as FormArray).controls;
  }

  get classificationArrayControls() {
    return (this.createProducts.get('classificationArray') as FormArray)
      .controls;
  }

  get combinationArrayControls() {
    return (this.createProducts.get('combinationArray') as FormArray).controls;
  }

  addBenefit() {
    this.benefitsArray.push(this.fb.control(''));
  }

  removeBenefit(index: number) {
    this.benefitsArray.removeAt(index);
  }

  addDerivative() {
    this.derivativesArray.push(this.fb.control(''));
  }

  removeDerivative(index: number) {
    this.derivativesArray.removeAt(index);
  }

  // Agregar un nuevo elemento al grupo location
  addLocation() {
    const locationGroup = this.fb.group({
      ciudadArray: this.fb.array([]),
      micromercadoArray: this.fb.array([]),
      supermercadoArray: this.fb.array([]),
    });

    this.location = locationGroup;
  }

  // Eliminar el grupo location
  removeLocation() {
    this.createProducts.removeControl('location');
  }

  getCiudadArray() {
    const locationControl = this.getLocationControl();
    return locationControl?.get('ciudadArray') as FormArray;
  }

  getMicromercadoArray() {
    const locationControl = this.getLocationControl();
    return locationControl?.get('micromercadoArray') as FormArray;
  }

  getSupermercadoArray() {
    const locationControl = this.getLocationControl();
    return locationControl?.get('supermercadoArray') as FormArray;
  }

  // Obtener el control del grupo location
  getLocationControl() {
    return this.createProducts.get('location');
  }

  addCiudad() {
    const ciudadArray = this.getCiudadArray();

    // Verificar si el control ya existe en el arreglo
    const isExistingControl = ciudadArray?.controls.some(
      (control) => control.value === ''
    );

    if (!isExistingControl) {
      ciudadArray?.push(this.fb.control(''));
    }
  }

  addMicromercado() {
    const micromercadoArray = this.getMicromercadoArray();

    // Verificar si el control ya existe en el arreglo
    const isExistingControl = micromercadoArray?.controls.some(
      (control) => control.value === ''
    );

    if (!isExistingControl) {
      micromercadoArray?.push(this.fb.control(''));
    }
  }

  addSupermercado() {
    const supermercadoArray = this.getSupermercadoArray();

    // Verificar si el control ya existe en el arreglo
    const isExistingControl = supermercadoArray?.controls.some(
      (control) => control.value === ''
    );

    if (!isExistingControl) {
      supermercadoArray?.push(this.fb.control(''));
    }
  }

  // Eliminar un elemento del arreglo ciudadArray en el índice dado
  removeCiudad(index: number) {
    const ciudadArray = this.getCiudadArray();
    ciudadArray?.removeAt(index);
  }

  // Eliminar un elemento del arreglo micromercadoArray en el índice dado
  removeMicromercado(index: number) {
    const micromercadoArray = this.getMicromercadoArray();
    micromercadoArray?.removeAt(index);
  }

  // Eliminar un elemento del arreglo supermercadoArray en el índice dado
  removeSupermercado(index: number) {
    const supermercadoArray = this.getSupermercadoArray();
    supermercadoArray?.removeAt(index);
  }

  addPreparations() {
    this.preparationsArray.push(this.fb.control(''));
  }

  removePreparations(index: number) {
    this.preparationsArray.removeAt(index);
  }

  addClassification() {
    this.classificationArray.push(this.fb.control(''));
  }

  removeClassification(index: number) {
    this.classificationArray.removeAt(index);
  }

  addCombination() {
    const combinationGroup = this.fb.group({
      name: [''],
      porcentage: [''],
    });

    // Obtén la referencia al FormArray "combinationArray"
    const combinationArray = this.createProducts.get(
      'combinationArray'
    ) as FormArray;

    // Agrega el nuevo FormGroup al FormArray "combinationArray" y asigna los valores
    combinationArray.push(
      this.fb.group({
        name: combinationGroup.get('name')?.value,
        porcentage: combinationGroup.get('porcentage')?.value,
      })
    );
  }

  removeCombination(index: number) {
    this.combinationArray.removeAt(index);
  }

  getControlFromArray(array: FormArray, index: number) {
    return array?.controls[index] as FormControl;
  }

  getControlValueFromArray(array: FormArray, index: number) {
    const control = this.getControlFromArray(array, index);
    return control ? control.value : null;
  }

  getControlValuesFromArray(array: FormArray) {
    return array ? array.controls.map((control) => control.value) : [];
  }

  getCiudadArraysControls() {
    return this.getControlValuesFromArray(this.getCiudadArray());
  }

  getMicromercadoArraysControls() {
    return this.getControlValuesFromArray(this.getMicromercadoArray());
  }

  getSupermercadoArraysControls() {
    return this.getControlValuesFromArray(this.getSupermercadoArray());
  }

  addEditProducts() {
    this.submitted = true;

    if (this.createProducts.invalid) {
      return;
    }
    if (this.id == null) {
      this.addProducts();
    } else {
      this.editProduct(this.id);
    }
  }

  addProducts() {
    const combinationValues = this.combinationArray.controls.map(
      (control, i) => ({
        name: control.get('name')?.value,
        porcentage: control.get('porcentage')?.value,
      })
    );
    const locationGroup = this.fb.group({
      ciudadArray: this.fb.array(this.getCiudadArraysControls()),
      micromercadoArray: this.fb.array(this.getMicromercadoArraysControls()),
      supermercadoArray: this.fb.array(this.getSupermercadoArraysControls()),
    });

    const products: any = {
      name: this.createProducts.value.name,
      image: this.products.image,
      scientific_name: this.createProducts.value.scientific_name,
      calories: this.createProducts.value.calories,
      fiber: this.createProducts.value.fiber,
      fats: this.createProducts.value.fats,
      carbohydrates: this.createProducts.value.carbohydrates,
      proteins: this.createProducts.value.proteins,
      lipids: this.createProducts.value.lipids,
      food_Group: this.createProducts.value.food_Group,
      benefitsArray: this.createProducts.value.benefitsArray,
      derivativesArray: this.createProducts.value.derivativesArray,
      location: locationGroup.value,
      preparationsArray: this.createProducts.value.preparationsArray,
      classificationArray: this.createProducts.value.classificationArray,
      combinationArray: combinationValues,
      DateCreate: new Date(),
      DateUpdate: new Date(),
    };

    this._productsService
      .agregarProduct(products)
      .then(() => {
        console.log('producto registrado con éxito!');
        this.router.navigate(['/list-products']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  editProduct(id: string) {
    const combinationValues = this.combinationArray.controls.map(
      (control, i) => ({
        name: control.get('name')?.value,
        porcentage: control.get('porcentage')?.value,
      })
    );

    const locationGroup = this.fb.group({
      ciudadArray: this.fb.array(this.getCiudadArraysControls()),
      micromercadoArray: this.fb.array(this.getMicromercadoArraysControls()),
      supermercadoArray: this.fb.array(this.getSupermercadoArraysControls()),
    });

    const products: any = {
      name: this.createProducts.get('name')?.value,
      image: this.products.image,
      scientific_name: this.createProducts.get('scientific_name')?.value,
      calories: this.createProducts.get('calories')?.value,
      fiber: this.createProducts.get('fiber')?.value,
      fats: this.createProducts.get('fats')?.value,
      carbohydrates: this.createProducts.get('carbohydrates')?.value,
      proteins: this.createProducts.get('proteins')?.value,
      lipids: this.createProducts.get('lipids')?.value,
      food_Group: this.createProducts.get('food_Group')?.value,
      benefitsArray: this.createProducts.get('benefitsArray')?.value,
      derivativesArray: this.createProducts.get('derivativesArray')?.value,
      location: locationGroup.value,
      preparationsArray: this.createProducts.get('preparationsArray')?.value,
      classificationArray: this.createProducts.get('classificationArray')
        ?.value,
      combinationArray: combinationValues,
      DateUpdate: new Date(),
    };

    this._productsService.updateProduct(id, products).then(() => {
      this.router.navigate(['/list-products']);
    });
  }

  esEditP() {
    this.titleR = 'Edit Products';
    if (this.id !== null) {
      this._productsService.getProduct(this.id).subscribe((data) => {
        console.log(data.payload.data()?.name);
        console.log(data.payload.data()?.location);
        this.createProducts.patchValue({
          name: data.payload.data()?.name,
          scientific_name: data.payload.data()?.scientific_name,
          calories: data.payload.data()?.calories,
          fiber: data.payload.data()?.fiber,
          fats: data.payload.data()?.fats,
          carbohydrates: data.payload.data()?.carbohydrates,
          proteins: data.payload.data()?.proteins,
          lipids: data.payload.data()?.lipids,
          food_Group: data.payload.data()?.food_Group,
        });
        const locationData = data.payload.data()?.location;
        if (locationData) {
          const ciudadArray = this.getCiudadArray();
          const micromercadoArray = this.getMicromercadoArray();
          const supermercadoArray = this.getSupermercadoArray();

          // Vaciar los arrays antes de agregar nuevos elementos
          ciudadArray.clear();
          micromercadoArray.clear();
          supermercadoArray.clear();

          if (locationData.ciudadArray) {
            locationData.ciudadArray.forEach((value: string) => {
              ciudadArray?.push(this.fb.control(value));
            });
          }

          if (locationData.micromercadoArray) {
            locationData.micromercadoArray.forEach((value: string) => {
              micromercadoArray?.push(this.fb.control(value));
            });
          }

          if (locationData.supermercadoArray) {
            locationData.supermercadoArray.forEach((value: string) => {
              supermercadoArray?.push(this.fb.control(value));
            });
          }
        }

        // Obtener las imágenes asociadas al producto y agregarlas a la matriz products.image
        const imageUrls: string[] = data.payload.data()['image'];
        this.products.image = imageUrls;
        // Verificar los controles del formulario después de un retraso de 0 ms

        setTimeout(() => {
          this.setFormArrayValues(data.payload.data());
        }, 0);
      });
    }
  }

  setFormArrayValues(data: any) {
    this.setArrayValues(this.benefitsArray, data.benefitsArray);
    this.setArrayValues(this.derivativesArray, data.derivativesArray);
    this.setLocationValues(this.location, data.location);
    this.setArrayValues(this.preparationsArray, data.preparationsArray);
    this.setArrayValues(this.classificationArray, data.classificationArray);
    this.setCombinationArrayValues(data.combinationArray);
  }

  setCombinationArrayValues(values: any[]) {
    this.combinationArray.clear();
    values.forEach((value) => {
      const combinationGroup = this.fb.group({
        name: [value.name],
        porcentage: [value.porcentage],
      });
      this.combinationArray.push(combinationGroup);
    });
  }

  setLocationValues(location: FormGroup, data: any) {
    if (data) {
      const ciudadArray = this.getCiudadArray();
      const micromercadoArray = this.getMicromercadoArray();
      const supermercadoArray = this.getSupermercadoArray();

      // Vaciar los arrays antes de agregar nuevos elementos
      ciudadArray.clear();
      micromercadoArray.clear();
      supermercadoArray.clear();

      if (data.ciudadArray) {
        data.ciudadArray.forEach((value: string) => {
          ciudadArray?.push(this.fb.control(value));
        });
      }

      if (data.micromercadoArray) {
        data.micromercadoArray.forEach((value: string) => {
          micromercadoArray?.push(this.fb.control(value));
        });
      }

      if (data.supermercadoArray) {
        data.supermercadoArray.forEach((value: string) => {
          supermercadoArray?.push(this.fb.control(value));
        });
      }
    }
  }

  setArrayValues(array: FormArray, values: any[]) {
    array.clear();
    values.forEach((value) => {
      array.push(this.fb.control(value));
    });
  }

  setFormGroupValues(formGroup: FormGroup, values: any) {
    formGroup.patchValue(values);
  }
}
