// Componente para mostrar la página de comida italiana
import { Component, Input } from '@angular/core';
import { Menu } from "../../../components/menu/menu";
import { Comidas } from "../../../components/comidas/comidas";

@Component({
  selector: 'app-italiana',
  imports: [Menu, Comidas],
  templateUrl: './italiana.html',
  styleUrl: './italiana.css',
})
export class Italiana {
  // Componente de presentación sin lógica adicional
}
