import { Component } from '@angular/core';
import { Comidas } from "../../components/comidas/comidas";
import { Menu } from "../../components/menu/menu";

@Component({
  selector: 'app-china',
  imports: [Comidas, Menu],
  templateUrl: './china.html',
  styleUrl: './china.css',
})
export class China {

}
