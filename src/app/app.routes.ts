// Definición de las rutas de la aplicación
import { Routes } from '@angular/router';
import { Comenzar } from './pages/comenzar/comenzar';
import { Landing } from './pages/landing/landing';
import { HacerPedido } from './pages/hacer-pedido/hacer-pedido';
import { Italiana } from './pages/foodType/italiana/italiana';
import { China } from './pages/foodType/china/china';
import { Japonesa } from './pages/foodType/japonesa/japonesa';
import { Espanola } from './pages/foodType/espanola/espanola';
import { India } from './pages/foodType/india/india';
import { Rapida } from './pages/foodType/rapida/rapida';
import { Mexicana } from './pages/foodType/mexicana/mexicana';
import { Magrebi } from './pages/foodType/magrebi/magrebi';
import { Perfil } from './pages/perfil/perfil';
import { Confirmacion } from './pages/confirmacion/confirmacion';
import { Fallida } from './pages/fallida/fallida';

// Configuración de las rutas y sus componentes asociados
export const routes: Routes = [
    { path: '', component: Landing }, // Ruta principal
	{ path: 'comenzar', component: Comenzar }, // Página de inicio
    { path: 'hacerPedido', component: HacerPedido }, // Página para realizar pedidos
    { path: 'perfil', component: Perfil }, // Página de perfil del usuario
    { path: 'italiana', component: Italiana }, // Página de comida italiana
    { path: 'china', component: China }, // Página de comida china
    { path: 'japonesa', component: Japonesa }, // Página de comida japonesa
    { path: 'espanola', component: Espanola }, // Página de comida española
    { path: 'india', component: India }, // Página de comida india
    { path: 'rapida', component: Rapida }, // Página de comida rápida
    { path: 'mexicana', component: Mexicana }, // Página de comida mexicana
    { path: 'magrebi', component: Magrebi }, // Página de comida magrebí
    { path: 'confirmacion', component: Confirmacion }, // Página de confirmación de pedido
    { path: 'fallida', component: Fallida }, // Página de pedido fallido
];
