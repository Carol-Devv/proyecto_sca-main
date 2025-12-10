import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";

@Component({
  selector: 'app-perfil',
  imports: [Menu],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  //userName, name, age, blodGroup, kidneys, religion, healthStatus
  userName: string | null = null;
  name: string | null = null;
  age: string | null = null;
  blodGroup: string | null = null;
  kidneys: string | null = null;
  religion: string | null = null;
  healthStatus: string | null = null;
  pedidos: number | null = null;
  resurrecciones: number | null = null;

  ngOnInit() {
    const min: number  = 1;
    const max: number  = 6;
    
    
    const userString = sessionStorage.getItem("user");
    if (userString) {//userName, name, age, blodGroup, kidneys, religion, healthStatus
      this.userName = JSON.parse(userString).username;
      this.name = JSON.parse(userString).name;
      this.age = JSON.parse(userString).age;
      this.blodGroup = JSON.parse(userString).blodgroup;
      this.kidneys = JSON.parse(userString).kidneys;
      this.religion = JSON.parse(userString).religion;
      this.healthStatus = JSON.parse(userString).healthstatus;
      this.pedidos = Math.floor(Math.random() * (max - min + 1)) + min;
      this.resurrecciones = Math.floor(Math.random() * (max - min + 1)) + min;
    }


  }

}
