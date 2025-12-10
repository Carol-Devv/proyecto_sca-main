// Componente para gestionar el inicio de sesión y registro de usuarios
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-comenzar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './comenzar.html',
  styleUrls: ['./comenzar.css']
})
export class Comenzar {

  // Formulario para el inicio de sesión
  loginForm: FormGroup;
  // Formulario para el registro de usuarios
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, // Constructor de formularios reactivos
    private http: HttpClient, // Cliente HTTP para realizar solicitudes al backend
    private router: Router // Enrutador para la navegación entre páginas
  ) {

    // FORMULARIO LOGIN
    this.loginForm = this.fb.group({
      userName: ['', Validators.required], // Campo obligatorio para el nombre de usuario
      password: ['', Validators.required]  // Campo obligatorio para la contraseña
    });

    // FORMULARIO REGISTRO
    this.registerForm = this.fb.group({
      userName: ['', Validators.required], // Campo obligatorio para el nombre de usuario
      password: ['', Validators.required], // Campo obligatorio para la contraseña
      name: ['', Validators.required],     // Campo obligatorio para el nombre
      age: ['', Validators.required],      // Campo obligatorio para la edad
      blodGroup: ['', Validators.required], // Campo obligatorio para el grupo sanguíneo
      kidneys: ['', Validators.required],   // Campo obligatorio para los riñones
      religion: ['', Validators.required],  // Campo obligatorio para la religión
      healthStatus: ['', Validators.required] // Campo obligatorio para el estado de salud
    });
  }

  // ---------------------
  // 🚪 LOGIN
  // ---------------------
  // Método para manejar el inicio de sesión
  login() {
    if (this.loginForm.invalid) return; // Verifica si el formulario es válido

    const { userName, password } = this.loginForm.value; // Obtiene los valores del formulario

    if (this.loginForm.valid) {
      this.http.post(
        'http://127.0.0.1:3000/api/user/login',
        { userName, password }
      ).subscribe({
        next: (res: any) => {
          // Manejo de la respuesta del backend
          const successFlag = typeof res?.success === 'boolean' ? res.success : undefined;
          const returnedUser = res?.user ?? res;

          const isSuccessful = successFlag !== undefined
            ? successFlag
            : (returnedUser && (returnedUser.username || returnedUser.userName || returnedUser.name));

          if (isSuccessful) {
            try {
              const toStore = res?.user ?? res;
              sessionStorage.setItem('user', JSON.stringify(toStore)); // Guarda el usuario en sessionStorage
            } catch (e) {
              console.warn('No se pudo guardar en sessionStorage', e);
            }
            alert(res.message ?? 'Login correcto.');
            this.router.navigate(['/perfil']); // Navega al perfil del usuario
          } else {
            alert(res.message ?? 'Login fallido. Credenciales incorrectas.');
          }
        },
        error: (err: any) => {
          console.error(err);
          alert('Login fallido. Credenciales incorrectas.');
        }
      });
    }
  }

  // ---------------------
  // 📝 REGISTRO
  // ---------------------
  // Método para manejar el registro de usuarios
  register() {
    if (this.registerForm.invalid) {
      const missing: string[] = [];
      const values = this.registerForm.value || {};
      const mapping: { [key: string]: string } = {
        userName: 'Usuario',
        password: 'Contraseña',
        name: 'Nombre',
        age: 'Edad',
        blodGroup: 'Grupo sanguíneo',
        kidneys: 'Riñones',
        religion: 'Religión',
        healthStatus: 'Estado de salud'
      };

      for (const key in mapping) {
        const val = values[key];
        if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
          missing.push(mapping[key]);
        }
      }

      if (missing.length) {
        alert('No se pueden dejar campos vacíos. Rellena: ' + missing.join(', '));
      } else {
        alert('Formulario inválido. Revisa los campos.');
      }
      return;
    }

    const data = this.registerForm.value;

    this.http.post(
      'http://127.0.0.1:3000/api/user/register',
      data
    ).subscribe({
      next: (res: any) => {
        const backendUser = res?.user ?? res;
        let userToStore: any;

        if (backendUser && (backendUser.username || backendUser.userName || backendUser.name)) {
          userToStore = {
            username: backendUser.username ?? backendUser.userName ?? '',
            name: backendUser.name ?? '',
            age: backendUser.age ?? '',
            blodgroup: backendUser.blodgroup ?? backendUser.blodGroup ?? '',
            kidneys: backendUser.kidneys ?? '',
            religion: backendUser.religion ?? '',
            healthstatus: backendUser.healthstatus ?? backendUser.healthStatus ?? ''
          };
        } else {
          userToStore = {
            username: data.userName ?? '',
            name: data.name ?? '',
            age: data.age ?? '',
            blodgroup: data.blodGroup ?? '',
            kidneys: data.kidneys ?? '',
            religion: data.religion ?? '',
            healthstatus: data.healthStatus ?? ''
          };
        }

        try {
          sessionStorage.setItem('user', JSON.stringify(userToStore));
        } catch (e) {
          console.warn('No se pudo guardar en sessionStorage', e);
        }

        alert(res?.message ?? 'Registro exitoso');
        this.registerForm.reset();
        this.router.navigate(['/perfil']);
      },

      error: (err: any) => alert('Error: ' + err.message)
    });
  }

}