import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from "../../components/menu/menu";
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

  constructor(private orderDBService: OrderDBService, 
    private dataTransferService: DataTransferService) { }

  // 3. Definir el método ngOnDestroy() que es requerido por la interfaz
  ngOnInit(): void {
    this.comida = this.dataTransferService.getComida();
    // Hacemos la llamada HTTP para obtener el total de la DB al cargar la página
    this.orderDBService.getPedidosUsuarioTotal()
      .subscribe(response => {
        this.totalPedidos = response.total;
      });
  }
}