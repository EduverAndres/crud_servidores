import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServidoresService } from '../../services/servidores.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.css'],
  standalone: false
})
export class ServidoresComponent implements OnInit {
  servidores: any[] = [];
  servidorSeleccionado: any = null; // ✅ Nuevo: almacena el servidor para editar
  @ViewChild('servidorModal') servidorModal!: ElementRef;
  modalInstance: any;

  constructor(private servidoresService: ServidoresService) {}

  ngOnInit(): void {
    this.obtenerServidores();
  }

  obtenerServidores() {
    this.servidoresService.obtenerServidores().subscribe({
      next: (data) => {
        this.servidores = data;
      },
      error: (err) => console.error('Error obteniendo servidores:', err),
    });
  }

  actualizarTabla() {
    this.obtenerServidores();
    this.closeModal();
  }

  openModal(servidor: any = null) {
    this.servidorSeleccionado = servidor; // ✅ Si es edición, se asigna el servidor
    this.modalInstance = new bootstrap.Modal(this.servidorModal.nativeElement);
    this.modalInstance.show();
  }

  closeModal() {
    this.servidorSeleccionado = null; // ✅ Resetea al cerrar
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'activo': return 'activo';
      case 'inactivo': return 'inactivo';
      case 'en mantenimiento': return 'mantenimiento';
      default: return '';
    }
  }

  eliminarServidor(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servidoresService.eliminarServidor(id).subscribe({
          next: () => {
            Swal.fire({
              title: '🔥 Eliminado',
              text: 'Servidor eliminado correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.obtenerServidores();
          },
          error: (err) => console.error('❌ Error eliminando servidor:', err),
        });
      }
    });
  }

  cambiarEstado(id: number, estadoActual: string): void {
    const estadosDisponibles = ['Activo', 'Inactivo', 'En mantenimiento'];
    const indiceActual = estadosDisponibles.findIndex(e => e.toLowerCase() === estadoActual.toLowerCase());
    const nuevoEstado = estadosDisponibles[(indiceActual + 1) % estadosDisponibles.length];

    Swal.fire({
      title: '¿Cambiar estado?',
      text: `El servidor cambiará a: ${nuevoEstado}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servidoresService.cambiarEstado(id, nuevoEstado).subscribe({
          next: () => {
            Swal.fire({
              title: '✔ Estado cambiado',
              text: `El servidor ahora está en estado: ${nuevoEstado}`,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.obtenerServidores();
          },
          error: (err) => console.error('❌ Error al cambiar estado:', err),
        });
      }
    });
  }
}
