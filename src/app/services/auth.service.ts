import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from 'firebase/auth';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggingIn: boolean = false;
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
    const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');
    microsoftAuthProvider.setCustomParameters({ tenant: 'common' });
    microsoftAuthProvider.addScope('user.read');
    microsoftAuthProvider.addScope('openid');
    microsoftAuthProvider.addScope('profile');
    return this.afAuth.signInWithPopup(microsoftAuthProvider);
  }
//Manejo del logeo con Google y tambien la enviada de un token a la API externa

loginWithGoogle(): Promise<firebase.auth.UserCredential> {
  if (this.isLoggingIn) return Promise.reject('Login ya en proceso');
  this.isLoggingIn = true;

  return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(async (credential) => {
      const user = credential.user;
      if (!user) throw new Error('Usuario no encontrado');

      const idToken = await user.getIdToken(/* forceRefresh */ true);
      //
      const response = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/validateTokenNew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ token: idToken })
      });

      if (!response.ok) throw new Error('Error al validar con la API local');
      const result = await response.json();

      if (result?.authorized && result?.token) {
        //recibe el token temporal
        const response2 = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/verifyUniqueToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: result.token })
        });

        const finalResult = await response2.json();
        if (finalResult.valid) {
          localStorage.setItem('auth_token', result.token);
          return credential;
        } else {
          throw new Error('Token temporal inválido o ya usado');
        }
      } else {
        throw new Error('Usuario no autorizado por el primer filtro');
      }
    })
    .finally(() => {
      this.isLoggingIn = false;
    });
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

      const userData = {
        displayName: user.displayName || '',
        mail: user.email,
        id: user.email,
        givenName: nameParts.length > 1 ? nameParts[0] + ' ' + nameParts[1] : '',
        surname: nameParts.length > 3 ? nameParts[2] + ' ' + nameParts[3] : '',
        userPrincipalName: '',
        ...dataAuth.additionalUserInfo,
      };

      this.data = userData;

      return this.firestore.collection('users').doc(this.data.mail).set(userData);
    }

    return Promise.reject('El usuario no está autenticado o el correo electrónico es nulo.');
  }

  getEmail() {
    return this.email;
  }

  getUserData() {
    return this.data;
  }

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

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
