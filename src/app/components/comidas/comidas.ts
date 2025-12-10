// Componente para mostrar información de un plato de comida
import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDBService } from '../../services/order-db.service';
import { DataTransferService, Comida } from '../../services/data-transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css',
})
export class Comidas implements AfterViewInit, OnDestroy {
  @Input() imagenUrl = ''; // URL de la imagen del plato
  @Input() titulo = ''; // Título del plato
  @Input() descripcion = ''; // Descripción del plato
  @Input() ingredientes = ''; // Ingredientes del plato

  @ViewChild('rootLink', { read: ElementRef, static: true })
  anchorRef!: ElementRef<HTMLAnchorElement>; // Referencia al enlace del componente

  private captureHandler: ((e: Event) => void) | null = null; // Manejador de eventos de clic
  private sub: Subscription | null = null; // Suscripción para manejar observables

  constructor(
    private router: Router,
    private orderDBService: OrderDBService,
    private dataTransferService: DataTransferService
  ) {}

  // Configura un listener en fase de captura para interceptar clics
  ngAfterViewInit(): void {
    if (this.anchorRef && this.anchorRef.nativeElement) {
      this.captureHandler = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        (event as any).stopImmediatePropagation?.();
        this.handleOrder(event);
      };
      this.anchorRef.nativeElement.addEventListener('click', this.captureHandler, true);
    }
  }

  // Limpia los recursos al destruir el componente
  ngOnDestroy(): void {
    if (this.captureHandler && this.anchorRef && this.anchorRef.nativeElement) {
      this.anchorRef.nativeElement.removeEventListener('click', this.captureHandler, true);
    }
    this.sub?.unsubscribe();
  }

  // Maneja la lógica de realizar un pedido
  private handleOrder(event: Event) {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) {
      alert('Por favor, inicia sesión antes de hacer un pedido.');
      this.router.navigate(['/comenzar']);
      return;
    }

    let userName = '';
    try {
      const user = JSON.parse(userStr);
      userName = user.username || user.userName || '';
      if (!userName) {
        alert('Usuario inválido. Vuelve a iniciar sesión.');
        this.router.navigate(['/comenzar']);
        return;
      }
    } catch (e) {
      console.error('Error parseando user en sessionStorage', e);
      alert('Error de sesión. Vuelve a iniciar sesión.');
      this.router.navigate(['/comenzar']);
      return;
    }

    const numeroAleatorio = Math.floor(Math.random() * 100);
    console.log('Número aleatorio generado:', numeroAleatorio, 'para', this.titulo);

    const comidaActual: Comida = {
      imagenUrl: this.imagenUrl,
      titulo: this.titulo,
      descripcion: this.descripcion,
      ingredientes: this.ingredientes,
    };

    if (numeroAleatorio >= 0 && numeroAleatorio <= 49) {
      this.sub = this.orderDBService.confirmarPedidoEnDB(userName).subscribe({
        next: (res) => {
          console.log('Confirmado en backend:', res);
          this.dataTransferService.setComida(comidaActual);
          this.router.navigate(['/confirmacion']);
        },
        error: (err) => {
          console.error('Error al confirmar en DB:', err);
          alert('No se pudo confirmar el pedido. Inténtalo de nuevo.');
        },
      });
    } else {
      this.sub = this.orderDBService.registrarFallidoEnDB(userName).subscribe({
        next: (res) => {
          console.log('Fallido registrado en backend:', res);
          this.router.navigate(['/fallida']);
        },
        error: (err) => {
          console.error('Error al registrar fallido en DB:', err);
          alert('No se pudo registrar el fallo. Inténtalo de nuevo.');
        },
      });
    }
  }
}