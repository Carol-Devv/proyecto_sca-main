import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ConfirmarResponse {
  success: boolean;
  nuevoTotalPedidos: number;
  message?: string;
}

interface FallidoResponse {
  success: boolean;
  nuevoTotalFallidos: number;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderDBService {
  private base = 'http://127.0.0.1:3000/api/user/hacerPedido';

  constructor(private http: HttpClient) {}

  confirmarPedidoEnDB(userName: string): Observable<ConfirmarResponse> {
    return this.http.post<ConfirmarResponse>(`${this.base}/confirmacion`, { userName });
  }

  registrarFallidoEnDB(userName: string): Observable<FallidoResponse> {
    return this.http.post<FallidoResponse>(`${this.base}/fallida`, { userName });
  }

  getPedidosUsuarioTotal(userName: string): Observable<{ success: boolean; n_pedidos: number }> {
    return this.http.get<{ success: boolean; n_pedidos: number }>(`${this.base}?userName=${encodeURIComponent(userName)}`);
  }

  getTotalFallidos(userName: string): Observable<{ success: boolean; n_fallidos: number }> {
    return this.http.get<{ success: boolean; n_fallidos: number }>(`${this.base}/totalFallidos?userName=${encodeURIComponent(userName)}`);
  }
}