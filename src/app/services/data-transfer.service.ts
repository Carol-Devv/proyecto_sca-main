// Servicio para transferir datos entre componentes
import { Injectable } from '@angular/core';

// Define una interfaz para la comida
export interface Comida {
  imagenUrl: string; // URL de la imagen de la comida
  titulo: string; // Título del plato
  descripcion: string; // Descripción del plato
  ingredientes: string; // Ingredientes del plato
}

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private comidaSeleccionada: Comida | undefined; // Almacena la comida seleccionada

  // Establece la comida seleccionada
  setComida(comida: Comida): void {
    this.comidaSeleccionada = comida;
  }

  // Obtiene la comida seleccionada
  getComida(): Comida | undefined {
    return this.comidaSeleccionada;
  }
}
