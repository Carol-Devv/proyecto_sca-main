// Componente para mostrar la página de pedidos fallidos
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../../components/menu/menu';
import { OrderDBService } from '../../services/order-db.service';

@Component({
  selector: 'app-fallida',
  standalone: true,
  imports: [Menu, RouterLink],
  templateUrl: './fallida.html',
  styleUrl: './fallida.css',
})
export class Fallida implements OnInit {
  totalFallidos: number | null = null; // Total de pedidos fallidos del usuario

  constructor(private orderDBService: OrderDBService) {}

  // Obtiene el total de pedidos fallidos al inicializar el componente
  ngOnInit(): void {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      const userName = user.username || user.userName || '';
      if (!userName) return;

      // Realiza la llamada HTTP al servicio
      this.orderDBService.getTotalFallidos(userName).subscribe({
        next: (res) => {
          // Maneja dos formatos posibles de respuesta
          if (res && res.success) {
            this.totalFallidos = res.n_fallidos;
          } else if (res && typeof (res as any).n_fallidos === 'number') {
            this.totalFallidos = (res as any).n_fallidos;
          }
        },
        error: (err) => console.error('Error obteniendo total fallidos:', err),
      });
    } catch (e) {
      console.error('Error parseando user en fallida:', e);
    }
  }
}