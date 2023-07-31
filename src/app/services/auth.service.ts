import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from 'firebase/auth';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private ProductsService: ProductsService
  ) {}
  rol: string = '';
  email: string = '';
  data: any;

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginEmailPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this.afAuth.currentUser !== null;
  }

  signInMicrosoft() {
    /*  if (this._authenticated) {
        return throwError('User is already logged in.');
    } */

    const microsoftAuthProvider = new firebase.auth.OAuthProvider(
      'microsoft.com'
    );
    microsoftAuthProvider.setCustomParameters({ tenant: 'common' });
    microsoftAuthProvider.addScope('user.read');
    microsoftAuthProvider.addScope('openid');
    microsoftAuthProvider.addScope('profile');
    // microsoftAuthProvider.addScope("mail.send");
    return this.afAuth.signInWithPopup(microsoftAuthProvider);
  }
  async logout() {
    localStorage.clear();

    this.router.navigateByUrl('/login');
    await this.afAuth.signOut();
  }

  userFirebase(dataAuth: firebase.auth.UserCredential) {
    if (dataAuth.user) {
      const user = dataAuth.user;
      const nameParts = user.displayName ? user.displayName.split(' ') : [];
      // const rol = userRole.rol;
      const userData = {
        displayName: user.displayName || '',
        mail: user.email,
        id: user.email, // Utilizar el correo electrónico como ID del documento
        givenName:
          nameParts.length > 1 ? nameParts[0] + ' ' + nameParts[1] : '',
        surname: nameParts.length > 3 ? nameParts[2] + ' ' + nameParts[3] : '',
        userPrincipalName: '',
        // rol: userRole?.rol || '',
        // Aquí, agregamos todos los datos adicionales que recibimos al autenticarnos con Microsoft
        ...dataAuth.additionalUserInfo,
      };
      this.data = userData;

      return this.firestore.collection('users').doc(this.data.mail).set(userData); // Utilizar el correo electrónico como ID del documento
    }

    return Promise.reject(
      'El usuario no está autenticado o el correo electrónico es nulo.'
    );
  }

  getEmail() {
    return this.email;
  }
  getUserData() {
    return this.data;
  }
  // Método para obtener el usuario actual autenticado
  async getCurrentUser(): Promise<Partial<User> | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userInfo = await this.getDataUser(user.email).toPromise();
      return userInfo as any;
    }
    return null;
  }
  getDataUser(user: any) {
    return this.firestore.collection('users').doc(user.email).valueChanges();
  }
  // Método para comprobar si hay un usuario autenticado
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
