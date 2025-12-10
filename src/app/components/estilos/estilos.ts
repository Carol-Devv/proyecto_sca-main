import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estilos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './estilos.html',
  styleUrl: './estilos.css',
})
export class Estilos {
	@Input() titulo='';
	@Input() imagenUrl ='';
	@Input() pageUrl='';
}
