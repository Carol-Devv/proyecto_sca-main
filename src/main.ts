// Archivo principal para inicializar la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; 

// Inicializa la aplicación con las configuraciones y proveedores necesarios
bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // Proveedor para las rutas de la aplicación
    provideHttpClient()    // Proveedor para realizar solicitudes HTTP
  ]
})
  .catch((err) => console.error(err)); // Manejo de errores en la inicialización
