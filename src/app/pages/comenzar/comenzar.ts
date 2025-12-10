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

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    // FORMULARIO LOGIN
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // FORMULARIO REGISTRO
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      blodGroup: ['', Validators.required],
      kidneys: ['', Validators.required],
      religion: ['', Validators.required],
      healthStatus: ['', Validators.required]
    });
  }

  // ---------------------
  // 🚪 LOGIN
  // ---------------------
  login() {
    if (this.loginForm.invalid) return;

    const { userName, password } = this.loginForm.value;

    if (this.loginForm.valid) {
    this.http.post(
      'http://127.0.0.1:3000/api/user/login',
      { userName, password }
    ).subscribe({
      next: (res: any) => {
        // El backend puede devolver distintos formatos. Detectar éxito y actuar en consecuencia.
        // Posibles respuestas:
        // 1) { success: true, message: 'OK', user: { ... } }
        // 2) { message: 'Credenciales incorrectas' } (sin error HTTP)
        // 3) directamente el objeto user
        const successFlag = typeof res?.success === 'boolean' ? res.success : undefined;
        const returnedUser = res?.user ?? res;

        const isSuccessful = successFlag !== undefined
          ? successFlag
          : (returnedUser && (returnedUser.username || returnedUser.userName || returnedUser.name));

        if (isSuccessful) {
          try {
            // Si la respuesta tiene `user`, guardar esa propiedad; si no, guardar `res` completo
            const toStore = res?.user ?? res;
            sessionStorage.setItem('user', JSON.stringify(toStore));
          } catch (e) {
            console.warn('No se pudo guardar en sessionStorage', e);
          }
          alert(res.message ?? 'Login correcto.');
          this.router.navigate(['/perfil']);
        } else {
          // No navegar si el backend indica fallo (aunque sea 200 OK)
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
  register() {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.value;

    this.http.post(
      'http://127.0.0.1:3000/api/user/register',
      data
    ).subscribe({
      next: (res: any) => {
        // Guardar en sessionStorage un objeto con las claves que `perfil.ts` espera.
        // Preferir la respuesta del backend (res.user o res) si incluye datos de usuario,
        // si no, usar los valores del formulario `data`.
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
          // La API no devolvió el user; usar los datos del formulario y normalizar los nombres
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