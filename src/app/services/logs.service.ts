import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogsService {

  private baseUrl = 'https://us-central1-funcooking2-72cbd.cloudfunctions.net';

  // Log genérico
  logEvento(data: { evento: string, detalle: string, tipo?: string, ruta?: string }) {
    return fetch(`${this.baseUrl}/logEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error('[LogsService] Error logEvento:', err.message));
  }

  // Log de login exitoso
  logLoginExitoso(detalle: string = "Inicio de sesión exitoso") {
    return fetch(`${this.baseUrl}/logLoginExitoso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detalle })
    }).catch(err => console.error('[LogsService] Error logLoginExitoso:', err.message));
  }

  // Log de login fallido
  logLoginFallido(detalle: string = "Intento fallido de inicio de sesión") {
    return fetch(`${this.baseUrl}/logLoginFallido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detalle })
    }).catch(err => console.error('[LogsService] Error logLoginFallido:', err.message));
  }

  // Log de logout
  logLogout(detalle: string = "Cierre de sesión") {
    return fetch(`${this.baseUrl}/logLogout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detalle })
    }).catch(err => console.error('[LogsService] Error logLogout:', err.message));
  }

  // Log de creación de producto
  logCreateProduct(nombre: string) {
    return fetch(`${this.baseUrl}/logCreateProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    }).catch(err => console.error('[LogsService] Error logCreateProduct:', err.message));
  }

  // Log de edición de producto
  logEditProduct(id: string) {
    return fetch(`${this.baseUrl}/logEditProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(err => console.error('[LogsService] Error logEditProduct:', err.message));
  }

  // Log de eliminación de producto
  logDeleteProduct(id: string) {
    return fetch(`${this.baseUrl}/logDeleteProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(err => console.error('[LogsService] Error logDeleteProduct:', err.message));
  }

  // Log de error en creación de producto
  logErrorCreateProduct(nombre: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorCreateProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, error })
    }).catch(err => console.error('[LogsService] Error logErrorCreateProduct:', err.message));
  }

  // Log de error en edición de producto
  logErrorEditProduct(id: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorEditProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, error })
    }).catch(err => console.error('[LogsService] Error logErrorEditProduct:', err.message));
  }

  // Log de error en eliminación de producto
  logErrorDeleteProduct(id: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorDeleteProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, error })
    }).catch(err => console.error('[LogsService] Error logErrorDeleteProduct:', err.message));
  }

  // Log de creación de receta
  logCreateRecipe(nombre: string) {
    return fetch(`${this.baseUrl}/logCreateRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    }).catch(err => console.error('[LogsService] Error logCreateRecipe:', err.message));
  }

  // Log de edición de receta
  logEditRecipe(id: string) {
    return fetch(`${this.baseUrl}/logEditRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(err => console.error('[LogsService] Error logEditRecipe:', err.message));
  }

  // Log de eliminación de receta
  logDeleteRecipe(id: string) {
    return fetch(`${this.baseUrl}/logDeleteRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(err => console.error('[LogsService] Error logDeleteRecipe:', err.message));
  }

  // Log de error en creación de receta
  logErrorCreateRecipe(nombre: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorCreateRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, error })
    }).catch(err => console.error('[LogsService] Error logErrorCreateRecipe:', err.message));
  }

  // Log de error en edición de receta
  logErrorEditRecipe(id: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorEditRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, error })
    }).catch(err => console.error('[LogsService] Error logErrorEditRecipe:', err.message));
  }

  // Log de error en eliminación de receta
  logErrorDeleteRecipe(id: string, error: any) {
    return fetch(`${this.baseUrl}/logErrorDeleteRecipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, error })
    }).catch(err => console.error('[LogsService] Error logErrorDeleteRecipe:', err.message));
  }
}

