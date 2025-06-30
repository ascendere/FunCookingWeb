import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private baseUrl = 'https://us-central1-funcooking2-72cbd.cloudfunctions.net';

  constructor() { }

  // Login logs
  async logLoginExitoso(detalle: string = "Inicio de sesión exitoso"): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logLoginExitoso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, detalle })
      });
    } catch (error) {
      console.warn('Error logging login success:', error);
      return;
    }
  }

  async logLoginFallido(detalle: string = "Intento fallido de inicio de sesión"): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logLoginFallido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid || null, detalle })
      });
    } catch (error) {
      console.warn('Error logging login failure:', error);
      return;
    }
  }

  async logLogout(): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logLogout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid })
      });
    } catch (error) {
      console.warn('Error logging logout:', error);
      return;
    }
  }

  // Product logs
  async logCreateProduct(nombre: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logCreateProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, nombre })
      });
    } catch (error) {
      console.warn('Error logging product creation:', error);
      return;
    }
  }

  async logEditProduct(id: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logEditProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id })
      });
    } catch (error) {
      console.warn('Error logging product edit:', error);
      return;
    }
  }

  async logDeleteProduct(id: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logDeleteProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id })
      });
    } catch (error) {
      console.warn('Error logging product deletion:', error);
      return;
    }
  }

  // Recipe logs
  async logCreateRecipe(nombre: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logCreateRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, nombre })
      });
    } catch (error) {
      console.warn('Error logging recipe creation:', error);
      return;
    }
  }

  async logEditRecipe(id: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logEditRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id })
      });
    } catch (error) {
      console.warn('Error logging recipe edit:', error);
      return;
    }
  }

  async logDeleteRecipe(id: string): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logDeleteRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id })
      });
    } catch (error) {
      console.warn('Error logging recipe deletion:', error);
      return;
    }
  }

  // Error logs
  async logErrorCreateProduct(nombre: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorCreateProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, nombre, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging product creation error:', err);
      return;
    }
  }

  async logErrorEditProduct(id: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorEditProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging product edit error:', err);
      return;
    }
  }

  async logErrorDeleteProduct(id: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorDeleteProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging product deletion error:', err);
      return;
    }
  }

  async logErrorCreateRecipe(nombre: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorCreateRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, nombre, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging recipe creation error:', err);
      return;
    }
  }

  async logErrorEditRecipe(id: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorEditRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging recipe edit error:', err);
      return;
    }
  }

  async logErrorDeleteRecipe(id: string, error: any): Promise<Response | void> {
    try {
      const user = await this.getCurrentUser();
      return fetch(`${this.baseUrl}/logErrorDeleteRecipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user?.uid, id, error: error.toString() })
      });
    } catch (err) {
      console.warn('Error logging recipe deletion error:', err);
      return;
    }
  }

  // Helper method to get current user (you'll need to import Firebase Auth)
  private async getCurrentUser(): Promise<any> {
    // This is a simplified version - you should inject AngularFireAuth and get the current user
    return null; // Return the actual user when Firebase Auth is properly injected
  }
}

