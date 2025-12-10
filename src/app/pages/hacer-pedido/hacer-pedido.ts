import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Estilos } from '../../components/estilos/estilos';
import { Menu } from '../../components/menu/menu';

@Component({
  selector: 'app-hacer-pedido',
  standalone: true,
  imports: [RouterLink, Menu, Estilos],
  templateUrl: './hacer-pedido.html',
  styleUrl: './hacer-pedido.css',
})
export class HacerPedido {

}
