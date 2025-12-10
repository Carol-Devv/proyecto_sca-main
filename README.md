# Proyecto SCA - HAMBRE O FIAMBRE

## Descripción
Este proyecto es un pequeño juego interactivo donde los usuarios pueden explorar diferentes tipos de comida de varias culturas y realizar pedidos. La aplicación está diseñada para ofrecer una experiencia divertida y educativa sobre la gastronomía mundial.

## Funcionalidades
- **Explorar Menús:** Navega por diferentes categorías de comida como china, italiana, mexicana, japonesa, entre otras.
- **Realizar Pedidos:** Selecciona tus platos favoritos y realiza pedidos.
<!-- - **Historial de Pedidos:** Consulta los pedidos realizados anteriormente. -->
- **Perfil de Usuario:** Personaliza tu perfil y gestiona tus preferencias.
<!-- - **Resurrección de Pedidos:** Recupera pedidos anteriores con la funcionalidad de "resurrección". -->

## Tecnologías Usadas
- **Frontend:** Angular (v20.3.0)
- **Backend:** Node.js con Express (archivo `server.js` en la carpeta `server/`)
- **Base de Datos:** Archivo SQL (`bbdd.sql`) para la gestión de datos (concretamente Postgresql).
- **Estilos:** CSS para el diseño y la presentación visual.
- **Herramientas de Desarrollo:**
  - TypeScript para un desarrollo tipado y robusto.
  - Karma y Jasmine para pruebas unitarias.

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:
- **src/app:** Contiene los servicios, componentes y configuración principal de la aplicación.
- **src/assets:** Recursos estáticos como imágenes y datos JSON.
- **server:** Backend para manejar las solicitudes del cliente.

## Instalación y Ejecución
1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor de desarrollo (server.js) con `npm start`.
4. Lanza la página con 'ng serve'
4. Accede a la aplicación en tu navegador en `http://localhost:4200`.
