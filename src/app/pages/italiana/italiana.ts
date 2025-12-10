import { Component, Input } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comenzar } from "../comenzar/comenzar";
import { Comidas } from "../../components/comidas/comidas";
import { Router } from '@angular/router';
import { PedidoService } from '../hacer-pedido/pedido.service';
import { Confirmacion } from '../confirmacion/confirmacion';
import { Fallida } from '../fallida/fallida';
@Component({
  selector: 'app-italiana',
  imports: [Menu, Confirmacion, Fallida, Comidas],
  templateUrl: './italiana.html',
  styleUrl: './italiana.css',
})
export class Italiana {
  @Input() imagenUrl= '';
	@Input() titulo= '';
	@Input() descripcion= '';
	@Input() ingredientes= '';
  constructor(private pedidoService: PedidoService, private router: Router) {}
  seleccionarComida() {
    console.log("HOla")
    
    
    //this.router.navigate(['/confirmacion']);
  }
 
}
