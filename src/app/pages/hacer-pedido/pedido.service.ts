// Servicio para gestionar la comida seleccionada
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Servicio singleton disponible en toda la aplicación
})
export class PedidoService {
  private comidaSeleccionada: any = null;  // Almacena la comida seleccionada (sin tipado)

  // Establece la comida seleccionada
  setComida(comida: any) {
    this.comidaSeleccionada = comida;
  }

  // Obtiene la comida seleccionada
  getComida() {
    return this.comidaSeleccionada;
  }
}
