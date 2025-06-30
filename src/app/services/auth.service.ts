import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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
  // end point
  async loginWithGoogle(): Promise<'success' | 'error'> {
    if (this.isLoggingIn) return 'error';
    this.isLoggingIn = true;

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      const idToken = await credential.user?.getIdToken();
      const email = credential.user?.email;  // Obtener el correo del usuario
      console.log(idToken);

      if (!email || !idToken) {
        throw new Error('No se pudo obtener el token o el correo');
      }

      const response = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/verifyFirebaseAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken, email: email }),  // Enviar el email junto con el token
      });

      // Guardar datos del usuario en la colección users si el login fue exitoso
      if (response.ok) {
        await this.userFirebase(credential);
      }

      this.isLoggingIn = false;
      return response.ok ? 'success' : 'error';
    } catch (error) {
      console.error(error);
      this.isLoggingIn = false;
      return 'error';
    }
  }

  // // oncall con autenticación automática de Firebase
  // async loginWithGoogle(): Promise<'success' | 'error'> {
  //   if (this.isLoggingIn) {
  //     console.log('Login en progreso...');
  //     return 'error';
  //   }

  //   this.isLoggingIn = true;
  //   console.log('Iniciando login con Google...');

  //   try {
  //     // Paso 1: Autenticar con Google
  //     const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  //     if (!credential.user) {
  //       console.error('No user found in credential');
  //       throw new Error('No user found');
  //     }

  //     console.log('Usuario autenticado:', credential.user.email);

  //     // Paso 2: Usar Firebase Functions onCall
  //     const verifyFunction = this.fns.httpsCallable('verifyFirebaseOnCall');

  //     try {
  //       console.log('🔄 Llamando función onCall...');
  //       const result = await verifyFunction({ message: 'Verificar autenticación' }).toPromise();
  //       console.log('✅ Verificación exitosa:', result);

  //       // Guardar datos del usuario
  //       await this.userFirebase(credential);

  //       // Log login exitoso
  //       await this.logLoginSuccess(credential.user.uid);

  //       return 'success';

  //     } catch (callError) {
  //       console.error('❌ Error con función onCall:', callError);

  //       // Log login fallido
  //       const errorMessage = callError instanceof Error ? callError.message : 'Error desconocido en función onCall';
  //       await this.logLoginFailure(credential.user?.uid, errorMessage);

  //       return 'error';
  //     }

  //   } catch (error) {
  //     console.error('❌ Error en loginWithGoogle:', error);

  //     // Log login fallido
  //     const errorMessage = error instanceof Error ? error.message : 'Error desconocido en login';
  //     await this.logLoginFailure(null, errorMessage);

  //     return 'error';
  //   } finally {
  //     this.isLoggingIn = false;
  //   }
  // }



  private async logLoginSuccess(uid: string) {
    try {
      await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/logLoginExitoso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid })
      });
    } catch (error) {
      console.warn('Error logging login success:', error);
    }
  }

  private async logLoginFailure(uid: string | null, detalle: string) {
    try {
      await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/logLoginFallido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, detalle })
      });
    } catch (error) {
      console.warn('Error logging login failure:', error);
    }
  }









  private saveUserData(response: any): Promise<void> {
    if (response?.user && response.user.email) {
      const userData = {
        displayName: response.user.displayName || '',
        mail: response.user.email,
        id: response.user.email, // NOTA: Es mejor práctica usar user.uid como ID del documento.
        rol: 'user', // Asignar un rol por defecto a nuevos usuarios.
        givenName: response.user.given_name || '',
        surname: response.user.family_name || '',
        userPrincipalName: response.user.userPrincipalName || '',
      };

      this.data = userData;

      // Se usa el email como ID del documento para mantener consistencia con el resto del código (ej. getDataUser).
      return this.firestore.collection('users').doc(this.data.mail).set(userData);
    }
    return Promise.resolve();
  }

  async logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    await this.afAuth.signOut();
  }

  userFirebase(dataAuth: firebase.auth.UserCredential) {
    // Solo se crea el documento si es un usuario nuevo, para no sobreescribir datos/roles existentes.
    if (dataAuth.additionalUserInfo?.isNewUser && dataAuth.user && dataAuth.user.email) {
      const user = dataAuth.user;
      const nameParts = user.displayName ? user.displayName.split(' ') : [];

      const userData = {
        displayName: user.displayName || '',
        mail: user.email,
        id: user.email, // NOTA: Es mejor práctica usar user.uid como ID del documento.
        rol: 'user', // Asignar un rol por defecto a nuevos usuarios.
        givenName: nameParts.length > 1 ? nameParts[0] + ' ' + nameParts[1] : '',
        surname: nameParts.length > 3 ? nameParts[2] + ' ' + nameParts[3] : '',
        userPrincipalName: '',
        ...dataAuth.additionalUserInfo,
      };

      this.data = userData;

      // Se usa el email como ID del documento para mantener consistencia con el resto del código (ej. getDataUser).
      return this.firestore.collection('users').doc(this.data.mail).set(userData);
    }

    // Si el usuario ya existe o no tiene email, no se hace nada.
    return Promise.resolve('Usuario ya existente o sin email.');
  }

  getEmail() {
    return this.email;
  }

  getUserData() {
    return this.data;
  }

  async getCurrentUser(): Promise<any> {
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

