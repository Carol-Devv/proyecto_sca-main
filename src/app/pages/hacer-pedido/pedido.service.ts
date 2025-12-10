import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private comidaSeleccionada: any = null;

  setComida(comida: any) {
    this.comidaSeleccionada = comida;
  }

  getComida() {
    return this.comidaSeleccionada;
  }
}
