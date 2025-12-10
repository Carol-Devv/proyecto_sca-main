import { Injectable } from '@angular/core';

// Define una interfaz para la comida
export interface Comida {
  imagenUrl: string;
  titulo: string;
  descripcion: string;
  ingredientes: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private comidaSeleccionada: Comida | undefined;

  setComida(comida: Comida): void {
    this.comidaSeleccionada = comida;
  }

  getComida(): Comida | undefined {
    return this.comidaSeleccionada;
  }
}
