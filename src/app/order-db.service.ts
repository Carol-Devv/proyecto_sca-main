// Servicio para interactuar con la base de datos de pedidos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para la respuesta de confirmación de pedido
interface ConfirmarResponse {
  success: boolean; // Indica si la operación fue exitosa
  nuevoTotalPedidos: number; // Nuevo total de pedidos del usuario
  message?: string; // Mensaje opcional de la respuesta
}

// Interfaz para la respuesta de pedido fallido
interface FallidoResponse {
  success: boolean; // Indica si la operación fue exitosa
  nuevoTotalFallidos: number; // Nuevo total de pedidos fallidos del usuario
  message?: string; // Mensaje opcional de la respuesta
}

@Injectable({
  providedIn: 'root',
})
export class OrderDBService {
  private base = 'http://127.0.0.1:3000/api/user/hacerPedido'; // URL base para las solicitudes

  constructor(private http: HttpClient) {}

  // Confirma un pedido en la base de datos
  confirmarPedidoEnDB(userName: string): Observable<ConfirmarResponse> {
    return this.http.post<ConfirmarResponse>(`${this.base}/confirmacion`, { userName });
  }

  // Registra un pedido fallido en la base de datos
  registrarFallidoEnDB(userName: string): Observable<FallidoResponse> {
    return this.http.post<FallidoResponse>(`${this.base}/fallida`, { userName });
  }

  // Obtiene el total de pedidos realizados por un usuario
  getPedidosUsuarioTotal(userName: string): Observable<{ success: boolean; n_pedidos: number }> {
    return this.http.get<{ success: boolean; n_pedidos: number }>(`${this.base}?userName=${encodeURIComponent(userName)}`);
  }

  // Obtiene el total de pedidos fallidos de un usuario
  getTotalFallidos(userName: string): Observable<{ success: boolean; n_fallidos: number }> {
    return this.http.get<{ success: boolean; n_fallidos: number }>(`${this.base}/totalFallidos?userName=${encodeURIComponent(userName)}`);
  }
}