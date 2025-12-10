import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ConfirmarResponse {
  nuevoTotalPedidos: number;
}

interface FallidoResponse {
  nuevoTotalFallidos: number;
}

interface TotalResponse {
  totalFallidos: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderDBService {
  
  // URL base de tu API Backend
  private apiUrl = 'http://127.0.0.1:3000/api/user/hacerPedido'; 

  constructor(private http: HttpClient) { }

  // Llama al backend para incrementar nPedidos y devuelve el nuevo total
  confirmarPedidoEnDB(): Observable<{ nuevoTotalPedidos: number }> {
    return this.http.post<{ nuevoTotalPedidos: number }>(`${this.apiUrl}/confirmacion`, {});
  }

  // Nuevo: Llama al backend para incrementar nFallidos y devuelve el nuevo total
  registrarFallidoEnDB(): Observable<{ nuevoTotalFallidos: number }> {
    return this.http.post<{ nuevoTotalFallidos: number }>(`${this.apiUrl}/fallida`, {});
  }

  // Nuevo: Obtiene el total actual de fallidos (para mostrarlo en la página /fallido)
  getTotalFallidos(): Observable<{ totalFallidos: number }> {
    // Asume que tienes un endpoint GET /api/pedidos/totalFallidos
    return this.http.get<{ totalFallidos: number }>(`${this.apiUrl}/totalFallidos`);
  }

  getPedidosUsuarioTotal(): Observable<{ total: number }> {
    // Usamos 'this.http' INTERNAMENTE en el servicio, que es donde está permitido
    return this.http.get<{ total: number }>(`${this.apiUrl}`);
    // Nota: A veces la URL base ya es suficiente si el backend sabe qué devolver. 
    // Si necesitas un endpoint específico, cámbialo a `${this.apiUrl}/total` o similar.
  }
}