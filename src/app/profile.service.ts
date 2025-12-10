// Servicio para gestionar el perfil del usuario
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userSubject = new BehaviorSubject<any>(this.readUserFromSession()); // Sujeto para el estado del usuario
  user$ = this.userSubject.asObservable(); // Observable para suscribirse a los cambios del usuario

  // Lee el usuario almacenado en sessionStorage
  private readUserFromSession(): any {
    try {
      const s = sessionStorage.getItem('user');
      return s ? JSON.parse(s) : null;
    } catch (e) {
      console.error('Error parseando user desde sessionStorage:', e);
      return null;
    }
  }

  // Refresca el estado del usuario desde sessionStorage
  refreshFromSession(): void {
    this.userSubject.next(this.readUserFromSession());
  }

  // Actualiza los contadores de pedidos y fallidos en sessionStorage
  updateCounters(updates: { n_pedidos?: number; n_fallidos?: number }): void {
    try {
      const user = this.readUserFromSession() || {};
      if (typeof updates.n_pedidos === 'number') {
        user.n_pedidos = updates.n_pedidos;
      }
      if (typeof updates.n_fallidos === 'number') {
        user.n_fallidos = updates.n_fallidos;
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    } catch (e) {
      console.error('Error actualizando contadores en sessionStorage:', e);
    }
  }
}
