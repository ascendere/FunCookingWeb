import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Storage, deleteObject, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private _productsService: ProductsService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productsService.getProducts().subscribe((data: any) => {
      this.products = [];
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.products);
    });
  }

  deleteProducts(id: string) {
    // Obtener el producto a eliminar
    const productToDelete = this.products.find((product) => product.id === id);

    // Eliminar las imágenes asociadas al producto
    productToDelete.image.forEach((imageUrl: string) => {
      this.deleteImage(imageUrl)
        .then(() => {
          console.log('Image deleted successfully');
        })
        .catch((error) => {
          console.log('Error deleting image:', error);
        });
    });

    // Eliminar el producto de la base de datos
    this._productsService
      .deleteProducts(id)
      .then(() => {
        console.log('Product deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting product:', error);
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
