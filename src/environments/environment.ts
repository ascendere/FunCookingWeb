import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

export const environment = {
  firebase: {
    apiKey: 'AIzaSyDg8TCiGMTINvfWsirIgm3A64vKQhBvV44',
    authDomain: 'funcooking2-72cbd.firebaseapp.com',
    projectId: 'funcooking2-72cbd',
    storageBucket: 'funcooking2-72cbd.appspot.com',
    messagingSenderId: '706472229913',
    appId: '1:706472229913:web:14840d8eecf89f2b097e88',
  },
  production: false,
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'ebebb7cc-fee7-4d8e-a7f6-e5e2651abab0', // clave azure
      redirectUri: 'http://localhost:4200/inicio', // a que pagina ir despues de login
      postLogoutRedirectUri: 'http://localhost:4200/inicio', // a que pagina ir despues de login
      // postLogoutRedirectUri: 'http://localhost:4200/contacto', // a que pagina ir despues de cerrar sesión
    },
  });
}
