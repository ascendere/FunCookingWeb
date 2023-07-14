import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {}

  agregarProduct(products: any): Promise<any> {
    return this.firestore.collection('products').add(products);
  }

  getProducts(): Observable<any> {
    return this.firestore
      .collection('products', (ref) => ref.orderBy('DateCreate', 'asc'))
      .snapshotChanges();
  }

  deleteProducts(id: string): Promise<any> {
    return this.firestore.collection('products').doc(id).delete();
  }

  getProduct(id: string): Observable<any> {
    return this.firestore.collection('products').doc(id).snapshotChanges();
  }

  updateProduct(id: string, data: any): Promise<any> {
    return this.firestore.collection('products').doc(id).update(data);
  }
}
