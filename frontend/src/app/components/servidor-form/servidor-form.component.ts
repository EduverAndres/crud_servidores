import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servidor-form',
  templateUrl: './servidor-form.component.html',
  styleUrls: ['./servidor-form.component.css'],
  standalone: false
})
export class ServidorFormComponent implements OnChanges {
  @Input() servidor: any | null = null; // Servidor a editar
  @Output() cerrar = new EventEmitter<void>(); // Para cerrar el modal
  @Output() servidorCreado = new EventEmitter<void>(); // Para actualizar la tabla
  servidorForm: FormGroup;

  sistemasOperativos = ['Windows Server', 'Ubuntu', 'CentOS', 'Otro'];
  estados = ['Activo', 'Inactivo', 'En mantenimiento'];
  apiUrl = 'http://localhost:3000/servidores'; // ⚠️ Reemplaza con la URL de tu backend

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.servidorForm = this.fb.group({
      id: [null], // Necesario para edición
      nombre_servidor: ['', Validators.required],
      sistema_operativo: ['', Validators.required],
      memoria_ram: [0, [Validators.required, Validators.min(1)]],
      capacidad_disco: [0, [Validators.required, Validators.min(1)]],
      direccion_ip: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  // Detectar cambios en @Input() servidor
  ngOnChanges(changes: SimpleChanges) {
    if (changes['servidor'] && this.servidor) {
      this.servidorForm.patchValue(this.servidor); // Rellenar el formulario con los datos
    } else {
      this.servidorForm.reset(); // Limpiar formulario si no hay servidor
      this.servidorForm.patchValue({ estado: 'Activo' }); // Estado por defecto
    }
  }

  onSubmit() {
    if (this.servidorForm.valid) {
      if (this.servidorForm.value.id) {
        // EDITAR SERVIDOR (PUT)
        this.http.put(`${this.apiUrl}/${this.servidorForm.value.id}`, this.servidorForm.value).subscribe({
          next: () => {
            Swal.fire({
              title: '✅ Servidor actualizado',
              text: 'Los cambios fueron guardados correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.servidorCreado.emit();
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('❌ Error al actualizar servidor:', err);
            Swal.fire({
              title: '⚠️ Error',
              text: 'Hubo un problema al actualizar el servidor.',
              icon: 'error',
              timer: 2500,
              showConfirmButton: false
            });
          },
        });
      } else {
        // CREAR SERVIDOR (POST)
        this.http.post(this.apiUrl, this.servidorForm.value).subscribe({
          next: () => {
            Swal.fire({
              title: '🎉 Servidor creado',
              text: 'El servidor fue agregado correctamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.servidorForm.reset();
            this.servidorCreado.emit();
            this.cerrar.emit();
          },
          error: (err) => {
            console.error('❌ Error al crear servidor:', err);
            Swal.fire({
              title: '⚠️ Error',
              text: 'Hubo un problema al crear el servidor.',
              icon: 'error',
              timer: 2500,
              showConfirmButton: false
            });
          },
        });
      }
    }
  }
}
