import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-magrebi',
  imports: [Menu, Comidas],
  templateUrl: './magrebi.html',
  styleUrl: './magrebi.css',
})
export class Magrebi {

}
