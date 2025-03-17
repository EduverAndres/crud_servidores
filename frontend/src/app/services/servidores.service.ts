import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Servidor {
  id?: number;
  nombre_servidor: string;
  sistema_operativo: string;
  memoria_ram: number;
  capacidad_disco: number;
  direccion_ip: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServidoresService {
  private apiUrl = 'http://localhost:3000/servidores';

  constructor(private http: HttpClient) {}

  obtenerServidores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearServidor(servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(this.apiUrl, servidor);
  }

  eliminarServidor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado });
  }



}
