import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Comidas } from "../../components/comidas/comidas";

@Component({
  selector: 'app-japonesa',
  imports: [Menu, Comidas],
  templateUrl: './japonesa.html',
  styleUrl: './japonesa.css',
})
export class Japonesa {

}
