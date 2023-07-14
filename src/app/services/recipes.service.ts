import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private firestore: AngularFirestore) { }

  agregarRecipes(recipes: any): Promise<any>{
    return this.firestore.collection('recipes').add(recipes);

  }

  getRecipes(): Observable<any>{
    return this.firestore.collection('recipes', ref => ref.orderBy('DateCreate', 'asc')).snapshotChanges();
  }

  deleteRecipes(id: string): Promise<any>{
    return this.firestore.collection('recipes').doc(id).delete();

  }

  getRecipe(id: string): Observable<any>{
    return this.firestore.collection('recipes').doc(id).snapshotChanges();
  }

  updateRecipes(id: string, data:any): Promise<any>{
    return this.firestore.collection('recipes').doc(id).update(data);

  }


}
