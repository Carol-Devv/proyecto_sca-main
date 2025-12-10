import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-espanola',
  imports: [Menu, Comidas],
  templateUrl: './espanola.html',
  styleUrl: './espanola.css',
})
export class Espanola {

}
