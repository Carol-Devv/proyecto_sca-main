// Componente raíz de la aplicación
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root', // Selector del componente raíz
  standalone: true,
  imports: [RouterOutlet], // Importa el enrutador
  templateUrl: './app.html', // Plantilla HTML del componente
  styleUrls: ['./app.css'] // Estilos CSS del componente
})
export class App {
  // Señal para el título de la aplicación
  protected readonly title = signal('proyecto_sca');
}
