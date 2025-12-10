// Componente de perfil del usuario
import { Component, OnInit } from '@angular/core';
import { Menu } from "../../components/menu/menu";

@Component({
  selector: 'app-perfil',
  imports: [Menu],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  // Propiedades del perfil del usuario
  userName: string | null = null;
  name: string | null = null;
  age: string | null = null;
  blodGroup: string | null = null;
  kidneys: string | null = null;
  religion: string | null = null;
  healthStatus: string | null = null;
  pedidos: number | null = null;
  fallidos: number | null = null;

  // Obtiene los datos del usuario del sessionStorage y los asigna a las variables 
  ngOnInit() {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        // Maneja variaciones en nombres de propiedades 
        this.userName = user.username || user.userName || null;
        this.name = user.name || null;
        this.age = user.age || null;
        this.blodGroup = user.blodgroup || user.blodGroup || null;
        this.kidneys = user.kidneys || null;
        this.religion = user.religion || null;
        this.healthStatus = user.healthstatus || user.healthStatus || null;
        // Usa el operador nullish coalescing (??) para números
        this.pedidos = user.n_pedidos ?? null;
        this.fallidos = user.n_fallidos ?? null;
      } catch (e) {
        console.error('Error parseando sesión:', e);
      }
    }
  }
}