// Componente para la página de hacer pedidos
import { Component } from '@angular/core';
import { Estilos } from '../../components/estilos/estilos';  
import { Menu } from '../../components/menu/menu';           

@Component({
  selector: 'app-hacer-pedido',      // Selector: <app-hacer-pedido></app-hacer-pedido>
  standalone: true,                   // Componente independiente
  imports: [Menu, Estilos], // Importa Menu y Estilos
  templateUrl: './hacer-pedido.html', // Template HTML
  styleUrl: './hacer-pedido.css',     // Estilos CSS
})
export class HacerPedido {
  // Componente de presentación sin lógica adicional
}
