import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from 'firebase/auth';
import { ProductsService } from './products.service';




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggingIn: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private fns: AngularFireFunctions,
    private ProductsService: ProductsService

  ) { }

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
  /*
      async loginWithGoogle(): Promise<'success' | 'error'> {
        if (this.isLoggingIn) return 'error';
        this.isLoggingIn = true;
    
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const credential = await this.afAuth.signInWithPopup(provider);
          const idToken = await credential.user?.getIdToken();
          console.log(idToken);
    
          const response = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/verifyFirebaseAuth', {
            method: 'POST',
            // implemantar el header aqui
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: idToken }),
            
          });
    
          this.isLoggingIn = false;
          return response.ok ? 'success' : 'error';
        } catch (error) {
          this.isLoggingIn = false;
          return 'error';
        }
      }
  */
  //onCall
  async loginWithGoogle(): Promise<'success' | 'error'> {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await this.afAuth.signInWithPopup(provider);

    // Espera a que authState emita el usuario autenticado
    const authUser = await new Promise<firebase.User | null>(resolve => {
      const sub = this.afAuth.authState.subscribe(user => {
        if (user) {
          sub.unsubscribe();
          resolve(user);
        }
      });
      setTimeout(() => {
        sub.unsubscribe();
        resolve(null);
      }, 3000);
    });

    if (!authUser) {
      console.log('No user in authState after signInWithPopup');
      return 'error';
    }
    console.log('authState user:', authUser.email);

    // NUEVO: Verifica el usuario actual en AngularFireAuth
    const currentUser = await this.afAuth.currentUser;
    console.log('currentUser:', currentUser);

    // Ahora sí, llama a la función onCall
    const callable = this.fns.httpsCallable('verifyFirebaseOnCall');
    const functionResult = await callable({}).toPromise();

    console.log('Resultado de la función:', functionResult);
    return (functionResult as any)?.status === 'success' ? 'success' : 'error';

  } catch (error) {
    console.error('Error durante la autenticación o llamada a la función:', error);
    if ((error as any).code) {
      console.error('Firebase Error Code:', (error as any).code);
    }
    return 'error';
  }
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
    if (user && user.email) {
      const userInfo = await this.getDataUser(user).toPromise();
      return userInfo as any;
    }
    return null;
  }

  getDataUser(user: any) {
    if (!user || !user.email) {
      // console.warn('getDataUser: usuario o email es null');
      return new Observable(observer => observer.complete());
    }

    return this.firestore.collection('users').doc(user.email).valueChanges();
  }


  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
