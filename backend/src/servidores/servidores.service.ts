import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Servidor } from "./servidor.entity";

@Injectable()
export class ServidoresService {
  constructor(
    @InjectRepository(Servidor)
    private readonly servidorRepo: Repository<Servidor>,
  ) {}

  async listarServidores(): Promise<Servidor[]> {
    return this.servidorRepo.find();
  }

  async obtenerServidor(id: number): Promise<Servidor> {
    const servidor = await this.servidorRepo.findOne({ where: { id } });
    if (!servidor) {
      throw new NotFoundException(`Servidor con ID ${id} no encontrado`);
    }
    return servidor;
  }

  async crearServidor(data: Partial<Servidor>): Promise<Servidor> {
    const servidor = this.servidorRepo.create(data);
    return this.servidorRepo.save(servidor);
  }

  async actualizarServidor(
    id: number,
    data: Partial<Servidor>,
  ): Promise<Servidor> {
    await this.obtenerServidor(id); // Verifica que el servidor existe antes de actualizar
    await this.servidorRepo.update(id, data);
    return this.obtenerServidor(id);
  }

  async eliminarServidor(id: number): Promise<void> {
    const servidor = await this.obtenerServidor(id);
    await this.servidorRepo.delete(servidor.id);
  }

  async cambiarEstado(id: number, estado: string): Promise<Servidor> {
    const servidor = await this.obtenerServidor(id);
    servidor.estado = estado;
    return this.servidorRepo.save(servidor);
  }
}
