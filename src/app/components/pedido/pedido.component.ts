import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Hacer Pedido</h2>
      <button (click)="obtenerNumeroPedidos()">Ver mis pedidos</button>
      <button (click)="hacerPedido()">Hacer nuevo pedido</button>
      
      <div *ngIf="nPedidos !== null">
        <p>Pedidos realizados: {{ nPedidos }}</p>
      </div>
    </div>
  `
})
export class PedidoComponent {
  nPedidos: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Método para obtener n_pedidos actual
  obtenerNumeroPedidos() {
    const userStr = sessionStorage.getItem('user');
    
    if (!userStr) {
      alert('No estás logueado');
      this.router.navigate(['/login']);
      return;
    }
    
    const user = JSON.parse(userStr);
    const userName = user.userName;
    
    // Llamada GET a tu endpoint
    this.http.get<any>(`http://127.0.0.1:3000/api/user/hacerPedido?userName=${userName}`)
      .subscribe({
        next: (res) => {
          this.nPedidos = res.n_pedidos;
          console.log('Pedidos actuales:', this.nPedidos);
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al obtener pedidos');
        }
      });
  }

  // Método completo para hacer un pedido
  hacerPedido() {
    const userStr = sessionStorage.getItem('user');
    
    if (!userStr) {
      alert('No estás logueado');
      return;
    }
    
    const user = JSON.parse(userStr);
    const userName = user.userName;
    
    // 1. Obtener número actual de pedidos
    this.http.get<any>(`http://127.0.0.1:3000/api/user/hacerPedido?userName=${userName}`)
      .subscribe({
        next: (res) => {
          const pedidosActuales = res.n_pedidos;
          
          // 2. Aquí pones TU lógica de negocio
          // Ejemplo: mostrar un formulario, seleccionar productos, etc.
          const confirmar = confirm(`Tienes ${pedidosActuales} pedidos\n¿Confirmar nuevo pedido?`);
          
          if (confirmar) {
            // 3. Cuando termines TU proceso, incrementas el contador
            this.confirmarPedido(userName);
          }
        }
      });
  }

  // Método para incrementar el contador
  confirmarPedido(userName: string) {
    this.http.put<any>('http://127.0.0.1:3000/api/user/incrementarPedido', 
      { userName: userName }
    ).subscribe({
      next: (res) => {
        this.nPedidos = res.n_pedidos;
        alert(`¡Pedido confirmado!\nTotal de pedidos: ${this.nPedidos}`);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al confirmar pedido');
      }
    });
  }
}