import { Component, OnInit } from '@angular/core';
import { Menu } from "../../components/menu/menu";

@Component({
  selector: 'app-perfil',
  imports: [Menu],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  userName: string | null = null;
  name: string | null = null;
  age: string | null = null;
  blodGroup: string | null = null;
  kidneys: string | null = null;
  religion: string | null = null;
  healthStatus: string | null = null;
  pedidos: number | null = null;
  fallidos: number | null = null;

  ngOnInit() {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.userName = user.username || user.userName || null;
        this.name = user.name || null;
        this.age = user.age || null;
        this.blodGroup = user.blodgroup || user.blodGroup || null;
        this.kidneys = user.kidneys || null;
        this.religion = user.religion || null;
        this.healthStatus = user.healthstatus || user.healthStatus || null;
        this.pedidos = user.n_pedidos ?? null;
        this.fallidos = user.n_fallidos ?? null;
      } catch (e) {
        console.error('Error parseando sesión:', e);
      }
    }
  }
}