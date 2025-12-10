import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-mexicana',
  imports: [Menu, Comidas],
  templateUrl: './mexicana.html',
  styleUrl: './mexicana.css',
})
export class Mexicana {

}
