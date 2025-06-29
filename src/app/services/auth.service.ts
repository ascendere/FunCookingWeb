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
    private functions: AngularFireFunctions,
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
// async loginWithGoogle(): Promise<'success' | 'error'> {
//   if (this.isLoggingIn) return 'error';
//   this.isLoggingIn = true;

//   try {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const credential = await this.afAuth.signInWithPopup(provider);
//     const idToken = await credential.user?.getIdToken();
//     const email = credential.user?.email;  // Obtener el correo del usuario
//     console.log(idToken);

//     if (!email || !idToken) {
//       throw new Error('No se pudo obtener el token o el correo');
//     }

//     const response = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/verifyFirebaseAuth', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: idToken, email: email }),  // Enviar el email junto con el token
//     });

//     // Guardar datos del usuario en la colección users si el login fue exitoso
//     if (response.ok) {
//       await this.userFirebase(credential);
//     }

//     this.isLoggingIn = false;
//     return response.ok ? 'success' : 'error';
//   } catch (error) {
//     console.error(error);
//     this.isLoggingIn = false;
//     return 'error';
//   }
// }


  // oncall con autenticación automática de Firebase
  async loginWithGoogle(): Promise<'success' | 'error'> {
    if (this.isLoggingIn) {
      console.log('Login en progreso...');
      return 'error';
    }

    this.isLoggingIn = true;
    console.log('Iniciando login con Google...');

    try {
      // Paso 1: Autenticar con Google
      const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      
      if (!credential.user) {
        console.error('No user found in credential');
        throw new Error('No user found');
      }
      
      console.log('Usuario autenticado:', credential.user.email);
      
      // Paso 2: Esperar a que el estado de auth se establezca correctamente
      await this.waitForAuthState(credential.user.uid);
      
      // Paso 3: Obtener token
      const idToken = await credential.user.getIdToken(true);
      console.log('Token obtenido:', idToken ? 'Sí' : 'No');
      
      // Paso 4: SOLUCIÓN CON HTTP POST a la función correcta
      try {
        console.log('🔄 Usando HTTP POST con función verifyFirebaseAuth...');
        
        // Usar la función HTTP que está correctamente configurada
        const response = await fetch('https://us-central1-funcooking2-72cbd.cloudfunctions.net/verifyFirebaseAuth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: idToken,
            email: credential.user?.email
          })
        });
        
        console.log('📡 Respuesta HTTP status:', response.status);
        
        if (response.status === 200) {
          console.log('✅ Verificación exitosa con HTTP POST');
          await this.userFirebase(credential);
          return 'success';
        } else {
          const errorText = await response.text();
          console.error('❌ Error HTTP POST:', response.status, errorText);
        }
        
      } catch (httpError) {
        console.log('❌ Error con llamada HTTP:', httpError);
      }
      
      console.error('❌ No se pudo verificar la autenticación');
      return 'error';
      
    } catch (error) {
      console.error('❌ Error en loginWithGoogle:', error);
      return 'error';
    } finally {
      this.isLoggingIn = false;
    }
  }

  private waitForAuthState(expectedUid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this.afAuth.authState.subscribe(user => {
        if (user && user.uid === expectedUid) {
          subscription.unsubscribe();
          // Esperar un poco más para que el contexto se propague
          setTimeout(() => resolve(), 1000);
        }
      });

      // Timeout de seguridad
      setTimeout(() => {
        subscription.unsubscribe();
        reject(new Error('Timeout esperando estado de auth'));
      }, 10000);
    });
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
