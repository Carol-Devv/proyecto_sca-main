import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from "../../components/menu/menu";
import { OrderDBService } from '../../order-db.service';

@Component({
  selector: 'app-fallida',
  imports: [Menu, RouterLink],
  templateUrl: './fallida.html',
  styleUrl: './fallida.css',
})
export class Fallida implements OnInit {

  totalFallidos: number | null = null;

  constructor(private orderDBService: OrderDBService) { }

  ngOnInit(): void {
    // Al cargar la página de fallido, solicitamos el total actual a la DB
    this.orderDBService.getTotalFallidos()
      .subscribe(response => {
        this.totalFallidos = response.totalFallidos;
      });
  }
}
