import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-india',
  imports: [Menu, Comidas],
  templateUrl: './india.html',
  styleUrl: './india.css',
})
export class India {

}
