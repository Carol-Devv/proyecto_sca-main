import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../../components/menu/menu';
import { OrderDBService } from '../../order-db.service';
import { DataTransferService, Comida } from '../../data-transfer.service';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [Menu, RouterLink],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class Confirmacion implements OnInit {
  totalPedidos: number | null = null;
  comida: Comida | undefined;

  constructor(private orderDBService: OrderDBService, private dataTransferService: DataTransferService) {}

  ngOnInit(): void {
    this.comida = this.dataTransferService.getComida();

    const userStr = sessionStorage.getItem('user');
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      const userName = user.username || user.userName || '';
      if (!userName) return;
      this.orderDBService.getPedidosUsuarioTotal(userName).subscribe({
        next: (res) => {
          if (res && res.success) {
            this.totalPedidos = res.n_pedidos;
          } else if (res && typeof (res as any).n_pedidos === 'number') {
            this.totalPedidos = (res as any).n_pedidos;
          }
        },
        error: (err) => console.error('Error obteniendo total pedidos:', err),
      });
    } catch (e) {
      console.error('Error parseando user en confirmacion:', e);
    }
  }
}