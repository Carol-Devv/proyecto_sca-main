import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-rapida',
  imports: [Menu, Comidas],
  templateUrl: './rapida.html',
  styleUrl: './rapida.css',
})
export class Rapida {

}
