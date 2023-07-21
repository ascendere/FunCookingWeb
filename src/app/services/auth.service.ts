import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginEmailPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
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
}
function from(signIn: Promise<firebase.auth.UserCredential>) {
  throw new Error('Function not implemented.');
}
