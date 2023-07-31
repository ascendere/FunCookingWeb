import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  doc: String = '0';
  constructor(private firestore: AngularFirestore) {}

  agregarProduct(products: any): Promise<any> {
    return this.firestore.collection('products').add(products);
  }

  getProducts(): Observable<any> {
    // console.log(this.firestore.collection('products', (ref) => ref.orderBy('DateCreate', 'asc')).snapshotChanges());

    return this.firestore
      .collection('products', (ref) => ref.orderBy('DateCreate', 'asc'))
      .snapshotChanges();
  }

  getRoles(){

    // console.log(this.firestore.collection('roles', (ref) => ref.orderBy('rol', 'asc')).snapshotChanges());

    return this.firestore.collection('roles').snapshotChanges();
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
