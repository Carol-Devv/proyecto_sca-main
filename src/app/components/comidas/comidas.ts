import { Component, Input} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { OrderDBService } from '../../order-db.service';
import { DataTransferService, Comida } from '../../data-transfer.service'; 

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css',
})
export class Comidas {
    @Input() imagenUrl= '';
    @Input() titulo= '';
    @Input() descripcion= '';
    @Input() ingredientes= '';
  
  constructor(
    private router: Router,
    private orderDBService: OrderDBService,
    private dataTransferService: DataTransferService // Inyecta el servicio
  ) {}
  bienF(event: Event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    (event as any).stopImmediatePropagation?.();

    const numeroAleatorio = Math.floor(Math.random() * 100);
    console.log("Número aleatorio generado:", numeroAleatorio);

    const comidaActual: Comida = {
        imagenUrl: this.imagenUrl,
        titulo: this.titulo,
        descripcion: this.descripcion,
        ingredientes: this.ingredientes
    };

    if (numeroAleatorio >= 0 && numeroAleatorio <= 49) {
      //this.orderDBService.confirmarPedidoEnDB().subscribe({
        //next: () => {
          // 🛑 Guarda la comida en el servicio ANTES de navegar
          //this.dataTransferService.setComida(comidaActual);
          this.router.navigate(['/confirmacion']);
        //
      //});


    } else {
      //this.orderDBService.registrarFallidoEnDB().subscribe({
        //next: () => {
          // Solo navegamos a /fallido DESPUÉS de registrar el fallo en la DB
          this.router.navigate(['/fallida']);
        }};//,
        //error: (err) => console.error(err)
      //});
    //}
  //}
}