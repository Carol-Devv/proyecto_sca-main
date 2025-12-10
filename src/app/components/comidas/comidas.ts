import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDBService } from '../../order-db.service';
import { DataTransferService, Comida } from '../../data-transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css',
})
export class Comidas implements AfterViewInit, OnDestroy {
  @Input() imagenUrl = '';
  @Input() titulo = '';
  @Input() descripcion = '';
  @Input() ingredientes = '';

  @ViewChild('rootLink', { read: ElementRef, static: true })
  anchorRef!: ElementRef<HTMLAnchorElement>;

  private captureHandler: ((e: Event) => void) | null = null;
  private sub: Subscription | null = null;

  constructor(
    private router: Router,
    private orderDBService: OrderDBService,
    private dataTransferService: DataTransferService
  ) {}

  ngAfterViewInit(): void {
    // Añadimos un listener en fase de captura para interceptar el click ANTES que routerLink
    if (this.anchorRef && this.anchorRef.nativeElement) {
      this.captureHandler = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        // stopImmediatePropagation para evitar otros listeners del mismo elemento
        (event as any).stopImmediatePropagation?.();
        this.handleOrder(event);
      };
      this.anchorRef.nativeElement.addEventListener('click', this.captureHandler, true);
    }
  }

  ngOnDestroy(): void {
    if (this.captureHandler && this.anchorRef && this.anchorRef.nativeElement) {
      this.anchorRef.nativeElement.removeEventListener('click', this.captureHandler, true);
    }
    this.sub?.unsubscribe();
  }

  // Método para ejecutar la lógica del pedido
  private handleOrder(event: Event) {
    // Obtener userName de sessionStorage
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
      // Confirmación: incrementa n_pedidos en el backend
      this.sub = this.orderDBService.confirmarPedidoEnDB(userName).subscribe({
        next: (res) => {
          console.log('Confirmado en backend:', res);
          // Guardamos la comida y navegamos a confirmación
          this.dataTransferService.setComida(comidaActual);
          this.router.navigate(['/confirmacion']);
        },
        error: (err) => {
          console.error('Error al confirmar en DB:', err);
          alert('No se pudo confirmar el pedido. Inténtalo de nuevo.');
        },
      });
    } else {
      // Fallida: incrementa n_fallidos en el backend
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