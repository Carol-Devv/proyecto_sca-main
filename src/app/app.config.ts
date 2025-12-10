// Configuración principal de la aplicación Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Define los proveedores y configuraciones globales de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Manejo global de errores del navegador
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimización de detección de cambios
    provideRouter(routes), // Configuración de las rutas
    provideHttpClient()    // Configuración del cliente HTTP
  ]
};
