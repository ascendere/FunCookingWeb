import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private productsCollection: CollectionReference<any>;
  private recipesCollection: CollectionReference<any>;

  constructor(afs: Firestore) {
    this.productsCollection = collection(afs, 'products');
    this.recipesCollection = collection(afs, 'recipes');
  }

  // products
  /* agregarProducto(products: any): Promise<any> {
    return this.firestore.collection('products').add(products);
  } */
  getProducts = (): Observable<any[]> => {
    return collectionData(this.productsCollection);
  };

  // recipies
  getRecipes = (): Observable<any[]> => {
    return collectionData(this.recipesCollection);
  };
}
